import { fetchData } from "./fetchData.js";
export class BillingDetails {
  constructor({
    id,
    idBill,
    sizeProduct,
    price,
    nameProduct,
    colorProduct,
    quantity,
  }) {
    this.id = id;
    this.idBill = idBill ? idBill.trim() : "";
    this.sizeProduct = sizeProduct.trim();
    this.price = price ? price : 0;
    this.nameProduct = nameProduct.trim();
    this.colorProduct = colorProduct.trim();
    this.quantity = quantity;
  }
  async create() {
    const url = `http://localhost:8080/v1/data/billingdetails/create`;
    await fetchData(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify(this),
    });
  }
  async delete() {}
  async update() {}
  static async findBillingDetailsByIdBill(idBill) {
    try {
      let res = await fetchData(
        `http://localhost:8080/v1/data/billingdetails/findBillingDetailsByIdBill?idbill=${idBill}`
      );
      if (res.status === 200) {
        let billingDetails = res.data.map((billingDetail) => {
          return new BillingDetails(billingDetail);
        });
        return billingDetails;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  static async getCartForCustomer() {
    try {
      let res = await fetchData(
        `http://localhost:8080/v1/data/billingdetails/getCartForCustomer`,
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
      if (res.status === 200) {
        let billingDetails = res.data.map((billingDetail) => {
          return new BillingDetails(billingDetail);
        });
        return billingDetails;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
