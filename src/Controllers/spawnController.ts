import { CreepSpawner } from "Spawner/creepSpawner";
import { CreepRole } from "./roleController";
import { ConditionController } from "./conditionController";

export class SpawnController {
    private roomName: string;
    private conditionController: ConditionController;

    constructor(roomName: string) {
        this.roomName = roomName;
        const roleCounts = this.countCreepsByRole();
        const { harvesterCapacity, haulerCapacity } = this.GetCapacities(Game.rooms[roomName].find(FIND_MY_SPAWNS)[0]);
        this.conditionController = new ConditionController(roomName, roleCounts, harvesterCapacity, haulerCapacity);
    }

    public GetSpawnBuildJobs() {
        const spawns = Game.rooms[this.roomName].find(FIND_MY_SPAWNS);
        for (const spawn of spawns) {
            if (spawn.memory.resourceContainerId == undefined) {
                const container = spawn.pos.findInRange<StructureContainer>(FIND_STRUCTURES, 2).filter(x => x.structureType == "container")[0];
                if (container != undefined) {
                    spawn.memory.resourceContainerId = container.id;
                }
            }

            const buildJobs = spawn.pos.findInRange(FIND_CONSTRUCTION_SITES, 2).filter(x => x.structureType == "container");

            if (buildJobs.length > 0) {
                if (spawn.memory.buildJobs == undefined) {
                    spawn.memory.buildJobs = [];
                }
                for (let i = 0; i < buildJobs.length; i++) {
                    const job = buildJobs[i];
                    if (!spawn.memory.buildJobs.some(x => x.id == job.id)) {
                        spawn.memory.buildJobs.push(job);
                    }
                }
            }
        }
    }

    public SetAvailableEnergy(roomName: string) {
        const spawnIds = Game.rooms[roomName].memory.spawns;
        var energy = 0;

        for (var i = 0; i < spawnIds.length; i++) {
            var spawn = Game.getObjectById(spawnIds[i]);
            if (spawn != null) {
                if (spawn.memory.resourceContainerId != undefined) {
                    var resourceContainer = Game.getObjectById(spawn.memory.resourceContainerId);
                    if (resourceContainer != null) {
                        energy += resourceContainer.store.energy;
                    }
                }

                energy += spawn.store.energy;
                spawn.memory.storedEnergy = energy;
            }
        }
    }

    public manageSpawning() {
        const spawns = Game.rooms[this.roomName].find(FIND_MY_SPAWNS);
        if (spawns.length === 0) return;

        const roleCounts = this.countCreepsByRole();

        for (const spawn of spawns) {
            if (!CreepSpawner.CanSpawnCreep(spawn)) {
                continue;
            }
            const colonyNeed = this.EvaluateColonyNeeds(roleCounts, spawn);

            if (colonyNeed !== null) {
                CreepSpawner.spawnCreepIfEnergyFull(spawn, colonyNeed);
            }
        }
    }

    public EvaluateColonyNeeds(roleCounts: { Harvester: number; Upgrader: number; Builder: number; S_Collector: number; E_Distributor: number; E_Transfer: number; }, spawn: StructureSpawn): CreepRole | null {
        const { harvesterCapacity, haulerCapacity } = this.GetCapacities(spawn);

        this.conditionController.refreshConditions(roleCounts, harvesterCapacity, haulerCapacity);

        for (const { role, condition } of this.conditionController.conditions) {
            if (condition.isTrue()) {
                return role;
            }
        }

        return null;
    }

    private countCreepsByRole(): { [role in CreepRole]: number } {
        const roleCounts = {
            [CreepRole.HARVESTER]: 0,
            [CreepRole.UPGRADER]: 0,
            [CreepRole.BUILDER]: 0,
            [CreepRole.SPAWN_COLLECTOR]: 0,
            [CreepRole.ENERGY_DISTRIBUTOR]: 0,
            [CreepRole.ENERGY_TRANSFERER]: 0
        };

        for (const creepName in Memory.creeps) {
            const role = Memory.creeps[creepName].role as CreepRole;
            if (role in roleCounts) {
                roleCounts[role]++;
            }
        }

        return roleCounts;
    }

    private GetCapacities(spawn: StructureSpawn): { harvesterCapacity: number, haulerCapacity: number } {
        const sources = Object.values(spawn.room.memory.sources);
        const harvesterCapacity = sources.map(x => x.HarvesterCapacity).reduce((a, b) => a + b, 0);
        const haulerCapacity = sources.map(x => x.HaulerCapacity).reduce((a, b) => a + b, 0);

        return { harvesterCapacity, haulerCapacity };
    }
}
