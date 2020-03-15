import { Application } from "egg";
import "reflect-metadata"

export default async (app: Application) => {
    await app.graphql.init();
    app.logger.info("Server Started!")
}
