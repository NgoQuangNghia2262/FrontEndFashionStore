import { Product } from "../../fetchData/product.js";
import sheet from "./home.css" assert { type: "css" };
import { listProduct } from "../../DefaultLayouts/ListProduct/listProduct.js";
document.adoptedStyleSheets.push(sheet);
export const home = async () => {
  const homeElement = document.createElement("div");
  homeElement.id = "PageHome";
  homeElement.innerHTML = `
  <div class="bodywrap">
    <div class="bodywrap_container" style="width: 100%">
      <img style="width: 100%" src="./images/slider_1.webp" alt="alena" />
    </div>
  </div>
  <section
  class="service">
  <div class="container_service">
    <div class="container_service--item">
      <img src="./images/ship.webp" alt="" />
      <h3>MIỄN PHÍ GIAO HÀNG</h3>
      <p>Miễn phí ship với đơn hàng > 498k</p>
    </div>
    <div class="container_service--item">
      <img src="./images/thanhtoan.webp" alt="" />
      <h3>THANH TOÁN COD</h3>
      <p>Thanh toán khi nhận hàng (COD)</p>
    </div>
    <div class="container_service--item">
      <img src="./images/vip.webp" alt="" />
      <h3>KHÁCH HÀNG VIP</h3>
      <p>Ưu đãi dành cho khách hàng VIP</p>
    </div>
    <div class="container_service--item">
      <img src="./images/baohanh.webp" alt="" />
      <h3>HỖ TRỢ BẢO HÀNH</h3>
      <p>Đổi , sửa đồ tại tất cả store</p>
    </div>
  </div>
  </section>
  `;
  let products = await Product.findProductGroupByName({
    pagesize: 6,
    pagenumber: 1,
  });
  homeElement.appendChild(
    listProduct({
      title: "SẢN PHẨM HOT",
      style: "background-color:#FFFAF0;",
      products: products.slice(0, 5),
    })
  );
  homeElement.appendChild(
    listProduct({
      title: "HÀNG MỚI VỀ",
      banner: "./images/logoSanPhamMoi.webp",
      products: products.slice(0, 3),
    })
  );
  homeElement.appendChild(
    listProduct({
      title: "SALE ĐỒNG GIÁ - ĐỪNG LO VỀ GIÁ",
      banner: "./images/banner_sale.webp",
      menu: true,
      products: products.slice(0, 5),
      style: "background-color:#1c5b41;color:#fff;",
      styleButton: "background-color:rgb(254, 150, 20);",
    })
  );
  homeElement.appendChild(
    listProduct({
      title: "SẢN PHẨM GIÁ TỐT",
      banner: "./images/banner_goodprice.webp",
      products: products.slice(0, 3),
    })
  );
  return homeElement;
};
