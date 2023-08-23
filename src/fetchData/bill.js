import { fetchData } from "./fetchData.js";
import { Variable } from "../static/variable.js";
import { BillingDetails } from "./billingdetails.js";
export class Bill {
  constructor({ id, date, status, discount, note, customer }) {
    this.id = id ? id.trim() : generateRandomString();
    this.date = date
      ? date.toLocaleString("en-US", { timeZone: "UTC" }).split(",")[0]
      : "";
    this.status = status ? status.trim() : "unpaid";
    this.discount = discount ? discount : 0;
    this.note = note ? note.trim() : "";
    this.customer = customer ? customer : "";
  }
  async findBillForCustomer() {
    const url = `${Variable.PROTOCOL}://${Variable.DOMAIN}${Variable.PROT}/v1/data/bill/findBillForCustomer?customer=${this.customer}`;
    let res = fetchData(url);
    if (res.status !== 200) {
      //throw e
    }
    return new Bill(res.data);
  }
  async getTotalAmount() {
    try {
      const res = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}${Variable.PROT}/v1/data/bill/getTotalAmount?id=${this.id}`
      );
      if (res.status !== 200) {
        return 0;
      }
      return res.data[0] ? res.data[0] : 0;
    } catch {
      return 0;
    }
  }
  async getBillingDetails() {
    try {
      const billingDetails = await BillingDetails.findBillingDetailsByIdBill(
        this.id
      );
      return billingDetails;
    } catch (error) {
      return null;
    }
  }
  static async findBillDaybetwenDay({ firstDay, seccondDay }) {
    try {
      const billJson = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}${Variable.PROT}/v1/data/bill/findBillDaybetwenDay?firstDay=${firstDay}&seccondDay=${seccondDay}`
      );
      const bills = billJson.data.map((billJson) => {
        return new Bill(billJson);
      });
      return bills;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async getRevenueForDaybetwenDay({ firstDay, seccondDay }) {
    try {
      const res = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}${Variable.PROT}/v1/data/bill/getRevenueForDaybetwenDay?firstDay=${firstDay}&seccondDay=${seccondDay}`
      );
      if (res.status !== 200) {
        return 0;
      }
      return res.data[0].totalAmount;
    } catch {
      return 0;
    }
  }
  static Order({ id, note }) {
    return new Promise(async (resolve, reject) => {
      const response = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}${Variable.PROT}/v1/data/bill/Order`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
          },
          credentials: "include",
          body: JSON.stringify({ id, note }),
        }
      );
      if (response.status === 201) {
        resolve(response.data);
      } else {
        reject("Fail");
      }
    });
  }
}
