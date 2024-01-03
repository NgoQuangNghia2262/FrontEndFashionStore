import { header } from "../HeaderDashboard/header.js";
import { User } from "../../../fetchData/user.js";
import { Product } from "../../../fetchData/product.js";

import sheet from "./listproduct.css" assert { type: "css" };
import { loader1 } from "../../../components/Loader/loader1.js";
document.adoptedStyleSheets.push(sheet);

const load_list_product = (listproductElement, products) => {
  listproductElement.innerHTML = "";
  products.forEach((product) => {
    listproductElement.appendChild(productHTML(product));
  });
  const loader = listproductElement.querySelector(".loader");
  if (loader) {
    listproductElement.removeChild(loader);
  }
};
const Create_And_Handle_Event_Search = (listproductElement, inputElement) => {
  if (!inputElement) {
    return;
  }
  let timeoutId;
  inputElement.addEventListener("input", (event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async function () {
      let text = event.target.value;
      const products = await Product.findProductByWord(text);
      console.log(products);
      load_list_product(listproductElement, products);
    }, 1000);
  });
};
const handle_pagination = (listproductElement) => {
  const subPage = listproductElement.querySelector(".pagination .sub");
  const plusPage = listproductElement.querySelector(".pagination .plus");
  subPage.addEventListener("click", async () => {
    const page = listproductElement.querySelector(".pagination .page");
    if (!page) {
      return;
    }
    if (page.innerHTML <= 1) {
      return;
    }
    page.innerHTML--;
    listproductElement.querySelector("#list_product").innerHTML = ``;
    listproductElement.querySelector("#list_product").appendChild(loader1());
    const products = await Product.findAll(10, page.innerHTML);
    load_list_product(
      listproductElement.querySelector("#list_product"),
      products
    );
  });
  plusPage.addEventListener("click", async () => {
    const page = listproductElement.querySelector(".page");
    if (!page) {
      return;
    }
    page.innerHTML++;
    listproductElement.querySelector("#list_product").innerHTML = ``;
    listproductElement.querySelector("#list_product").appendChild(loader1());
    const products = await Product.findAll(10, page.innerHTML);
    load_list_product(
      listproductElement.querySelector("#list_product"),
      products
    );
  });
};

const productHTML = (obj) => {
  const productElement = document.createElement("a");
  productElement.className = "list_product-item";
  productElement.innerHTML = `
  <img src="${obj.img}" alt="" />
  <p>${obj.name}</p>
  <p>${obj.category}</p>
  <p>${obj.color}</p>
  <p>${obj.size}</p>
  <p>${obj.discount}</p>
  <p>${obj.inventory}</p>
  `;
  return productElement;
};

export const listproduct = async () => {
  let result = await Promise.all([
    User.getLoggedInUser().catch(() => {
      alert("Chưa đăng nhập");
      location.href = "/login";
    }),
    Product.findAll(10, 1),
  ]);
  let loggedInUser = result[0];
  let products = result[1];

  let categorys = [];
  let colors = [];
  let sizes = [];
  if (products) {
    products.forEach((product) => {
      if (!colors.includes(product.color)) {
        colors.push(product.color);
      }
      if (!sizes.includes(product.size)) {
        sizes.push(product.size);
      }
      if (!categorys.includes(product.category)) {
        categorys.push(product.category);
      }
    });
  }
  const listproductElement = document.createElement("div");
  listproductElement.id = "PageDashboardListproduct";
  listproductElement.innerHTML = `
  <div class="container">
  <div class="title">Tất cả sản phẩm</div>
  <div class="search_filter">
    <div class="search">
      <div class="search_icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="sc-gkJlnC jyLyOo"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.891 13.477a6.002 6.002 0 0 0-9.134-7.72 6 6 0 0 0 7.72 9.134l5.715 5.716 1.415-1.415-5.716-5.715Zm-2.063-6.305a4 4 0 1 1-5.656 5.656 4 4 0 0 1 5.657-5.656Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div class="search_input">
        <input type="text" name="" id="" placeholder="Nhập id sản phẩm"/>
      </div>
    </div>
    <div class="filter">
      <div class="filter_category">
        <ul class="filer_options">
        <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
          <li class="filer_options-selected">Loại sản phẩm</li>
        </ul>
      </div>
      <div class="filter_color">
        <ul class="filer_options">
        <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
          <li class="filer_options-selected">Màu sắc</li>
        </ul>
      </div>
      <div class="filter_size">
        <ul class="filer_options">
        <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
          <li class="filer_options-selected">Kích cỡ</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="title_list_product">
    <h4 class="image">Ảnh</h4>
    <h4 class="name">Tên sản phẩm </h4>
    <h4 class="category">Loại</h4>
    <h4 class="color">Màu</h4>
    <h4 class="size">Size</h4>
    <h4 class="discount">Giảm giá</h4>
    <h4 class="inventory">Tồn kho</h4>
  </div>
  <div class="list_product" id="list_product">
  </div>
  <div class="pagination">
    <svg class="sub" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.298 5.99 8.288 12l6.01 6.01 1.414-1.414L11.116 12l4.596-4.596-1.414-1.414Z"
        fill="currentColor"
      ></path>
    </svg>
    <span class="page">1</span>
    <svg class="plus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m9.702 18.01 6.01-6.01-6.01-6.01-1.414 1.414L12.884 12l-4.596 4.596 1.414 1.414Z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</div>  

    `;
  const categoryElement = listproductElement.querySelector(
    ".filter > .filter_category > .filer_options"
  );
  const colorElement = listproductElement.querySelector(
    ".filter > .filter_color > .filer_options"
  );
  const sizeElement = listproductElement.querySelector(
    ".filter > .filter_size > .filer_options"
  );
  categorys.forEach((category) => {
    const li_category = document.createElement("li");
    li_category.className = "filer_options-item";
    li_category.innerHTML = category;
    categoryElement.appendChild(li_category);
  });
  colors.forEach((color) => {
    const li_color = document.createElement("li");
    li_color.className = "filer_options-item";
    li_color.innerHTML = color;
    colorElement.appendChild(li_color);
  });
  sizes.forEach((size) => {
    const li_size = document.createElement("li");
    li_size.className = "filer_options-item";
    li_size.innerHTML = size;
    sizeElement.appendChild(li_size);
  });
  listproductElement.appendChild(
    header({
      user: loggedInUser,
      title: "Danh sách sản phẩm",
    })
  );
  if (products) {
    load_list_product(
      listproductElement.querySelector("#list_product"),
      products
    );
  }
  const pagination = listproductElement.querySelector(".pagination");
  if (pagination) {
    handle_pagination(listproductElement);
  }
  Create_And_Handle_Event_Search(
    listproductElement.querySelector("#list_product"),
    listproductElement.querySelector(".search_filter > .search input")
  );
  return listproductElement;
};
