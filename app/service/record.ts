import { Service } from "egg";
import { IVisitRecordType } from '../types/common';

export default class RecordService extends Service {

    public async createVisitRecord(user_id: string, visit_user_id: string, type: IVisitRecordType) {
        await this.app.model.VisitRecord.createVisitRecord(user_id, visit_user_id, type);
    }
}


