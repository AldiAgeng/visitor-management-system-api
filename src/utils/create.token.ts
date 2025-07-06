import jwt from "jsonwebtoken";

export const createToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "Rahasia", {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
}

export const createRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "Rahasia", {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
}
