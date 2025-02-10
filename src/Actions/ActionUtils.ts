import { CreepRole } from "Controllers/roleController";

/**
 * Updates the working status of a creep based on its role and energy status.
 * @param creep - The creep whose working status needs to be updated.
 */
export function updateWorkingStatus(creep: Creep): void {
    if (creep.memory.role === CreepRole.HARVESTER) {
        // For harvesters, working status is based on the presence of a target source.
        creep.memory.working = creep.memory.targetSource !== undefined;
    } else {
        // For other roles, working status is based on energy levels.
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
        } else if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
        }
    }
}
