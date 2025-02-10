import { Hauler } from "CreepRoles/hauler";

export class MemoryController {
    public static Initialize(room: Room) {
        let energySources = Object.values(room.find(FIND_SOURCES));
        let memoryEnergySource = {} as { [key: string]: Source };

        // Assure energy source memory is assigned
        for (const source in energySources) {
            if (!memoryEnergySource[energySources[source].id]) {
                memoryEnergySource[energySources[source].id] = energySources[source];
            }
        }

        var spawns = room.find(FIND_MY_SPAWNS).map(x => x.id);
        Memory.rooms = {};
        Memory.rooms[room.name] = { sources: memoryEnergySource, room: room, constructionSites: [], spawns: spawns, controlLevel: 1 };

        this.UpdateSourceWorkerCount(room);
    }

    public static UpdateSourceWorkerCount(room: Room) {
        let energySources = Object.values(room.find(FIND_SOURCES));
        // Assign harvester and hauler capacity
        for (var source in energySources) {
            let capacity = 0;
            if (Memory.rooms[room.name].sources == undefined) {
                return;
            }

            var memorySource = Object.values(Memory.rooms[room.name].sources).find(x => x.id == energySources[source].id);
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (room.getTerrain().get(energySources[source].pos.x + i, energySources[source].pos.y + j) == 0) {
                        capacity++;
                    }
                }
            }
            if (memorySource != undefined) {
                memorySource.HarvesterCapacity = capacity;
                memorySource.Harvester = [];
                var sourceGameObj = Game.getObjectById(memorySource.id);
                if (sourceGameObj != undefined) {
                    memorySource.HaulerCapacity = this.GetHaulerCount(sourceGameObj, Game.spawns["Spawn1"].pos);
                    if (memorySource.Haulers == undefined) {
                        memorySource.Haulers = [];
                    }
                }
            }
        }
    }

    private static GetHaulerCount(source: Source, destination: RoomPosition): number {
        let spawn = Game.spawns["Spawn1"];
        let ret = PathFinder.search(
            source.pos, destination,
            {
                plainCost: 2,
                swampCost: 10,
                roomCallback: this.RoomCallBack()
            }
        );
        var movesRequired: number = 0;
        let creepBodyPartBuilder = new Hauler().GetCreepBodyPartBuilder();

        var haulerEmptyFatigue = creepBodyPartBuilder.GetMoveFatigue(false);
        var haulerFullFatigue = creepBodyPartBuilder.GetMoveFatigue(true);

        ret.path.forEach(element => {
            var structures = element.lookFor("structure");
            structures.forEach(structure => {
                if (structure.structureType == "road") {
                    movesRequired += Math.max(haulerEmptyFatigue / 2, 1);
                    movesRequired += Math.max(haulerFullFatigue / 2, 1);
                    return;
                }
            });

            var terrain = element.lookFor("terrain");
            switch (terrain[0]) {
                case "plain":
                    movesRequired += Math.max(haulerEmptyFatigue, 1);
                    movesRequired += Math.max(haulerFullFatigue, 1);
                    break;
                case "swamp":
                    movesRequired += Math.max(haulerEmptyFatigue * 5, 1);
                    movesRequired += Math.max(haulerFullFatigue * 5, 1);
                    break;
            }
        });

        var miningCapacity = 3000;
        var miningTime = 900;
        var miningRate = miningCapacity / miningTime;

        var haulerCapacity = 50;
        var haulerTime = movesRequired;
        var haulerRate = haulerCapacity / haulerTime;
        var hauler = 1;

        while (miningRate > haulerRate) {
            hauler++;
            haulerRate = (haulerCapacity / haulerTime) * hauler;
        }

        return hauler;
    }

    private static RoomCallBack(): ((roomName: string) => boolean | CostMatrix) | undefined {
        return function (roomName): boolean | CostMatrix {
            let room = Game.rooms[roomName];
            if (!room) return false;
            let costs = new PathFinder.CostMatrix;

            room.find(FIND_STRUCTURES).forEach(function (struct) {
                if (struct.structureType === STRUCTURE_ROAD) {
                    costs.set(struct.pos.x, struct.pos.y, 1);
                } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                    (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) {
                    costs.set(struct.pos.x, struct.pos.y, 0xff);
                }
            });

            room.find(FIND_CREEPS).forEach(function (creep) {
                costs.set(creep.pos.x, creep.pos.y, 0xff);
            });
            return costs;
        };
    }
}
