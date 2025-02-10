import { BaseAction } from "./Base/baseAction";

export class SpawnEnergyWithdrawalAction extends BaseAction {
    public static CanExecute(creep: Creep): boolean {
        if (creep.memory.working) {
            return false;
        }
        if (creep.room.memory.spawns) {
            return creep.room.memory.spawns.some(x => {
                const gameObject = Game.getObjectById(x);
                return gameObject != null && gameObject.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity(RESOURCE_ENERGY);
            });
        }
        return false;
    }

    public static Execute(creep: Creep): void {
        debugger;
        if (creep.room.memory.spawns) {
            let closestDistance = -1;
            let foundSpawn: StructureSpawn | undefined = undefined;
            for (const spawnId of creep.room.memory.spawns) {
                const spawn = Game.getObjectById<StructureSpawn>(spawnId);
                if (spawn) {
                    const range = creep.pos.getRangeTo(spawn.pos);
                    if (range < closestDistance || closestDistance === -1) {
                        closestDistance = range;
                        foundSpawn = spawn;
                    }
                }
            }

            if (foundSpawn) {
                const container = Game.getObjectById<StructureContainer>(foundSpawn.memory.resourceContainerId);
                if (container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                } else {
                    if (creep.withdraw(foundSpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(foundSpawn);
                    }
                }
            }
        }
    }
}
