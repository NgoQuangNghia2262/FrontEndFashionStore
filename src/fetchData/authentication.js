import { fetchData } from "../fetchData/fetchData.js";
import { Variable } from "../static/variable.js";
export class Authentication {
  static Login({ username, password }) {
    return new Promise(async (resolve, reject) => {
      const response = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/account/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      if (response.statusCode == 15) {
        reject(response.message);
      }
      resolve(response.message);
    });
  }
  static Register({ username, password, permissions }) {
    return new Promise(async (resolve, reject) => {
      const response = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/account/regist`,
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
      if (response.statusCode === 200) {
        resolve("Success");
      } else {
        reject(`fail with statuscode ${response.statusCode}`);
      }
    });
  }
  static ChangePassword({ username, password }) {}
  static LogOut() {
    return new Promise(async (resolve, reject) => {
      await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/account/log-out`,
        {
          credentials: "include",
        }
      )
        .then(() => {
          resolve("success");
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
