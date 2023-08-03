import { BillingDetails } from "../../fetchData/billingdetails.js";
import { Product } from "../../fetchData/product.js";
import { button } from "../../components/Button/button.js";
import sheet from "./cart.css" assert { type: "css" };
import { Bill } from "../../fetchData/bill.js";
document.adoptedStyleSheets.push(sheet);

const product = (product, quantity) => {
  const productElement = document.createElement("div");
  productElement.className = "product-item";
  productElement.innerHTML = `
  <div class="left">
    <img src="http://localhost:8080/v1/data/image/${product.img}" alt="">
    <span>${product.name}</span>
    <span>${product.size}</span>
    <span>${product.color}</span>
  </div>
  <div class="right">
    <p class="price">${product.price}</p>
    <p class="quantity">${quantity}</p>
    <p class="price">${product.price * quantity}</p>
  </div>

  `;

  return productElement;
};
export const cart = async () => {
  let billingDetails = await BillingDetails.getCartForCustomer();
  let total = 0;
  let arrPromiesGetProduct = billingDetails.map((billingDetail) => {
    total += billingDetail.price * billingDetail.quantity;
    return Product.findOne({
      name: billingDetail.nameProduct,
      color: billingDetail.colorProduct,
      size: billingDetail.sizeProduct,
    });
  });
  let products = await Promise.all(arrPromiesGetProduct);
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
      <span class="total">${total}</span>
    </div>
    <nav class="note">
      <p>Ghi chú</p>
      <textarea cols="30" rows="5"></textarea>
    </nav>
  </div>
  `;
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
  });
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
