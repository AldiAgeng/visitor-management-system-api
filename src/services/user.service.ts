import { UserRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/bcrypt.password";
import { createToken, createRefreshToken } from "../utils/create.token";

export class UserService {

  protected userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(user: any) {

    const isUsernameExist = await this.userRepository.show({ username: user.username });

    if (isUsernameExist) {
      throw new Error("Username already exist");
    }

    user.password = await hashPassword(user.password) as string;

    return await this.userRepository.create(user);
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.show({ username });
  
    if (!user) {
      throw new Error("Username or password invalid");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Username or password invalid");
    }

    const token = createToken({
      id: user.id,
      name: user.name,
      username: user.username,
    });

    const refresh_token = createRefreshToken({
      id: user.id,
      name: user.name,
      username: user.username,
    });

    await this.userRepository.update(user.id, {
      token,
      refresh_token
    });

    return {
      token,
      refresh_token,
      role: user.role
    }
  }

  async logout(user: any) {
    return await this.userRepository.update(user.id, {
      token: "",
      refresh_token: ""
    });
  }

  async refreshToken(refreshToken: string) {
    const user = await this.userRepository.show({ refresh_token: refreshToken });

    if (!user) {
      throw new Error("Refresh token invalid");
    }

    const token = createToken({
      id: user.id,
      name: user.name,
      username: user.username,
    });

    await this.userRepository.update(user.id, {
      token
    });

    return {
      token
    }
  }

  async getUserById(id: number) {
    const user = await this.userRepository.show({ id });
    return {
      id: user?.id,
      name: user?.name,
      username: user?.username,
      role: user?.role,
      created_at: user?.created_at,
      updated_at: user?.updated_at
    }
  }

  async list() {
    return await this.userRepository.list();
  }

  async update(userId: number, payload: any) {
    const user = await this.userRepository.show({ id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    if (payload.password) {
      payload.password = await hashPassword(payload.password) as string;
    }

    return await this.userRepository.update(userId, payload);
  }

  async delete(userId: number) {
    const user = await this.userRepository.show({ id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    return await this.userRepository.delete(userId);
  }
}