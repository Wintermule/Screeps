import { CreepSpawner } from "Spawner/creepSpawner";
import { SpawnController } from "./spawnController";
import { SourceController } from "./SourceController";
import { RoleController } from "./roleController";
import sinonChai from "sinon-chai";
import { BaseController } from "./baseController";
import { MemoryController } from "./MemoryController";

export class ZoneController {
    AllRooms: Room[];
    MainRoom: Room;
    OutPosts: Room[];
    BaseController: BaseController;

    public constructor(mainRoomName: string, outposts: string[]) {
        var mainRoom = Game.rooms[mainRoomName];
        var outpostsRooms: Room[] = [];
        outposts.forEach(x => outpostsRooms.push(Game.rooms[x]));
        var allRooms: Room[] = outpostsRooms;
        allRooms.push(mainRoom);

        this.AllRooms = allRooms;
        this.MainRoom = mainRoom;
        this.OutPosts = outpostsRooms;

        if (Memory.rooms == undefined || Memory.rooms[mainRoom.name] == undefined) {
            MemoryController.Initialize(mainRoom);
        }

        this.BaseController = new BaseController(mainRoomName);

        this.CleanMemory();
    }

    public MainRoomFunctions() {
        if (this.MainRoom.controller?.level != this.MainRoom.memory.controlLevel) {
            if (this.MainRoom.controller != undefined &&
                this.MainRoom.controller.level > this.MainRoom.memory.controlLevel) {
                MemoryController.UpdateSourceWorkerCount(this.MainRoom);
                this.MainRoom.memory.controlLevel = this.MainRoom.controller?.level;
            }
        }

        this.BaseController.execute();
    }

    CleanMemory() {
        for (var i = 0; i < this.AllRooms.length; i++) {
            var roomName = this.AllRooms[i].name;
            //sources
            if (Memory.rooms[roomName]?.sources) {
                var keys = Object.values<Source>(Memory.rooms[roomName].sources);

                for (var sourceName in Memory.rooms[roomName].sources) {
                    var existingHarvesters: Id<Creep>[] = [];
                    var existingHaulers: Id<Creep>[] = [];
                    var source = Memory.rooms[roomName].sources[sourceName];
                    source.Harvester.forEach(harvester => {
                        var creep = Game.getObjectById(harvester);
                        if (creep != null) {
                            existingHarvesters.push(harvester);
                        }
                    });

                    source.Haulers.forEach(hauler => {
                        var creep = Game.getObjectById(hauler);
                        if (creep != null) {
                            existingHaulers.push(hauler);
                        }
                    });

                    source.Harvester = existingHarvesters;
                    source.Haulers = existingHaulers;
                }
            }

            //construction sites
            var roomObj = Game.rooms[roomName];
            var constructionSites = roomObj.find(FIND_CONSTRUCTION_SITES);

            for (var i = 0; i < constructionSites.length; i++) {
                if (!roomObj.memory.constructionSites.includes(constructionSites[i].id)) {
                    roomObj.memory.constructionSites.push(constructionSites[i].id);
                }
            }
            for (var i = 0; i < roomObj.memory.constructionSites.length; i++) {
                var site = roomObj.memory.constructionSites[i];
                if (!constructionSites.map(x => x.id).includes(site)) {
                    roomObj.memory.constructionSites = roomObj.memory.constructionSites.filter(x => x != site);
                    Game.spawns["Spawn1"].memory.buildJobs = Game.spawns["Spawn1"].memory.buildJobs.filter(x => x.id != site);
                }
            }
        }
    }
}
