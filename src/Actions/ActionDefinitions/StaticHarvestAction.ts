import { BaseAction } from "./Base/baseAction";
import { CreepAction } from "./Base/CreepAction";

export class StaticHarvestAction extends CreepAction {

    // protected override OnDeath(): void {
    //     if (this.m_creep.memory.targetSource != undefined) {
    //         var memeory = Memory.rooms[this.m_creep.room.name].sources[this.m_creep.memory.targetSource].Harvester;
    //         const index = memeory.indexOf(this.m_creep.id, 0);
    //         if (index > -1) {
    //             memeory.splice(index, 1);
    //         }
    //         Memory.rooms[this.m_creep.room.name].sources[this.m_creep.memory.targetSource].Harvester = memeory;
    //     }
    // }

    public static CanExecute(creep: Creep): boolean {
        return true;
    }

    public static Execute(creep: Creep): void {
        if (!creep.id) {
            return;
        }

        const creepMemory = Memory.creeps[creep.name];
        const sourceCount = Object.values(Memory.rooms[creepMemory.room].sources).length;
        const creepHasSource = creepMemory.targetSource !== undefined;

        if (sourceCount > 0 && !creepHasSource) {
            const sources = Memory.rooms[creepMemory.room].sources;

            if (!sources) {
                return;
            }

            for (const source in sources) {
                const sourceMemory = sources[source];
                if (sourceMemory && sourceMemory.Harvester.length < sourceMemory.HarvesterCapacity) {
                    if (Memory.rooms["sim"].sources) {
                        sourceMemory.Harvester.push(creep.id);
                        creepMemory.targetSource = sourceMemory.id;
                        Memory.rooms["sim"].sources[source] = sourceMemory;
                        break;
                    }
                }
            }
        }

        if (!creepMemory.targetSource) {
            return;
        }

        const targetSource = Game.getObjectById<Source>(creepMemory.targetSource);
        if (targetSource) {
            const pos = Game.rooms.sim.getPositionAt(targetSource.pos.x, targetSource.pos.y);
            if (pos) {
                const source = pos.findClosestByRange(FIND_SOURCES);
                if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    this.MoveWithAutoResolve(creep, { pos: source.pos, range: 1 });
                }
            }
        }
    }
}
