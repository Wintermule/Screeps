import { copyFile } from "fs";
import { memoize } from "lodash";
import { SourceHelper } from "Helpers/sourceHelper";

export class SourceController {
    public Initialize(room: Room) {
        Object.values(Memory.rooms[room.name].sources).forEach(source => {
            source.EnergyStored = this.GetEnergyAvailable(source.id);
            source.EnergyRequested = 0;
        });
    }

    private GetEnergyAvailable(roomId: Id<Source>): number {
        var resources = Game.getObjectById(roomId)?.pos.findInRange(FIND_DROPPED_RESOURCES, 2);
        if (resources != undefined) {
            return resources.reduce((sum, currentValue) => {
                return sum + currentValue.amount;
            }, 0);
        }
        return -1;
    }
}
