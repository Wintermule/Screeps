import { CreepRole } from "Controllers/roleController";
import { BaseCondition } from "./baseCondition";
import { spawn } from "child_process";

export class RequiredForSpawnCondition extends BaseCondition {
    roomName: string;
    constructor(role: string, roleCount: { [role: string]: number }, capacity: number, roomName: string) {
        super(role, roleCount, capacity);
        this.roomName = roomName;
    }

    public isTrue(): boolean {
        const spawns = Game.rooms[this.roomName].find(FIND_MY_SPAWNS);
        const controller = Game.rooms[this.roomName].controller;
        if (controller && controller.level <= 1) {
            return false;
        }

        const harvesterCount = this.roleCount[CreepRole.HARVESTER];
        const spawnCollectorCount = this.roleCount[CreepRole.SPAWN_COLLECTOR];

        if (harvesterCount < 1 || spawnCollectorCount < 1) {
            return false;
        }

        const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === this.role )
       return creeps.length < spawns.length;
    }

    public update(roleCount: { [role: string]: number }, capacity: number) {
        this.roleCount = roleCount;
        this.capacity = capacity;
    }
}
