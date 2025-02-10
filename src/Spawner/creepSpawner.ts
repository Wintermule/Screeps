import { CreepRole } from 'Controllers/roleController';
import { RoleBase } from 'CreepRoles/baserole';
import { Builder } from 'CreepRoles/builder';
import { EnergyDistributor } from 'CreepRoles/energyDistributor';
import { EnergyTransferer } from 'CreepRoles/energyTransferer';
import { Harvester } from 'CreepRoles/harvester';
import { Hauler } from 'CreepRoles/hauler';
import { Upgrader } from 'CreepRoles/upgrader';

export class CreepSpawner {
    static CanSpawnCreep(spawn: StructureSpawn): boolean {
        const isEnergyFull = spawn.store.getUsedCapacity(RESOURCE_ENERGY) === spawn.store.getCapacity(RESOURCE_ENERGY);
        return isEnergyFull;
    }

    public static GetDefaultCreepMemory(roomName: string, creepRole: CreepRole): CreepMemory {
        return { role: creepRole, room: roomName, target: undefined, working: false, targetSource: undefined, path: undefined, pathIndex: 0 };
    }

    public static SpawnCreep(creepRole: CreepRole, spawn: StructureSpawn, memory?: CreepMemory) {
        if (memory == undefined) {
            memory = this.GetDefaultCreepMemory(spawn.room.name, creepRole);
        }

        const bodyParts = this.getBodyPartsForRole(creepRole, spawn.store.energy);
        if (bodyParts.length === 0) return;

        this.doSpawn(bodyParts, creepRole, spawn, memory);
    }

    public static spawnCreepIfEnergyFull(spawn: StructureSpawn, colonyNeed: CreepRole) {
        const isEnergyFull = spawn.store.getUsedCapacity(RESOURCE_ENERGY) === spawn.store.getCapacity(RESOURCE_ENERGY);
        if (isEnergyFull) {
            this.SpawnCreep(colonyNeed, spawn);
        }
    }

    private static getBodyPartsForRole(creepRole: CreepRole, energy: number): BodyPartConstant[] {
        let role: RoleBase;
        switch (creepRole) {
            case CreepRole.BUILDER:
                role = new Builder();
                break;
            case CreepRole.HARVESTER:
                role = new Harvester();
                break;
            case CreepRole.SPAWN_COLLECTOR:
                role = new Hauler();
                break;
            case CreepRole.UPGRADER:
                role = new Upgrader();
                break;
            case CreepRole.ENERGY_TRANSFERER:
                role = new EnergyTransferer();
                break;
            case CreepRole.ENERGY_DISTRIBUTOR:
                role = new EnergyDistributor();
                break;
            default:
                return [];
        }

        if (!role.GetCreepBodyPartBuilder) {
            return [];
        }
        return role.GetCreepBodyPartBuilder().GetBodyParts(energy);
    }

    private static doSpawn(bodyParts: BodyPartConstant[], role: CreepRole, spawn: StructureSpawn, memory: CreepMemory) {
        const creepName = this.generateUniqueCreepName(role);
        const result = spawn.spawnCreep(bodyParts, creepName, { memory: memory });

        if (result === OK) {
            console.log(`Spawned new creep: ${creepName} with role: ${role}`);
        } else {
            console.log(`Failed to spawn creep: ${creepName} with role: ${role}, error code: ${result}`);
        }
    }

    private static generateUniqueCreepName(role: CreepRole): string {
        const timestamp = Date.now();
        return `${role}_${timestamp}`;
    }
}
