import { CreepAction } from "./Base/CreepAction";

export class EnergyDistributionAction extends CreepAction {
    public static CanExecute(creep: Creep): boolean {
        return true;
    }

    public static Execute(creep: Creep): void {
        const targets = creep.room.find<StructureExtension>(FIND_STRUCTURES, { filter: (structure) => structure.structureType === STRUCTURE_EXTENSION })
            .filter(x => x.store.getFreeCapacity(RESOURCE_ENERGY) > 0);

        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.MoveWithAutoResolve(creep, { pos: targets[0].pos, range: 1 });
            }
        }
    }
}
