import jwt from "jsonwebtoken";

import { NextFunction, Response } from "express";
import { UsersModel, Users } from "../databases/models/users";
import { ResponseHelper } from "../helpers/response.helper";
import { IUserReq } from "../interfaces/user.req.interface";


export const authenticateToken: (
  req: IUserReq, res: Response, next: NextFunction
) => Promise<void> = async (req, res, next) => {

  const responseHelper = new ResponseHelper();

  try {
    const bearerToken = req.headers.authorization
    if (bearerToken === undefined || bearerToken === null) {
      responseHelper.error('You are not authorized, please login', null, 401)(res)
      return
    }

    const tokenUser = bearerToken.split('Bearer ')[1]
    const tokenPayload = jwt.verify(tokenUser, process.env.JWT_SECRET ?? 'Rahasia') as Users

    const user = await UsersModel.query().findById(tokenPayload.id)
    if (user === undefined || user === null) {
      responseHelper.error('You are not authorized, please login', null, 401)(res)
      return
    }

    const isHavetoken = await UsersModel.query().findOne({
      token: tokenUser
    })

    if (isHavetoken === undefined || isHavetoken === null) {
      responseHelper.error('You are not authorized, please login', null, 401)(res)
      return
    }

    req.user = user as Users
    next()
  } catch (error) {
    responseHelper.error('You are not authorized, please login', null, 401)(res)
  }
}