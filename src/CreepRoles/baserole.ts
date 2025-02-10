import { CreepRoleActionBuilder } from "Actions/CreepRoleActionBuilder";
import { CreepBuilder } from "Spawner/CreepBuilder";

export class RoleBase {
    protected GetCreepRoleActionBuilder?(): CreepRoleActionBuilder;
    public GetCreepBodyPartBuilder?(): CreepBuilder;
    protected role: string;

    constructor(role: string) {
        this.role = role;
    }

    public Invoke() {
        for (var creepName in Game.creeps) {
            if (Memory.creeps[creepName].role === this.role) {
                const creep = Game.creeps[creepName];
                // check if implemented and execute
                this.GetCreepRoleActionBuilder
                    && this.GetCreepRoleActionBuilder()
                        .Build(creep)
                        .Execute(creep);
            }
        }
    }
}
