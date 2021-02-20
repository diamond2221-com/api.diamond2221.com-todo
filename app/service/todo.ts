import { Service } from "egg";
export default class TodoService extends Service {
    public fetchAllAndCount() {
        console.log(this.app.model.User)
        return []
    }
}


