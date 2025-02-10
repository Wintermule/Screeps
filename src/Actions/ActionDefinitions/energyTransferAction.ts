import { BaseAction } from "./Base/baseAction";

export class EnergyTransferAction extends BaseAction {
    public static CanExecute(creep: Creep): boolean {
        return true;
    }

    public static Execute(creep: Creep): void {
        if (creep.memory.target) {
            const spawn = Game.getObjectById<StructureSpawn>(creep.memory.target as Id<StructureSpawn>);
            if (spawn) {
                if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                    if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawn);
                    }
                } else {
                    if (spawn.memory.resourceContainerId) {
                        const container = Game.getObjectById<StructureContainer>(spawn.memory.resourceContainerId);
                        if (container && creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    }
                }
            }
        }
    }
}
