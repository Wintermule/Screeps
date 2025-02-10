import { create } from "lodash";

export class CreepBuilder {
    private FastMove: boolean = false;
    private Move: boolean = false;
    private Work = false;
    private Carry: boolean = false;
    private WorkFill: boolean = false;
    private CarryFill: boolean = false;

    public WithFastMove(): this {
        this.FastMove = true;
        return this;
    }

    public WithMove(): this {
        this.Move = true;
        return this;
    }

    public WithWork(): this {
        this.Work = true;
        return this;
    }

    public WithCarry(): this {
        this.Carry = true;
        return this;
    }

    public WithWorkFill(): this {
        this.WorkFill = true;
        return this;
    }

    public WithCarryFill(): this {
        this.CarryFill = true;
        return this;
    }

    public GetMoveFatigue(full: boolean): number {
        let currentSpawn = Game.spawns["Spawn1"];
        var parts = this.GetBodyParts(currentSpawn.store.getCapacity(RESOURCE_ENERGY));
        var moveParts = parts.filter(x => x == "move");
        var carryParts = parts.filter(x => x == "carry");
        var otherParts = parts.filter(x => x != "move" && x != "carry");

        return this.calculateFatigue(full, moveParts.length, carryParts.length, otherParts.length);
    }

    public GetBodyParts(energy: number) {
        var result: BodyPartConstant[] = [];

        var parts = energy / 100;
        if (parts > 50) {
            parts = 50;
        }
        if (this.Move || this.FastMove) {
            result.push(MOVE)
        }
        if (this.Carry || this.CarryFill) {
            result.push(CARRY)
        }
        if (this.Work || this.WorkFill) {
            result.push(WORK)
        }

        if (this.FastMove) {
            var moveParts = (parts - result.length) / 2;
            this.FillWith(result, moveParts, MOVE);
        }
        if (this.WorkFill) {
            this.FillWith(result, parts, WORK);
        }
        if (this.CarryFill) {
            this.FillWith(result, parts, CARRY);
        }

        return result;
    }

    private calculateFatigue(full: boolean, moveParts: number, carryParts: number, otherParts: number): number {
        let fatigue;
        if (full) {
            fatigue = (carryParts + otherParts) - moveParts;
        } else {
            fatigue = otherParts - moveParts;
        }
        return Math.max(fatigue, 0);
    }

    private FillWith(result: BodyPartConstant[], parts: number, type: BodyPartConstant) {
        while (result.length < parts) {
            result.push(type);
        }
    }
}
