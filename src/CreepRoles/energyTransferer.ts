import { CreepBuilder } from "Spawner/CreepBuilder";
import { RoleBase } from "./baserole";
import { CreepRoleActionBuilder } from "Actions/CreepRoleActionBuilder";
import { CreepRoleAction } from "Actions/CreepRoleAction";
import { CreepRole } from "Controllers/roleController";

export class EnergyTransferer extends RoleBase {
    constructor() {
        super(CreepRole.ENERGY_TRANSFERER);
    }

    public override GetCreepBodyPartBuilder(): CreepBuilder {
        return new CreepBuilder()
            .WithMove()
            .WithWork()
            .WithCarryFill();
    }

    protected override GetCreepRoleActionBuilder(): CreepRoleActionBuilder {
        return new CreepRoleActionBuilder(new CreepRoleAction())
            .WithStaticAction()
                .EnergyTransferer();
    }
}
