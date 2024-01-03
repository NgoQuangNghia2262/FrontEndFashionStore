import { button } from "../../components/Button/button.js";
import { Bill } from "../../fetchData/bill.js";
import { Product } from "../../fetchData/product.js";
import { fetchData } from "../../fetchData/fetchData.js";
import sheet from "./product.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

let productSelected;
const wrapcolor = (colors) => {
  let wrapcolorElement = document.createElement("div");
  wrapcolorElement.className = "wrapcolor";
  wrapcolorElement.innerHTML = `
  <span class="text">Color</span>
  <div class="color">
  </div>
  `;
  let colorElement = wrapcolorElement.querySelector(".color");
  colorElement.style.display = "flex";
  colors.forEach((color) => {
    let coloritemElement = document.createElement("div");
    coloritemElement.className = "color-item";
    coloritemElement.innerHTML = color;
    coloritemElement.addEventListener("click", async () => {
      let element = colorElement.querySelector(".selected");
      if (element) {
        element.classList.remove("selected");
      }
      coloritemElement.classList.add("selected");
      let sizeitemElement = document.querySelector(".wrapsize .size .selected");
      if (sizeitemElement) {
        await Product.findOne({
          name: localStorage.getItem("nameproduct"),
          color: coloritemElement.innerHTML,
          size: sizeitemElement.innerHTML,
        }).then((data) => {
          productSelected = data;
          let inventory = document.querySelector(".wrapquantity .inventory");
          inventory.innerHTML = data.inventory;
        });
      }
    });
    colorElement.appendChild(coloritemElement);
  });
  return wrapcolorElement;
};
const wrapsize = (sizes) => {
  let wrapsizeElement = document.createElement("div");
  wrapsizeElement.className = "wrapsize";
  wrapsizeElement.innerHTML = `
  <span class="text">Size</span>
  <div class="size">
  </div>
  `;
  let sizeElement = wrapsizeElement.querySelector(".size");
  sizeElement.style.display = "flex";
  sizes.forEach((size) => {
    let sizeitemElement = document.createElement("div");
    sizeitemElement.className = "size-item";
    sizeitemElement.innerHTML = size;
    sizeitemElement.addEventListener("click", async () => {
      let element = sizeElement.querySelector(".selected");
      if (element) {
        element.classList.remove("selected");
      }
      sizeitemElement.classList.add("selected");
      let coloritemElement = document.querySelector(
        ".wrapcolor .color .selected"
      );
      if (coloritemElement) {
        await Product.findOne({
          name: localStorage.getItem("nameproduct"),
          color: coloritemElement.innerHTML,
          size: sizeitemElement.innerHTML,
        }).then((data) => {
          productSelected = data;
          let inventory = document.querySelector(".wrapquantity .inventory");
          inventory.innerHTML = data.inventory;
        });
      }
    });
    sizeElement.appendChild(sizeitemElement);
  });
  return wrapsizeElement;
};
const wrapquantity = (product) => {
  let inventory = product ? product.inventory : 200;
  let wrapquantityElement = document.createElement("div");
  wrapquantityElement.className = "wrapquantity";
  wrapquantityElement.innerHTML = `
    <span class="text">Quantity</span>
    <div>
      <button class="quantity subQuantity">-</button>
      <div class="quantity textQuantity">1</div>
      <button class="quantity addQuantity">+</button>
      <span class="inventory">${inventory}</span>
      <span>sản phẩm</span>  
    </div>
  `;
  let btnsubQuantity = wrapquantityElement.querySelector(".subQuantity");
  let btnaddQuantity = wrapquantityElement.querySelector(".addQuantity");
  let text = wrapquantityElement.querySelector(".textQuantity");
  btnsubQuantity.addEventListener("click", () => {
    if (text.innerHTML > 0) {
      text.innerHTML--;
    }
  });
  btnaddQuantity.addEventListener("click", () => {
    if (text.innerHTML < inventory) {
      text.innerHTML++;
    }
  });
  return wrapquantityElement;
};

export const product = async () => {
  let products = await Product.findProductByName(
    localStorage.getItem("nameproduct")
  );
  let colors = [];
  let sizes = [];
  products.forEach((product) => {
    if (!colors.includes(product.color)) {
      colors.push(product.color);
    }
    if (!sizes.includes(product.size)) {
      sizes.push(product.size);
    }
  });
  let productElement = document.createElement("div");
  productElement.id = "PageProduct";
  productElement.innerHTML = `
  <div class="container">
    <div class="img">
      <img src="${products[0].img}" alt="">
    </div>
    <div class="info">
    <h2 class="title">${products[0].name}</h2>
      <div class="idproduct">
        <span>Mã sp : đang cập nhật</span>
      </div>
      <div class="price">
        <span class="newPrice">${products[0].price}</span>
        <span class="oldPrice"></span>
      </div>
    <div class="service">
      <img src="./images/iamge_product2.webp" alt="">
      <div>
        <h3>Miễn phí vận chuyển</h3>
        <span>Cho đơn hàng từ 499.000đ</span>
      </div>
    </div>
    <div class="service">
      <img src="./images/iamge_product1.webp" alt="">
      <div>
        <h3>Miễn phí đổi, sửa hàng</h3>
        <span>Đổi hàng trong 30 ngày kể từ ngày mua Hỗ trợ sửa đồ miễn phí</span>
      </div>
    </div>
    </div>
  </div>
  `;
  let infoElement = productElement.querySelector(".info");
  infoElement.appendChild(wrapcolor(colors));
  infoElement.appendChild(wrapsize(sizes));
  infoElement.appendChild(wrapquantity(products[0]));

  let buttonBuyNow = button({
    text: "Mua ngay",
    tag: "button",
  });
  buttonBuyNow.addEventListener("click", () => {});
  let buttonAddToCart = button({
    text: "Thêm vào giỏ hàng",
    tag: "button",
    className: "fff",
  });
  buttonAddToCart.addEventListener("click", async () => {
    let quantityDetails = document.querySelector(
      "#PageProduct .wrapquantity .textQuantity"
    );
    if (!productSelected) {
      alert("Vui lòng chọn size và màu sản phẩm");
      return;
    }
    const billingDetail = {
      product: {
        name: productSelected.name,
        size: productSelected.size,
        color: productSelected.color,
      },
      quantity: quantityDetails.innerHTML,
    };
    await Bill.Purchase(billingDetail)
      .then((mes) => {
        alert(mes);
      })
      .catch((err) => {
        alert(err);
      });
  });
  infoElement.appendChild(buttonBuyNow);
  infoElement.appendChild(buttonAddToCart);
  return productElement;
};
