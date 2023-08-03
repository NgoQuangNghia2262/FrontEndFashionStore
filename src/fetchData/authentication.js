import { fetchData } from "../fetchData/fetchData.js";
export class Authentication {
  static async Login({ username, password }) {
    const response = await fetchData(
      "http://localhost:8080/v1/data/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  }
  static async Register({ username, password, permissions }) {
    const response = await fetchData(
      "http://localhost:8080/v1/data/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          permissions,
        }),
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  }
  static async ChangePassword({ username, password }) {}
}
