// import { BaseRole } from "CreepRoles/baserole";
// import { CreepRole } from "Controllers/roleController";
// import { CreepRoleAction } from "Actions/CreepRoleAction";
// import { CreepActionBuilder } from "Actions/CreepRoleBuilder";
// import { CreepBuilder } from "Spawner/CreepBuilder";

// export class Starter extends BaseRole {
//     constructor() {
//         super(CreepRole.STARTER);
//     }

//     protected override GetCreepRoleActionBuilder(): CreepActionBuilder {
//         return new CreepActionBuilder(new CreepRoleAction())
//             .WhenRefillingEnergy()
//                 .ResourcePickup()
//             .WhenWorking()
//                 .Harvesting()
//                 .Building()
//                 .SpawnRefilling()
//                 .Upgrading();
//     }

//     public override  GetCreepBodyPartBuilder(): CreepBuilder {
//         return new CreepBuilder()
//                     .WithCarry()
//                     .WithMove()
//                     .WithWorkFill();
//     }
// }
