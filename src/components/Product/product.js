import sheet from "./product.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const product = (item) => {
  const productElement = document.createElement("div");
  productElement.className = "list_product-item";
  productElement.id = "Component_Product";
  productElement.innerHTML = `
 <div class="img">
 <a href="/product">
  <img
    src="${item.img}"
    alt=""
    style="height: 190px;width: 190px; border-radius: 10px;"
  />
 </a>
 </div>
     <div class="title">
         <span>${item.name}</span>
     </div>
     <div class="newprice">
           <h3>${item.price} đ</h3>
     </div>
 `;
  productElement.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("nameproduct", item.name);
    window.location.href = "/product";
  });
  return productElement;
};
