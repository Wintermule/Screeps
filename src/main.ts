import { ErrorMapper } from "utils/ErrorMapper";
import { CreepSpawner } from "Spawner/creepSpawner";
import { CreepRole, RoleController } from "Controllers/roleController";

import { SourceController } from "Controllers/SourceController";
import { create, memoize } from "lodash";
import { debug } from "console";
import { SpawnController } from "Controllers/spawnController";
import { ZoneController } from "Controllers/ZoneController";
import { BaseController } from "Controllers/baseController";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples

  interface Memory {
    uuid: number;
    log: any;
    [toggleStateIndex: string]: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
    targetSource: Id<Source> | undefined;
    target: Id<_HasId> | undefined;
    path: RoomPosition[] | undefined;
    pathIndex: number;
  }

  interface Source {
    HarvesterCapacity: number;
    Harvester: Id<Creep>[];
    EnergyStored: number;
    EnergyRequested: number;
    HaulerCapacity: number;
    Haulers: Id<Creep>[];
  }
  interface RoomMemory {
    sources: { [id: string]: Source };
    room: Room;
    constructionSites: Id<ConstructionSite>[];
    spawns: Id<StructureSpawn>[];
    controlLevel: number;
  }

  interface SpawnMemory {
    resourceContainerId: Id<StructureContainer>;
    buildJobs: ConstructionSite[];
    storedEnergy: number;
    transferCreep: Id<Creep>;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
      zoneControllers: ZoneController[];
    }
  }
}

export enum CreepActionReturnCode {
  OK = 0,
  ERR_NOT_OWNER = -1,
  ERR_BUSY = -4,
  ERR_INVALID_TARGET = -7,
  ERR_NOT_IN_RANGE = -9,
  ERR_NO_BODYPART = -12,
  ERR_TIRED = -11,
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  debugger;
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }


  // Initialize controllers
  const mainRoomName =  Game.spawns["Spawn1"].room.name;
  const outposts: string[] = [];
  const zoneController = new ZoneController(mainRoomName, outposts);

  // Execute MainRoomFunctions for the zone controller
  zoneController.MainRoomFunctions();

  // Test ConditionSingleton persistence
  const roleCounts = {
    [CreepRole.HARVESTER]: 0,
    [CreepRole.UPGRADER]: 0,
    [CreepRole.BUILDER]: 0,
    [CreepRole.SPAWN_COLLECTOR]: 0,
    [CreepRole.ENERGY_DISTRIBUTOR]: 0,
    [CreepRole.ENERGY_TRANSFERER]: 0
  };
  const harvesterCapacity = 10;
  const haulerCapacity = 10;

  // Memory.rooms["sim"].sources = Memory.rooms["sim"]?.sources.filter(n => n)

  //  Memory.rooms["sim"].sources.forEach(element => {
  //    for (let source in Object.keys(Memory.rooms["sim"].sources)) {
  //        var source = Game.getObjectById(source.id);
  //      Memory.rooms[]
  //    }
  //  });
});
