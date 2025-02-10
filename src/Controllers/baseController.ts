
import { SourceController } from "./SourceController";
import { RoleController } from "./roleController";
import { SpawnController } from "./spawnController";

export class BaseController {
    SourceController: SourceController;
    RoleController: RoleController;
    SpawnController: SpawnController;

    constructor(mainRoomName: string) {
        const mainRoom = Game.rooms[mainRoomName];

        this.SourceController = new SourceController();
        this.RoleController = new RoleController();
        this.SpawnController = new SpawnController(mainRoomName);
    }

    public execute() {
        this.RoleController.InvokeAllRoles();
        this.SpawnController.GetSpawnBuildJobs();
        this.SpawnController.manageSpawning();
    }
}
