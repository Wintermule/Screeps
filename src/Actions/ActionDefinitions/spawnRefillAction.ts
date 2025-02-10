import { CreepAction } from "./Base/CreepAction";

export class SpawnRefillAction extends CreepAction {

    public static CanExecute(creep: Creep): boolean {
        return (!creep.memory.working && creep.room.find(FIND_MY_SPAWNS)[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0
        && creep.store.getFreeCapacity() == 0) || creep.memory.working;
    }

    public static Execute(creep: Creep): void {
        const spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        let target: { structure: Structure, range: number } | null = null;


            if (spawn.memory.resourceContainerId) {
                const container = Game.getObjectById<StructureContainer>(spawn.memory.resourceContainerId);
                if (container) {
                    target = { structure: container, range: 1 };
                }
            }
            if (!target) {
                target = creep.room.find(FIND_MY_SPAWNS).map(value => ({ structure: value, range: 1 }))[0];
            }

            if (creep.transfer(target.structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.MoveWithAutoResolve(creep, { pos: target.structure.pos, range: 1 });
            }

    }
}

