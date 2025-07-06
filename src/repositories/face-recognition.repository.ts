import knexInstance from "../databases";
import { VisitorRecordModel } from "../databases/models/visitor_records";

export class FaceRecognitionRepository {
  async create(data: any) {
    return await VisitorRecordModel.query().insert(data).returning("*");
  }

  async findDeviceKey(deviceKey: string) {
    return await VisitorRecordModel.query().findOne({ device_key: deviceKey });
  }

  async show(payload: any) {
    return [];
  }

  async list(data: any) {
    const { page, pageSize, deviceKey, groupId } = data;

    const offset = page && pageSize ? (+page - 1) * +pageSize : 0;
    const limit = pageSize ? +pageSize : null;

    const query = knexInstance("visitor_records")
      .join("visitors", "visitor_records.idcard_num", "visitors.idcard_num")
      .where("visitor_records.group_id", groupId)
      .andWhere("visitor_records.device_key", deviceKey)
      .select(
        "visitors.idcard_num as idcardNum",
        "visitors.type",
        "visitors.md5"
      );

    if (limit) {
      query.limit(limit).offset(offset);
    }

    const results = await query;

    const formatted = results.map((record) => ({
      idcardNum: record.idcardNum,
      name: "",
      imgBase64: "",
      type: record.type,
      passtime: "",
      md5: record.md5
    }));

    return {
      total: results.length,
      results: formatted
    }
  }

  async info(data: any){
    const { groupId, deviceKey, idcardNum } = data;

    const result = await knexInstance("visitor_records")
      .join("visitors", "visitor_records.idcard_num", "visitors.idcard_num")
      .where("visitor_records.group_id", groupId)
      .andWhere("visitor_records.device_key", deviceKey)
      .andWhere("visitors.idcard_num", idcardNum)
      .orderBy("visitor_records.created_at", "desc")
      .select(
        "visitors.idcard_num as idcardNum",
        "visitors.name",
        "visitors.img_base64 as imgBase64",
        "visitors.type",
        "visitors.passtime",
        "visitors.md5"
      )
      .first();

    return result;
  }
}