import { CreepBuilder } from "Spawner/CreepBuilder";
import { RoleBase } from "./baserole";
import { CreepRoleActionBuilder } from "Actions/CreepRoleActionBuilder";
import { CreepRole } from "Controllers/roleController";
import { CreepRoleAction } from "Actions/CreepRoleAction";

export class EnergyDistributor extends RoleBase {
    constructor() {
        super(CreepRole.ENERGY_DISTRIBUTOR);
    }

    protected override GetCreepRoleActionBuilder(): CreepRoleActionBuilder {
        return new CreepRoleActionBuilder(new CreepRoleAction())
           .WhenRefillingEnergy()
              .SpawnWithdraw()
           .WhenWorking()
              .EnergyDistribution()
              .Building();
    }

    public override GetCreepBodyPartBuilder(): CreepBuilder {
        return new CreepBuilder()
            .WithWork()
            .WithFastMove()
            .WithCarryFill();
    }
}
