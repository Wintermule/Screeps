export class BaseCondition {
    protected role: string;
    protected roleCount: { [role: string]: number };
    protected capacity: number;

    constructor(role: string, roleCount: { [role: string]: number }, capacity: number) {
        this.role = role;
        this.roleCount = roleCount;
        this.capacity = capacity;
    }

    public isTrue(): boolean {
        // Implementation should be provided by subclasses
        return false;
    }

    public UpdateCapacity(capacity: number): void {
        this.capacity = capacity;
    }
}
