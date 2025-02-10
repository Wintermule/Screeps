import { CreepAction } from "./Base/CreepAction";

export class BuildAction extends CreepAction {

    public static CanExecute(creep: Creep): boolean {
        const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        return constructionSites.length > 0 && creep.memory.working;
    }

    public static Execute(creep: Creep): void {
        const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (constructionSites.length > 0) {
            if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                this.MoveWithAutoResolve(creep, { pos: constructionSites[0].pos, range: 1 });
            }
        }
    }
}
