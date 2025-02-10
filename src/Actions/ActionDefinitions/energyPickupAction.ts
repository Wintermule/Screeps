import { CreepAction } from "./Base/CreepAction";

export class EnergyPickupAction extends CreepAction {

    public static CanExecute(creep: Creep): boolean {
        return !creep.memory.working && creep.room.find(FIND_DROPPED_RESOURCES).length > 0;
    }

    public static Execute(creep: Creep): void {
        if (!creep.memory.working) {
            if (creep.store.getFreeCapacity() > 0) {
                if (!creep.memory.targetSource) {
                    Object.values(Memory.rooms[creep.room.name].sources).forEach(source => {
                        if (!creep.memory.targetSource && source.HaulerCapacity > source.Haulers.length) {
                            source.Haulers.push(creep.id);
                            creep.memory.targetSource = source.id;
                        }
                    });
                }
                if (!creep.memory.targetSource) {
                    console.log("couldn't find source");
                    return;
                }
                const source = Game.getObjectById<Source>(creep.memory.targetSource);
                if (!source) {
                    console.log("couldn't find source");
                    return;
                }

                if (creep.pos.getRangeTo(source.pos.x, source.pos.y) > 2) {
                    this.MoveWithAutoResolve(creep, { pos: source.pos, range: 1 });
                } else {
                    const resources = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
                    const rand = Math.floor(Math.random() * resources.length);
                    if (creep.pickup(resources[rand]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(resources[rand]);
                    }
                }
            }
        }
    }
}
