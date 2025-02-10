import { CreepRoleAction } from "Actions/CreepRoleAction";
import { CreepRoleActionBuilder } from "Actions/CreepRoleActionBuilder";
import { RoleBase } from "CreepRoles/baserole";
import { CreepRole } from "Controllers/roleController";
import { CreepBuilder } from "Spawner/CreepBuilder";

export class Harvester extends RoleBase {
   constructor() {
      super(CreepRole.HARVESTER);
   }

   protected override GetCreepRoleActionBuilder(): CreepRoleActionBuilder {
      return new CreepRoleActionBuilder(new CreepRoleAction())
         .WithStaticAction()
            .StationaryHarvesting();
   }

   public override GetCreepBodyPartBuilder(): CreepBuilder {
      return new CreepBuilder()
         .WithMove()
         .WithWorkFill();
   }
}


