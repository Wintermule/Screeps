import { StaticHarvestAction } from "./ActionDefinitions/StaticHarvestAction";
import { BuildAction } from "./ActionDefinitions/buildAction";
import { EnergyDistributionAction } from "./ActionDefinitions/energyDistributionAction";
import { EnergyPickupAction } from "./ActionDefinitions/energyPickupAction";
import { EnergyTransferAction } from "./ActionDefinitions/energyTransferAction";
import { HarvestAction } from "./ActionDefinitions/harvestAction";
import { SpawnEnergyWithdrawalAction } from "./ActionDefinitions/spawnEnergyWithdrawlAction";
import { SpawnRefillAction } from "./ActionDefinitions/spawnRefillAction";
import { UpgradeAction } from "./ActionDefinitions/upgradeAction";
import { ICreepRoleAction } from "./ICreepRoleAction";

export class CreepRoleAction implements ICreepRoleAction {

    public Idle(creep: Creep): void {
        // Implement the Idle action logic here
    }
    public CanEnergyDistribution(creep: Creep): boolean {
        return EnergyDistributionAction.CanExecute(creep);
    }
    public EnergyDistribution(creep: Creep): void {
        EnergyDistributionAction.Execute(creep);
    }
    public CanEnergyTransfer(creep: Creep): boolean {
        return EnergyTransferAction.CanExecute(creep);
    }
    public EnergyTransfer(creep: Creep): void {
        EnergyTransferAction.Execute(creep);
    }
    public CanHarvestStationary(creep: Creep): boolean {
        return StaticHarvestAction.CanExecute(creep);
    }
    public CanHarvest(creep: Creep): boolean {
        return HarvestAction.CanExecute(creep);
    }
    public CanBuild(creep: Creep): boolean {
        return BuildAction.CanExecute(creep);
    }
    public CanUpgrade(creep: Creep): boolean {
        return UpgradeAction.CanExecute(creep);
    }
    public CanSpawnRefill(creep: Creep): boolean {
        return SpawnRefillAction.CanExecute(creep);
    }
    public CanPickupResources(creep: Creep): boolean {
        return EnergyPickupAction.CanExecute(creep);
    }
    public HarvestResources(creep: Creep): void {
        HarvestAction.Execute(creep);
    }
    public StationaryHarvestResources(creep: Creep): void {
        StaticHarvestAction.Execute(creep);
    }
    public Build(creep: Creep): void {
        BuildAction.Execute(creep);
    }
    public Upgrade(creep: Creep): void {
        UpgradeAction.Execute(creep);
    }
    public SpawnRefill(creep: Creep): void {
        SpawnRefillAction.Execute(creep);
    }
    public PickupResources(creep: Creep): void {
        EnergyPickupAction.Execute(creep);
    }

    public CanSpawnWithdrawEnergy(creep: Creep): boolean {
        return SpawnEnergyWithdrawalAction.CanExecute(creep);
    }

    public SpawnWithdrawEnergy(creep: Creep): void {
        SpawnEnergyWithdrawalAction.Execute(creep);
    }
}
