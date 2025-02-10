import { RoleBase } from "CreepRoles/baserole";
import { CreepRole } from "Controllers/roleController";
import { CreepRoleAction } from "Actions/CreepRoleAction";
import { CreepRoleActionBuilder } from "Actions/CreepRoleActionBuilder";
import { CreepBuilder } from "Spawner/CreepBuilder";

export class Hauler extends RoleBase {
    constructor() {
        super(CreepRole.SPAWN_COLLECTOR);
    }

    protected override GetCreepRoleActionBuilder(): CreepRoleActionBuilder {
        return new CreepRoleActionBuilder(new CreepRoleAction())
            .WhenRefillingEnergy()
                .ResourcePickup()
                .Harvesting()
            .WhenWorking()
                .SpawnRefilling()
                .Building()
                .Upgrading();
    }

    public override GetCreepBodyPartBuilder(): CreepBuilder {
        return new CreepBuilder()
            .WithFastMove()
            .WithWork()
            .WithCarryFill();
    }
}
