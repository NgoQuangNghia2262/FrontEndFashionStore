import { fetchData } from "./fetchData.js";
import { Variable } from "../static/variable.js";
export class User {
  constructor({ username, password, permissions }) {
    (this.username = username.trim()),
      (this.password = password ? password.trim() : undefined),
      (this.permissions = permissions ? permissions.trim() : undefined);
  }
  static async getLoggedInUser() {
    try {
      let res = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}${Variable.PROT}/v1/data/user/getLoggedInUser`,
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
      console.log(res);
      return new User(res.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
