import { BaseCondition } from "./baseCondition";

export class AlternatingCondition extends BaseCondition {
    private static conditions: string[] = [];
    private isActive: boolean = false;

    constructor(role: string, roleCount: { [role: string]: number }, capacity: number) {
        super(role, roleCount, capacity);
        if (!AlternatingCondition.conditions.includes(role)) {
            AlternatingCondition.conditions.push(role);
        }

        if (Memory.toggleStateIndex === undefined) {
            Memory.toggleStateIndex = 0;
        }
    }

    override isTrue(): boolean {
        const index = AlternatingCondition.conditions.indexOf(this.role);
        if (Memory.toggleStateIndex === index) {
            Memory.toggleStateIndex = (Memory.toggleStateIndex + 1) % AlternatingCondition.conditions.length;
            this.isActive = true;
        } else {
            this.isActive = false;
        }

        return this.isActive && this.roleCount[this.role] < this.capacity;
    }

    public update(roleCount: { [role: string]: number }, capacity: number) {
        this.roleCount = roleCount;
        this.capacity = capacity;
    }
}

