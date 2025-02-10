import { Harvester } from "../CreepRoles/harvester";
import { Upgrader } from "../CreepRoles/upgrader";
import { Builder } from "../CreepRoles/builder";
import { Hauler } from "../CreepRoles/hauler";
import { EnergyTransferer } from "CreepRoles/energyTransferer";
import { RoleBase } from "CreepRoles/baserole";
import { EnergyDistributor } from "CreepRoles/energyDistributor";

export enum CreepRole {
    HARVESTER = "Harvester",
    UPGRADER = "Upgrader",
    BUILDER = "Builder",
    SPAWN_COLLECTOR = "S_Collector",
    ENERGY_TRANSFERER = "E_Transfer",
    ENERGY_DISTRIBUTOR ="E_Distributor",
}

export class RoleController {

    harvestingRoles:RoleBase[] = [
        new Harvester(),
        new Hauler(),
    ]

    baseRoles:RoleBase[] = [
        new Upgrader(),
        new Builder(),
        new EnergyTransferer(),
        new EnergyDistributor(),
    ]

    public InvokeAllRoles(){
        this.InvokeHarvestingRoles();
        this.InvokeBaseRoles();
    }

    public InvokeHarvestingRoles() {
        this.harvestingRoles.forEach(role =>
            role.Invoke()
        );
    }

    public InvokeBaseRoles() {
        this.baseRoles.forEach(role =>
            role.Invoke()
        );
    }
}
