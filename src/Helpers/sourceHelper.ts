export class SourceHelper {
    public static GetClosestAvailableSource(roomName: string, creep: Creep): Source {
        var number: { [distance: number]: Source } = {};

        Object.values(Memory.rooms[roomName].sources)
            .forEach(source => {
                var gameSource = Game.getObjectById(source.id);
                if (gameSource == undefined) {
                    return;
                }
                const availableEnergy = source.EnergyStored - source.EnergyRequested;

                if (availableEnergy > creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
                    var num = Game.creeps[creep.name].pos.getRangeTo(gameSource.pos);
                    number[num] = source;
                }
            });
        var min = Math.min.apply(null, Object.keys(number).map(Number));

        var minSource = number[min];

        return minSource;
    }
}
