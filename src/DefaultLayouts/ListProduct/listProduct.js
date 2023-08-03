import { button } from "../../components/Button/button.js";
import { product } from "../../components/Product/product.js";
import sheet from "./listProduct.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
export const listProduct = ({
  className,
  title,
  banner,
  style,
  styleButton,
  menu,
  products,
}) => {
  const listProductElement = document.createElement("div");
  listProductElement.id = "DefaultLayouts_ListProduct";
  if (className) {
    listProductElement.className = className;
  }
  if (style) {
    listProductElement.style = style;
  }
  listProductElement.innerHTML = `
  <div class="container">
        <div class="product_header">
          <div class="title">
            <h1>${title}</h1>
          </div>
          <div class="menu">
            <ul>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
								<path d="M4.47107 1L0.999988 4.52892L4.47107 8" stroke="#AAABAB" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M6.49585 4.52905H1.05781" stroke="#AAABAB" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M10.8347 4.52905H8.80992" stroke="#AAABAB" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
              <li class="activate">Quần áo</li>
              <li>Phụ kiện</li>
              <li>Giày dép</li>
              <li>Bé gái</li>
              <li>Bé trai</li>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
								<path d="M12.4492 1L18.4492 7.09998L12.4492 13.1" fill="#FFF6E8"></path>
								<path d="M12.4492 1L18.4492 7.09998L12.4492 13.1" stroke="#1C5B41" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M8.94922 7.09998H18.3492" stroke="#1C5B41" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M1.44922 7.09998H4.94922" stroke="#1C5B41" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
            </ul>
          </div>
        </div>
      <div class="product_footer">
      ${
        banner
          ? ` 
       <div class="banner">
       <a href="#">
        <img src="${banner}" alt="">
       </a>
       </div>`
          : ""
      }
      <div id="list_product">
     </div>
      </div>
        </div>
      </div>
  `;

  let buttonSeeAll = button({
    text: "Xem tất cả",
    tag: "button",
  });
  if (styleButton) {
    buttonSeeAll = button({
      text: "Xem tất cả",
      tag: "button",
      style: styleButton,
    });
  }
  if (menu) {
    listProductElement.querySelector(".menu").style.display = "none";
  }
  if (products) {
    products.forEach((element) => {
      listProductElement
        .querySelector("#list_product")
        .appendChild(product(element));
    });
  }
  listProductElement.appendChild(buttonSeeAll);
  return listProductElement;
};
