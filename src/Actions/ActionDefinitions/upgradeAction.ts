import { CreepAction } from "./Base/CreepAction";

export class UpgradeAction extends CreepAction{

    public static CanExecute(creep:Creep): boolean{
        return (!creep.memory.working && creep.store.getFreeCapacity() == 0) || creep.memory.working;
    }

    public static Execute(creep: Creep): void {
        if (Game.spawns["Spawn1"].room.controller != undefined) {
            if (creep.upgradeController(Game.spawns["Spawn1"].room.controller) == ERR_NOT_IN_RANGE) {
               creep.moveTo(Game.spawns["Spawn1"].room.controller);
            }
         }
    }
}
