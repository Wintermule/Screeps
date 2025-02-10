import { ICreepRoleAction } from "./ICreepRoleAction";
import { updateWorkingStatus } from "./ActionUtils";

export class CreepRoleActionBuilder {
    IsWorkAction: boolean = false;
    IsStatic: boolean = false;
    ICreepRoleAction: ICreepRoleAction;

    energyPickupActions: [Execute: ((creep: Creep) => void), canExecute: (creep: Creep) => boolean][] = [];
    workActions: [Execute: ((creep: Creep) => void), canExecute: (creep: Creep) => boolean][] = [];
    staticActions: [Execute: ((creep: Creep) => void), canExecute: (creep: Creep) => boolean][] = [];

    canExecuteMethod: ((creep: Creep) => boolean) | undefined;
    executeMethod: ((creep: Creep) => void) | undefined;

    constructor(ICreepRoleAction: ICreepRoleAction) {
        this.ICreepRoleAction = ICreepRoleAction;
    }

    public Execute(creep: Creep): void {
        if (this.executeMethod) {
            this.executeMethod(creep);
        }
    }

    public Build(creep: Creep): this {
        updateWorkingStatus(creep);
        debugger;
        if (this.IsStatic) {
            this.assignStaticActions(creep);
        } else if (creep.memory.working && this.workActions != undefined) {
            this.assignWorkActions(creep);
        } else if (this.energyPickupActions != undefined) {
            this.assignEnergyPickupActions(creep);
        }

        // Assign idle action if no other action can be executed
        if (!this.executeMethod) {
            this.executeMethod = this.ICreepRoleAction.Idle;
        }

        updateWorkingStatus(creep);
        return this;
    }

    private assignStaticActions(creep: Creep): void {
        this.staticActions.forEach(element => this.SetActions(creep, element));
    }

    private assignWorkActions(creep: Creep): void {
        this.workActions.forEach(element => this.SetActions(creep, element));
    }

    private assignEnergyPickupActions(creep: Creep): void {
        this.energyPickupActions.forEach(element => this.SetActions(creep, element));
    }

    private SetActions(creep: Creep, element: [Execute: (creep: Creep) => void, canExecute: (creep: Creep) => boolean]): void {
        if (this.executeMethod) {
            return;
        }
        const canExecuteMethod = element[1];

        if (canExecuteMethod(creep)) {
            this.executeMethod = element[0];
            return;
        }
    }

    public Harvesting(): this {
        this.AssignRoleAction(this.ICreepRoleAction.HarvestResources, this.ICreepRoleAction.CanHarvest);
        return this;
    }

    public Upgrading(): this {
        this.AssignRoleAction(this.ICreepRoleAction.Upgrade, this.ICreepRoleAction.CanUpgrade);
        return this;
    }

    public Building(): this {
        this.AssignRoleAction(this.ICreepRoleAction.Build, this.ICreepRoleAction.CanBuild);
        return this;
    }

    public EnergyDistribution(): this {
        this.AssignRoleAction(this.ICreepRoleAction.EnergyDistribution, this.ICreepRoleAction.CanEnergyDistribution);
        return this;
    }

    public SpawnRefilling(): this {
        this.AssignRoleAction(this.ICreepRoleAction.SpawnRefill, this.ICreepRoleAction.CanSpawnRefill);
        return this;
    }

    public EnergyTransferer(): this {
        this.AssignRoleAction(this.ICreepRoleAction.EnergyTransfer, this.ICreepRoleAction.CanEnergyTransfer);
        return this;
    }

    public SpawnWithdraw(): this {
        this.AssignRoleAction(this.ICreepRoleAction.SpawnWithdrawEnergy, this.ICreepRoleAction.CanSpawnWithdrawEnergy);
        return this;
    }

    public ResourcePickup(): this {
        this.AssignRoleAction(this.ICreepRoleAction.PickupResources, this.ICreepRoleAction.CanPickupResources);
        return this;
    }

    public StationaryHarvesting(): this {
        this.AssignRoleAction(this.ICreepRoleAction.StationaryHarvestResources, this.ICreepRoleAction.CanHarvestStationary);
        return this;
    }

    public WhenRefillingEnergy(): this {
        this.IsWorkAction = false;
        return this;
    }

    public WhenWorking(): this {
        this.IsWorkAction = true;
        return this;
    }

    public WithStaticAction(): this {
        this.IsStatic = true;
        return this;
    }

    private AssignRoleAction(executableAction: (creep: Creep) => void, canExecuteAction: (creep: Creep) => boolean): void {
        if (this.IsStatic) {
            this.staticActions.push([executableAction, canExecuteAction]);
        } else {
            if (this.IsWorkAction) {
                this.workActions.push([executableAction, canExecuteAction]);
            } else {
                this.energyPickupActions.push([executableAction, canExecuteAction]);
            }
        }
    }
}
