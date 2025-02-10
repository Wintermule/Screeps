import { RclPropertyHelper } from "./RclPropertyHelper";

export class SpawnHelper {
    public GetSpawnEnergyCapacity(spawn: StructureSpawn, rcLevel: number): number {
        var extensions = spawn.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_EXTENSION
        });

        return spawn.store.getCapacity(RESOURCE_ENERGY) + (extensions.length * RclPropertyHelper.ExtensionCapacity(rcLevel));
    }
}
