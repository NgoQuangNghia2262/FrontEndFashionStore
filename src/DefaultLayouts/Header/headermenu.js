import sheet from "./headermenu.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
export const headermenu = () => {
  const headermenuElement = document.createElement("div");
  headermenuElement.id = "DefaultLayout_HeaderMenu";
  headermenuElement.innerHTML = `
        <div class="headerMenu_container_Menu">
          <ul>
            <li class="headerMenu_container_Menu--item activate">
              <a class="" href="/">Trang Chủ</a>
            </li>
            <li class="headerMenu_container_Menu--item">
              <a href="#">Thời trang nam</a>
            </li>
            <li class="headerMenu_container_Menu--item">
              <a href="#">Sản phẩm</a>
            </li>
            <li class="headerMenu_container_Menu--item">
              <a href="#">Bé trai</a>
            </li>
            <li class="headerMenu_container_Menu--item">
              <a href="#">Bé gái</a>
            </li>
            <li class="headerMenu_container_Menu--item">
              <a href="#">Tin tức</a>
            </li>
            <li class="headerMenu_container_Menu--item">
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div class="headerMenu_container_Hotline">
          <label for="">Hotline :</label>
          <a href="tel:19006750">1900 6750</a>
        </div>
  `;
  return headermenuElement;
};
