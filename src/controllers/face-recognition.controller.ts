import { Response, Request } from "express";
import { VisitorRecord } from '../databases/models/visitor_records';
import { FaceRecognitionService } from './../services/face-recognition.service';
import { ResponseHelper } from "../helpers/response.helper";

export class FaceRecognitionController extends ResponseHelper {
  protected faceRecognitionService;

  constructor() {
    super();
    this.faceRecognitionService = new FaceRecognitionService();
  }

  list = async (req: Request, res: Response) => {
    try {
      const data = await this.faceRecognitionService.list(req.body);

      return res.json({
        'msg': 'success',
        'result': 1,
        'success': true,
        total: data.total,
        data: data.results
      });
    } catch (error) {
      return res.status(500).json({
        result: 0,
        success: false,
        msg: `Gagal ambil data ${error}`,
      });
    }
  }

  info = async (req: Request, res: Response) => {
    try {
      const data = await this.faceRecognitionService.info(req.body);

      if (!data) {
        return res.status(404).json({
          msg: 'Data not found',
          result: 0,
          success: false
        });
      }

      return res.json({
        'msg': 'success',
        'result': 1,
        'success': true,
        data
      });
    } catch (error) {
      return res.status(500).json({
        msg: `Gagal ambil data ${error}`,
        result: 0,
        success: false,
      });
    }
  }


  create = async (req: Request, res: Response) => {
    try {
      const {
        groupId,
        deviceKey,
        idcardNumber,
        recordId,
        time,
        type,
        imgBase64,
        extra
      } = req.body;

      if (!groupId || !deviceKey || !idcardNumber || !recordId || !time || !type || !imgBase64) {
        return res.status(400).json({
          result: 0,
          success: false,
          msg: 'Parameter tidak lengkap',
        });
      }

      const body = {
        group_id: groupId,
        device_key: deviceKey,
        idcard_num: idcardNumber,
        record_id: recordId,
        img_base64: imgBase64 ?? null,
        time,
        type,
        extra: extra ? (typeof extra === 'string' ? JSON.parse(extra) : extra) : null
      };

      await this.faceRecognitionService.create(body);

      return res.json({
        result: 1,
        success: true,
        msg: 'Diterima dengan sukses',
      });

    } catch (error) {
      return res.status(500).json({
        result: 0,
        success: false,
        msg: `Gagal upload data ${error}`,
      });
    }
  };

  listVisitorRecords = async (req: Request, res: Response) => {
    try {
      const data = await this.faceRecognitionService.listVisitorRecord(req.query);

    return this.success("Data ditemukan", data, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }
}