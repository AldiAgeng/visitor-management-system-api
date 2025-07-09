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

    const query = knexInstance("visitors")
      .join("devices", "visitors.device_id", "devices.id")
      .where("visitors.group_id", groupId)
      .andWhere("devices.device_key", deviceKey)
      .select(
        "visitors.idcard_num as idcardNum",
        "visitors.type",
        "visitors.md5"
      );

    if (limit) {
      query.limit(+limit).offset(+offset);
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

    const result = await knexInstance("visitors")
      .join("devices", "visitors.device_id", "devices.id")
      .where("visitors.group_id", groupId)
      .andWhere("devices.device_key", deviceKey)
      .andWhere("visitors.idcard_num", idcardNum)
      .orderBy("visitors.created_at", "desc")
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

  listVisitorRecord = async (data: any) => {
    console.log(data);
    const visitorRecord = VisitorRecordModel.query();

    if (data.device_key) {
      visitorRecord.where("device_key", data.device_key);
    }

    if (data.idcard_num) {
      visitorRecord.orWhere("idcard_num", data.idcard_num);
    }

    return await visitorRecord.select("*").orderBy("created_at", "desc");
  }
}