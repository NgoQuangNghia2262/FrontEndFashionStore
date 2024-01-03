import { fetchData } from "./fetchData.js";
import { Variable } from "../static/variable.js";
export class User {
  constructor({ username, password, permissions }) {
    (this.username = username.trim()),
      (this.password = password ? password.trim() : undefined),
      (this.permissions = permissions ? permissions.trim() : undefined);
  }
  static async getLoggedInUser() {
    return new Promise(async (resolve, reject) => {
      let res = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/account/getLoggedInUser`,
        {
          credentials: "include",
        }
      ).catch((err) => {
        reject(err);
      });
      if (res.statusCode == 200) {
        resolve(res.data);
      } else {
        reject(
          `fail with statuscode ${res.statusCode} and message : ${res.message}`
        );
      }
    });
  }
  static getCartForCustomer() {
    return new Promise(async (resolve, reject) => {
      const res = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/customer/getCartForCustomer`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.statusCode == 200) {
        resolve(res.data);
      } else {
        reject(
          `fail with statuscode ${res.statusCode} and message : ${res.message}`
        );
      }
    });
  }
  static RemoveProductsFromCart(billingdetail) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await fetchData(
          `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/customer/RemoveProductsFromCart`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(billingdetail),
          }
        );
        if (res.statusCode == 200) {
          resolve("success");
        } else {
          reject(
            `fail with statuscode ${res.statusCode} and message : ${res.message}`
          );
        }
      } catch (error) {
        reject("error");
      }
    });
  }
}
