import { BillingDetails } from "../../fetchData/billingdetails.js";
import { Product } from "../../fetchData/product.js";
import { button } from "../../components/Button/button.js";
import sheet from "./cart.css" assert { type: "css" };
import { Bill } from "../../fetchData/bill.js";
import { Variable } from "../../static/variable.js";
import { User } from "../../fetchData/user.js";
document.adoptedStyleSheets.push(sheet);

const product = (billingDetail) => {
  const productElement = document.createElement("div");
  productElement.className = "product-item";
  productElement.innerHTML = `
  <div class="left">
    <img src="${Variable.PROTOCOL}://${Variable.DOMAIN}${
    Variable.PROT
  }/v1/data/image/${billingDetail.product.img}" alt="">
    <span>${billingDetail.product.name}</span>
    <span>${billingDetail.product.size}</span>
    <span>${billingDetail.product.color}</span>
  </div>
  <div class="right">
    <p class="price">${billingDetail.product.price}</p>
    <p class="quantity">${billingDetail.quantity}</p>
    <p class="price">${billingDetail.product.price * billingDetail.quantity}</p>
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
      await User.RemoveProductsFromCart(billingDetail)
        .then((mess) => {
          alert(mess);
          productElement.remove();
        })
        .catch((err) => {
          alert(err);
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
  let billingDetails = await User.getCartForCustomer().catch((err) => {
    alert(err);
  });
  let total = 0;
  if (billingDetails) {
    billingDetails.forEach((billingDetail) => {
      cartElement
        .querySelector("#container_product")
        .appendChild(product(billingDetail));
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
    Bill.PlacingAnOrder(noteAddress)
      .then(() => {
        location.href = "/";
        alert(
          "Đặt hàng thành công chúng tôi sẽ giao hàng cho bạn trong vòng 3-4 ngày tới"
        );
      })
      .catch((err) => {
        alert(err);
      });
  });
  cartElement.querySelector(".container_total").appendChild(btnPayment);
  return cartElement;
};
