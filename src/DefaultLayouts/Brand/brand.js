import sheet from "./brand.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
export const brand = () => {
  const brandElement = document.createElement("section");
  brandElement.id = "DefaultLayouts_Brand";
  brandElement.innerHTML = `
    <div class="container_brand">
        <img src="./images/img_brand_1.webp" alt="">
        <img src="./images/img_brand_2.webp" alt="">
        <img src="./images/img_brand_3.webp" alt="">
        <img src="./images/img_brand_4.webp" alt="">
        <img src="./images/img_brand_5.webp" alt="">
        <img src="./images/img_brand_6.webp" alt="">
    </div>
  `;
  return brandElement;
};
