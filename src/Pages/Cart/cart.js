import { BillingDetails } from "../../fetchData/billingdetails.js";
import { Product } from "../../fetchData/product.js";
import { button } from "../../components/Button/button.js";
import sheet from "./cart.css" assert { type: "css" };
import { Bill } from "../../fetchData/bill.js";
import { Variable } from "../../static/variable.js";
document.adoptedStyleSheets.push(sheet);

const product = (product, quantity) => {
  const productElement = document.createElement("div");
  productElement.className = "product-item";
  productElement.innerHTML = `
  <div class="left">
    <img src="${Variable.PROTOCOL}://${Variable.DOMAIN}${
    Variable.PROT
  }/v1/data/image/${product.img}" alt="">
    <span>${product.name}</span>
    <span>${product.size}</span>
    <span>${product.color}</span>
  </div>
  <div class="right">
    <p class="price">${product.price}</p>
    <p class="quantity">${quantity}</p>
    <p class="price">${product.price * quantity}</p>
    <img src="./images/icons8-delete.svg" alt="" />
  </div>
  `;
  productElement
    .querySelector(".right > img")
    .addEventListener("click", async () => {
      const confirmDelete = confirm("Bạn có chắc muốn xóa phần tử này?");
      if (!confirmDelete) {
        return;
      }
      const billingDetail_Seleted = new BillingDetails({
        nameProduct: product.name,
        sizeProduct: product.size,
        colorProduct: product.color,
      });
      billingDetail_Seleted
        .delete()
        .then((mess) => {
          location.href = "/cart";
          alert(mess);
        })
        .catch((mess) => {
          alert(mess);
        });
    });
  return productElement;
};
export const cart = async () => {
  const cartElement = document.createElement("div");
  cartElement.id = "PageCart";
  cartElement.innerHTML = `
  <div id="container_product">
    <div class="product-item" style="border-top:none;">
      <div class="left">
        <h4>Thông tin sản phẩm</h4>
      </div>
      <div class="right">
        <h4>Đơn giá</h4>
        <h4>Số lượng</h4>
        <h4>Thành tiền</h4>
      </div>
    </div>
  </div>
  <div class="container_total">
    <div>
      <p>Tổng tiền</p>
      <span class="total"></span>
    </div>
    <nav class="note">
      <p>Ghi chú</p>
      <textarea cols="30" rows="5"></textarea>
    </nav>
  </div>
  `;
  let billingDetails = await BillingDetails.getCartForCustomer();
  let total = 0;
  if (billingDetails) {
    let arrPromiesGetProduct = billingDetails.map((billingDetail) => {
      total += billingDetail.price * billingDetail.quantity;
      return Product.findOne({
        name: billingDetail.nameProduct,
        color: billingDetail.colorProduct,
        size: billingDetail.sizeProduct,
      });
    });
    let products = await Promise.all(arrPromiesGetProduct);
    billingDetails.forEach((billingDetail) => {
      let item = products.find((element) => {
        return (
          element.name === billingDetail.nameProduct &&
          element.color === billingDetail.colorProduct &&
          element.size === billingDetail.sizeProduct
        );
      });
      cartElement
        .querySelector("#container_product")
        .appendChild(product(item, billingDetail.quantity));
      cartElement.querySelector(".container_total > div > .total").innerHTML =
        total;
    });
  }

  let btnPayment = button({
    text: "Thanh toán",
    tag: "button",
  });
  btnPayment.addEventListener("click", () => {
    let noteAddress = cartElement.querySelector(
      ".container_total .note > textarea"
    ).value;
    if (!noteAddress) {
      alert(
        "Bạn đang mua online vui lòng điền địa chỉ để cúng tôi giao hàng đến nơi cho bạn"
      );
      return;
    }
    Bill.Order({ note: noteAddress })
      .then(() => {
        location.href = "/";
        alert("Success");
      })
      .catch(() => {
        alert("Fail");
      });
  });
  cartElement.querySelector(".container_total").appendChild(btnPayment);
  return cartElement;
};
