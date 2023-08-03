import { fetchData } from "./fetchData.js";
export class User {
  constructor({ username, password, permissions }) {
    (this.username = username.trim()),
      (this.password = password ? password.trim() : undefined),
      (this.permissions = permissions ? permissions.trim() : undefined);
  }
  static async getLoggedInUser() {
    try {
      let res = await fetchData(
        "http://localhost:8080/v1/data/user/getLoggedInUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
          },
          credentials: "include",
        }
      );
      return new User(res.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
