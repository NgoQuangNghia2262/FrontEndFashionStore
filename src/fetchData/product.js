import { fetchData } from "./fetchData.js";
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
    this.img = img.trim();
    this.name = name.trim();
    this.category = category.trim();
    this.color = color ? color.trim() : undefined;
    this.size = size ? size.trim() : undefined;
    this.price = price;
    this.discount = discount;
    this.describe = describe.trim();
    this.inventory = inventory;
  }
  static async findOne({ name, color, size }) {
    try {
      const url = `http://localhost:8080/v1/data/product/findone?name=${name}&color=${color}&size=${size}`;
      const productJson = await fetchData(url);
      return new Product(productJson.data);
    } catch {
      return null;
    }
  }
  static async findAll() {
    try {
      const url = `http://localhost:8080/v1/data/product/findall`;
      const productsJson = await fetchData(url);
      const products = productsJson.data.map((product) => {
        return new Product(product);
      });
      return products;
    } catch {
      return null;
    }
  }
  static async findProductByName(name) {
    try {
      const url = `http://localhost:8080/v1/data/product/findproductbyname?name=${name}`;
      const productsJson = await fetchData(url);
      const products = productsJson.data.map((product) => {
        return new Product(product);
      });
      return products;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  static async findProductBySize(size) {
    try {
      const url = `http://localhost:8080/v1/data/product/findproductbysize?size=${size}`;
      const productsJson = await fetchData(url);
      const products = productsJson.data.map((product) => {
        return new Product(product);
      });
      return products;
    } catch {
      return null;
    }
  }
  static async findProductByPrice(price) {
    try {
      const productsJson = await fetchData(
        `http://localhost:8080/v1/data/product/findProductByPrice?Price = ${price}`
      );
      const products = productsJson.data.map((product) => {
        return new Product(product);
      });
      return products;
    } catch {
      return null;
    }
  }
  static async findProductGroupByName() {
    try {
      const productsJson = await fetchData(
        "http://localhost:8080/v1/data/product/findproductgroupbyname"
      );
      const products = productsJson.data.map((product) => {
        return new Product(product);
      });
      return products;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async create() {}
}
