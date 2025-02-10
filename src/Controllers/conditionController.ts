import { AlternatingCondition } from "Spawner/Conditions/AlternatingCondition";
import { CountCondition } from "Spawner/Conditions/CountCondition";
import { CreepRole } from "./roleController";
import { RequiredForSpawnCondition } from "Spawner/Conditions/RequiredForSpawnCondition";

interface Capacities {
    [role: string]: number;
}

export class ConditionController {
    public conditions: { role: CreepRole, condition: any }[];
    private capacities: Capacities;

    constructor(roomName: string, roleCounts: { [role in CreepRole]: number }, harvesterCapacity: number, haulerCapacity: number) {
        this.capacities = {
            [CreepRole.HARVESTER]: harvesterCapacity,
            [CreepRole.SPAWN_COLLECTOR]: haulerCapacity,
            [CreepRole.UPGRADER]: 1, // Example capacity for Upgrader
            [CreepRole.BUILDER]: 2 // Example capacity for Builder
        };

        this.conditions = [
            { role: CreepRole.ENERGY_DISTRIBUTOR, condition: new RequiredForSpawnCondition(CreepRole.ENERGY_DISTRIBUTOR, roleCounts, 1, roomName) },
            { role: CreepRole.ENERGY_TRANSFERER, condition: new RequiredForSpawnCondition(CreepRole.ENERGY_TRANSFERER, roleCounts, 1, roomName) },
            { role: CreepRole.SPAWN_COLLECTOR, condition: new AlternatingCondition(CreepRole.SPAWN_COLLECTOR, roleCounts, this.capacities[CreepRole.SPAWN_COLLECTOR]) },
            { role: CreepRole.HARVESTER, condition: new AlternatingCondition(CreepRole.HARVESTER, roleCounts, this.capacities[CreepRole.HARVESTER]) },
            { role: CreepRole.UPGRADER, condition: new CountCondition(CreepRole.UPGRADER, roleCounts, this.capacities[CreepRole.UPGRADER]) },
            { role: CreepRole.BUILDER, condition: new CountCondition(CreepRole.BUILDER, roleCounts, this.capacities[CreepRole.BUILDER]) },
        ];
    }

    public refreshConditions(roleCounts: { [role in CreepRole]: number }, harvesterCapacity: number, haulerCapacity: number) {
        this.capacities[CreepRole.HARVESTER] = harvesterCapacity;
        this.capacities[CreepRole.SPAWN_COLLECTOR] = haulerCapacity;

        this.conditions.forEach(conditionObj => {
            const capacity = this.capacities[conditionObj.role] || 1; // Default capacity for other roles
            conditionObj.condition.update(roleCounts, capacity);
        });
    }
}
