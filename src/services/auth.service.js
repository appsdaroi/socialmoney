import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (username, password) => {
    return this.instance
      .post("/api/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res)
        return {
          id: res.data.userId,
          username: res.data.username,
          bank: res.data.bank,
          accessToken: res.data.access_token,
          expiredAt: res.data.expiredAt,
        };
      });
  };

  getMe = (userId) => {
    return this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };
}
