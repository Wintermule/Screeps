export interface ICreepRoleAction {
    // === ENERGY MANAGEMENT ===
    // Determines if the creep can distribute energy
    CanEnergyDistribution(creep: Creep): boolean;
    // Distributes energy
    EnergyDistribution(creep: Creep): void;

    // Determines if the creep can transfer energy
    CanEnergyTransfer(creep: Creep): boolean;
    // Transfers energy
    EnergyTransfer(creep: Creep): void;

    // === RESOURCE COLLECTION ===
    // Determines if the creep can pick up resources
    CanPickupResources(creep: Creep): boolean;
    // Picks up resources
    PickupResources(creep: Creep): void;

    // Determines if the creep can harvest resources
    CanHarvest(creep: Creep): boolean;
    // Determines if the creep can harvest resources while stationary
    CanHarvestStationary(creep: Creep): boolean;
    // Harvests resources
    HarvestResources(creep: Creep): void;
    // Harvests resources while stationary
    StationaryHarvestResources(creep: Creep): void;

    // === STRUCTURE INTERACTION ===
    // Determines if the creep can build structures
    CanBuild(creep: Creep): boolean;
    // Builds structures
    Build(creep: Creep): void;

    // Determines if the creep can upgrade the controller
    CanUpgrade(creep: Creep): boolean;
    // Upgrades the controller
    Upgrade(creep: Creep): void;

    // === SPAWN INTERACTION ===
    // Determines if the creep can refill the spawn with energy
    CanSpawnRefill(creep: Creep): boolean;
    // Refills the spawn with energy
    SpawnRefill(creep: Creep): void;

    // Determines if the creep can withdraw energy from the spawn
    CanSpawnWithdrawEnergy(creep: Creep): boolean;
    // Withdraws energy from the spawn
    SpawnWithdrawEnergy(creep: Creep): void;

    // === STATE MANAGEMENT ===
    // Handles the creep's idle state
    Idle(creep: Creep): void;
}
