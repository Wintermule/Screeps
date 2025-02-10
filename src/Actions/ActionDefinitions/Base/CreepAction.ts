import { CreepActionReturnCode } from "main";
import { BaseAction } from "./baseAction";

export class CreepAction extends BaseAction {

    protected static MoveWithAutoResolve(creep: Creep, goal: { pos: RoomPosition, range: number }) {
        const moveResult = creep.moveTo(goal.pos.x, goal.pos.y, {
            reusePath: 5,
            range: 2,
            visualizePathStyle: {
                fill: 'transparent',
                stroke: '#fff',
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .1
            },
            ignoreCreeps: false
        });

        if (moveResult == ERR_NO_PATH) {
            const pathFinder = this.GetPath(creep, goal);
            if (pathFinder.path[0] != undefined) {
                creep.move(creep.pos.getDirectionTo(pathFinder.path[0]));
                const blockingCreep = pathFinder.path[0].lookFor("creep");

                if (blockingCreep[0] != undefined) {
                    blockingCreep[0].move(blockingCreep[0].pos.getDirectionTo(creep.pos));
                }
            }
        }
    }

    private static GetPath(creep: Creep, goal: { pos: RoomPosition; range: number; }) {
        return PathFinder.search(
            creep.pos, goal,
            {
                plainCost: 2,
                swampCost: 10,
                roomCallback: CreepAction.RoomCallBack(),
            }
        );
    }

    private static RoomCallBack(): ((roomName: string) => boolean | CostMatrix) | undefined {
        return function (roomName): boolean | CostMatrix {
            let room = Game.rooms[roomName];
            if (!room) return false;
            let costs = new PathFinder.CostMatrix;

            room.find(FIND_STRUCTURES).forEach(function (struct) {
                if (struct.structureType === STRUCTURE_ROAD) {
                    costs.set(struct.pos.x, struct.pos.y, 1);
                } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                    (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) {
                    costs.set(struct.pos.x, struct.pos.y, 0xff);
                }
            });

            // Avoid creeps in the room
            room.find(FIND_CREEPS).forEach(function(creep) {
                costs.set(creep.pos.x, creep.pos.y, 0xff);
            });

            return costs;
        };
    }
}
