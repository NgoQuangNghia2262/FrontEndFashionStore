import { fetchData } from "./fetchData.js";
import { Variable } from "../static/variable.js";
export class Product {
  constructor({
    img,
    name,
    category,
    color,
    size,
    price,
    discount,
    describe,
    inventory,
  }) {
    this.img = `${Variable.PROTOCOL}://${Variable.DOMAIN}${
      Variable.PROT
    }/v1/data/image/${img.trim()}`;
    this.name = name.trim();
    this.category = category ? category.trim() : undefined;
    this.color = color ? color.trim() : undefined;
    this.size = size ? size.trim() : undefined;
    this.price = price;
    this.discount = discount;
    this.describe = describe ? describe.trim() : undefined;
    this.inventory = inventory;
  }
  static findOne({ name, color, size }) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/product/find-one`;
        const res = await fetchData(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, color, size }),
        });
        debugger;
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res.message);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  static findAll(pagesize, pagenumber) {
    return new Promise(async (resolve, reject) => {
      try {
        let url = `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/product/find-all?PageSize=${pagesize}&PageNumber=${pagenumber}`;
        const res = await fetchData(url);
        if (res.statusCode == 200) {
          const products = res.data.map((product) => {
            return new Product(product);
          });
          resolve(products);
        } else {
          reject(res.message);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  static async findProductByName(name) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/product/FindProductByName?name=${name}`;
        const res = await fetchData(url);
        if (res.statusCode == 200) {
          const products = res.data.map((product) => {
            return new Product(product);
          });
          resolve(products);
        } else {
          reject(res.message);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  static findProductGroupByName({ pagesize, pagenumber }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetchData(
          `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/product/FindImgNamePriceProducts?PageSize=${pagesize}&PageNumber=${pagenumber}`
        );
        if (res.statusCode == 200) {
          const products = res.data.map((product) => {
            return new Product(product);
          });
          resolve(products);
        } else {
          reject(res.message);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  static async findProductByWord(word) {
    try {
      const productsJson = await fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}${Variable.PROT}/v1/data/product/findProductByWord?word=${word}`
      );
      const products = productsJson.data.map((product) => {
        return new Product(product);
      });
      return products;
    } catch {
      return null;
    }
  }
  create() {
    return new Promise(async (resolve, reject) => {
      fetchData(
        `${Variable.PROTOCOL}://${Variable.DOMAIN}:${Variable.PROT_GATEWAY}/${Variable.SERVICE_ASPNET}/api/product/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this),
        }
      )
        .then((res) => {
          if (res.statusCode == 200) {
            resolve("Succecc !!");
          } else {
            reject(`fail with statusCode ${res.statusCode}`);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
