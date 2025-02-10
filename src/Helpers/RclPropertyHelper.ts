export class RclPropertyHelper{
    public static ExtensionCapacity(rclLevel:number){
        switch(rclLevel){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return 50;
            case 7:
                return 100;
            case 8:
                return 200;
            default:
                throw new Error("invalid rcl level");
        }
    }
}
