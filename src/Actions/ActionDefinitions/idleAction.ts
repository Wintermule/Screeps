import { CreepAction } from "./Base/CreepAction";

export class IdleAction extends CreepAction {
    public run(creep: Creep): void {
        const idleFlag = Game.flags['Idle'];
        if (idleFlag) {
            creep.moveTo(idleFlag);
        }
    }
}
