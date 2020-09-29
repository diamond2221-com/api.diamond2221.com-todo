import { Application } from "egg";
import "reflect-metadata"

export default async (app: Application) => {
    app.logger.info("Server Started!")
}
