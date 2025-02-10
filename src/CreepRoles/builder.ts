import { CreepRoleAction } from "Actions/CreepRoleAction";
import { CreepRoleActionBuilder } from "Actions/CreepRoleActionBuilder";
import { RoleBase } from "CreepRoles/baserole";
import { CreepRole } from "Controllers/roleController";
import { CreepBuilder } from "Spawner/CreepBuilder";

export class Builder extends RoleBase {
   constructor() {
      super(CreepRole.BUILDER);
   }

   protected override GetCreepRoleActionBuilder(): CreepRoleActionBuilder {
      return new CreepRoleActionBuilder(new CreepRoleAction())
         .WhenRefillingEnergy()
            .SpawnWithdraw()
            .ResourcePickup()
            .Harvesting()
         .WhenWorking()
            .Building()
            .Upgrading();

   }

   public override GetCreepBodyPartBuilder(): CreepBuilder {
      return new CreepBuilder()
         .WithCarry()
         .WithFastMove()
         .WithWorkFill();
   }
}
