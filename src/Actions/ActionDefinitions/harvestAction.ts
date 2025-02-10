import { CreepAction } from "./Base/CreepAction";

export class HarvestAction extends CreepAction {

    public static CanExecute(creep: Creep): boolean {
        return !creep.memory.working;
    }

    public static Execute(creep: Creep): void {
        const source = creep.room.find(FIND_SOURCES);
        if (creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
            this.MoveWithAutoResolve(creep, { pos: source[0].pos, range: 1 });
        }
    }
}
