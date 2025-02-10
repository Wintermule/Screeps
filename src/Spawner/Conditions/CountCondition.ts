import { BaseCondition } from "./baseCondition";

export class CountCondition extends BaseCondition {
    constructor(role: string, roleCount: { [role: string]: number }, capacity: number) {
        super(role, roleCount, capacity);
    }

    public isTrue(): boolean {
        return this.roleCount[this.role] < this.capacity;
    }

    public update(roleCount: { [role: string]: number }, capacity: number) {
        this.roleCount = roleCount;
        this.capacity = capacity;
    }
}
