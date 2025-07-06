import { Response, Request } from "express";
import { ResponseHelper } from "../helpers/response.helper";
import { Users } from "../databases/models/users";
import { IUserReq } from "../interfaces/user.req.interface";
import { UserService } from "../services/user.service";

export class UserController extends ResponseHelper {
  protected userService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async register(req: Request<{}, {}, Users>, res: Response) {
    try {
      const user = await this.userService.create(req.body);

      return this.success("Data disimpan", user, 201)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 400)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async login(req: IUserReq, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await this.userService.login(username, password);

      return this.success("Berhasil login", user, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 401)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async logout(req: IUserReq, res: Response) {
    try {
      const user = req.user;

      const userLogout = await this.userService.logout(user);

      if (!userLogout) {
        return this.error("Logout gagal", null, 401)(res);
      }

      return this.success("Berhasil logout", null, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 401)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async refreshToken(
    req: Request<{}, { token: string }, { refreshToken: string }>,
    res: Response
  ) {
    try {
      const refresh_token = req.body.refreshToken;

      const token = await this.userService.refreshToken(refresh_token);

      return this.success(
        "Berhasil memperbarui token",
        {
          token,
        },
        200
      )(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 401)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async whoami(req: IUserReq, res: Response) {
    try {
      return this.success("Berhasil mendapatkan data user", req.user, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 401)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async getUserById(req: IUserReq, res: Response) {
    try {
      const user = await this.userService.getUserById(
        req.params.id ? parseInt(req.params.id) : 0
      );

      if (!user) {
        return this.error("User not found", null, 404)(res);
      }

      return this.success("User found", user, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 400)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async list(req: IUserReq, res: Response) {
    try {
      const users = await this.userService.list();

      return this.success("List of users", users, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 400)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async update(req: IUserReq, res: Response) {
    try {
      const userId = req.params.id ? parseInt(req.params.id) : 0;
      const payload = req.body;

      const updatedUser = await this.userService.update(userId, payload);

      if (!updatedUser) {
        return this.error("User not found", null, 404)(res);
      }

      return this.success("User updated successfully", updatedUser, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 400)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async delete(req: IUserReq, res: Response) {
    try {
      const userId = req.params.id ? parseInt(req.params.id) : 0;

      const deletedUser = await this.userService.delete(userId);

      if (!deletedUser) {
        return this.error("User not found", null, 404)(res);
      }

      return this.success("User deleted successfully", null, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 400)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }
}
