import sheet from "./footer.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
export const footer = () => {
  const footerElement = document.createElement("footer");
  footerElement.id = "DefaultLayout_Footer";
  footerElement.innerHTML = `
  <div class="container_footer">
  <div class="column column1">
    <ul>
      <img src="./images/logo.webp" alt="" width="150px" height="43">
      <li><p class="text">Shop Thời trang Và Phụ Kiện Alena</p></li>
      <li>
       <div style="display: flex;">
        <i class="fa-solid fa-location-dot"></i>
        <p>Tầng 6, Tòa nhà Ladeco, 266 Đội Cấn, Phường Liễu Giai, Quận Ba Đình, TP Hà Nội</p>
       </div>
      </li>
      <li>
        <div style="display: flex;">
          <i style="margin-left: 0;" class="time-port-item fa-solid fa-clock"></i>
          <p>Giờ làm việc: Từ 9:00 đến 22:00 các ngày trong tuần từ Thứ 2 đến Chủ nhật</p>
         </div>
      </li>
      <li>
        <div style="display: flex;">
          <i class="fa-solid fa-phone"></i>
          <div style="display: flex; flex-direction: column;">
            <p>Hotline</p>
          <a href="">1900 6750</a>
          </div>
         </div>
      </li>
      <li></li>
    </ul>
  </div>
  <div class="column2 column">
    <ul>
      <h3>Về chúng tôi</h3>
       <li>Trang chủ</li>
       <li>Thời trang nam</li>
       <li>Sản phẩm</li>
       <li>Bé trai</li>
       <li>Bé gái</li>
       <li>Tin tức</li>
       <li>Liên hệ</li>
    </ul>
  </div>
  <div class="column3 column">
    <ul>
      <h3>Hỗ trợ khách hàng</h3>
       <li>Trang chủ</li>
       <li>Thời trang nam</li>
       <li>Sản phẩm</li>
       <li>Bé trai</li>
       <li>Bé gái</li>
       <li>Tin tức</li>
       <li>Liên hệ</li>
    </ul>
  </div>
  <div class="column4 column">
    <ul>
      <h3>Dịch vụ</h3>
       <li>Trang chủ</li>
       <li>Thời trang nam</li>
       <li>Sản phẩm</li>
       <li>Bé trai</li>
       <li>Bé gái</li>
       <li>Tin tức</li>
       <li>Liên hệ</li>
       <li>
        <i class="fa-brands fa-youtube"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook-f"></i>
       </li>
    </ul>
  </div>
</div>
    `;
  return footerElement;
};
