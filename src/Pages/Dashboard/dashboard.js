import { Bill } from "../../fetchData/bill.js";
import { User } from "../../fetchData/user.js";
import { header } from "./HeaderDashboard/header.js";

import sheet from "./dashboard.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const dashboard = async () => {
  let today = new Date();
  const todayString = today.toLocaleString("en-EU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  let refultt = await Promise.all([
    User.getLoggedInUser(),
    Bill.findBillDaybetwenDay({
      firstDay: todayString,
      seccondDay: todayString,
    }),
    Bill.getRevenueForDaybetwenDay({
      firstDay: todayString,
      seccondDay: todayString,
    }),
  ]);
  let loggedInUser = refultt[0];
  let billInDay = refultt[1];
  let revenue = refultt[2];
  let countBill_Cancelled = 0;
  let countBill_Return = 0;
  billInDay.forEach((bill) => {
    if (bill.status === "return") {
      countBill_Return++;
    } else if (bill.status === "canceled") {
      countBill_Cancelled++;
    }
  });
  if (!loggedInUser) {
    location.href = "/login";
    alert("Vui lòng đăng nhập ...");
  }
  if (loggedInUser.permissions !== "admin") {
    location.href = "/";
    alert("Bạn không thể truy cập trang này ...");
  }
  const dashboardElement = document.createElement("div");
  dashboardElement.id = "PageDashboard";
  dashboardElement.innerHTML = `
    <div class="container">
      <div class="left">
        <div class="billinday">
          <div class="top">
            <div class="title">
              <span>Kết quả kinh doanh trong ngày</span>
            </div>
          </div>
          <div class="bot">
            <div class="bot-item">
              <div class="icon" style="background: linear-gradient(65.71deg, #0088FF 28.29%, #33A0FF 97.55%);">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" font-size="24"><path d="M9.04 5.717h6.49l1.4-1.144a1.446 1.446 0 0 0 .453-1.607A1.4 1.4 0 0 0 16.05 2H8.52a1.4 1.4 0 0 0-1.333.968 1.445 1.445 0 0 0 .453 1.606l1.4 1.143ZM15.642 7.133H8.93C6.719 9.348 5 13.233 5 16.425 5 19.2 6.439 22 9.655 22h5.465c2.747 0 4.453-2.137 4.453-5.575 0-3.193-1.72-7.077-3.931-9.292Zm-3.663 6.814h.615c.946 0 1.716.785 1.716 1.75 0 .87-.613 1.583-1.417 1.729v.65c0 .343-.271.62-.607.62a.613.613 0 0 1-.607-.62v-.62h-.81a.613.613 0 0 1-.607-.619c0-.342.272-.619.607-.619h1.725c.277 0 .501-.23.501-.512a.51.51 0 0 0-.501-.52h-.616c-.946 0-1.716-.785-1.716-1.751 0-.869.613-1.582 1.417-1.728v-.65c0-.343.272-.62.607-.62.336 0 .607.277.607.62v.619h.81c.336 0 .607.277.607.62 0 .341-.271.619-.607.619H11.98a.508.508 0 0 0-.502.512c0 .29.225.52.502.52Z" fill="currentColor"></path></svg>
              </div>
              <div class="content">
                <h6>Doanh thu</h6>
                <h5 style="color: #0088FF;">${revenue ? revenue : 0}</h5>
              </div>
            </div>
            <div class="bot-item">
              <div class="icon" style="background: linear-gradient(62.06deg, #0FD186 25.88%, #3FDA9E 100%);">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" font-size="24"><path d="m11.574 2.018-4.515.02c-.585 0-1.133.33-1.411.852l-2.36 4.36 7.831-.02.455-5.212ZM21.29 7.212l-2.386-4.36A1.627 1.627 0 0 0 17.483 2l-4.514.019.473 5.212 7.849-.019ZM21.584 10.21l.005-1.537h-.011v-.047l-8.593.029h-1.381L3.01 8.626v.047H3l.005 1.536L3 11.666c.003-.002.007-.002.01-.003l.027 7.841c0 .825.66 1.497 1.459 1.497h.01l7.788-.021 7.788.021h.01c.799 0 1.459-.672 1.459-1.497l.027-7.841a.048.048 0 0 0 .01.003l-.004-1.456Z" fill="currentColor"></path></svg>
              </div>
              <div class="content">
                <h6>Đơn hàng mới</h6>
                <h5 style="color: #0FD186;">${billInDay.length}</h5>
              </div>
            </div>
            <div class="bot-item">
              <div class="icon" style="background: linear-gradient(66.01deg, #FFAE06 37.34%, #FFBE38 101.09%);">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" font-size="24"><path d="m8.918 2.018-4.168.017c-.54 0-1.046.3-1.303.771L1.269 6.751l7.229-.017.42-4.716ZM17.886 6.717l-2.203-3.945A1.507 1.507 0 0 0 14.37 2l-4.168.017.438 4.717 7.245-.017ZM8.926 15.622c.002-.502.21-.99.568-1.34l3.958-3.82c.35-.339.814-.526 1.303-.526a1.874 1.874 0 0 1 1.874 1.88l-.001.61a8.06 8.06 0 0 1 1.516.476l.008-2.16.01.004-.005-1.318.005-1.39h-.01v-.043l-7.933.026H8.943L1.01 7.996v.042H1l.005 1.39L1 10.747a.046.046 0 0 1 .01-.003l.025 7.096c0 .746.609 1.355 1.346 1.355h.009l7.19-.02 2.178.006-2.267-2.212a1.89 1.89 0 0 1-.565-1.347Z" fill="currentColor"></path><path d="m15.41 13.826.006-2.182a.387.387 0 0 0-.655-.279l-4.388 4.223a.385.385 0 0 0-.001.552l4.364 4.247a.39.39 0 0 0 .42.08c.143-.06.236-.2.236-.354l.007-2.182.73.002a6.571 6.571 0 0 1 5.733 3.389l.011.02a.386.386 0 0 0 .725-.183c.01-3.99-3.202-7.254-7.188-7.333Z" fill="currentColor"></path></svg>
              </div>
              <div class="content">
                <h6>Đơn hàng trả</h6>
                <h5 style="color: #FFAE06;">${countBill_Return}</h5>
              </div>
            </div>
            <div class="bot-item">
              <div class="icon" style="background: linear-gradient(64.1deg, #FF4D4D 22.64%, #FF5F7C 102.8%);">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" font-size="24"><path d="M9.307 1h-4.32c-.54 0-1.08.332-1.412.748L1.332 5.985h7.56L9.307 1ZM18.696 5.985 16.41 1.872c-.29-.54-.83-.872-1.37-.872h-4.32l.415 4.985h7.56ZM19.028 9.432a8.44 8.44 0 0 0-2.285-.332c-4.195 0-7.685 3.448-7.685 7.685 0 .747.125 1.495.333 2.284H2.412C1.665 19.028 1 18.404 1 17.615V7.355h18.028v2.077Z" fill="currentColor"></path><path d="M20.854 12.548c-2.284-2.285-5.94-2.285-8.307 0-2.285 2.284-2.285 5.94 0 8.307 2.284 2.368 5.94 2.285 8.307 0 2.285-2.367 2.285-6.064 0-8.307Zm-2.783 6.355-1.287-1.288-1.288 1.288c-.208.208-.665.208-.955 0-.208-.208-.208-.665 0-.955l1.287-1.288-1.287-1.288c-.25-.249-.25-.664-.042-.997.208-.207.665-.207.955 0l1.288 1.288 1.288-1.288c.207-.207.664-.207.955 0 .208.208.208.665 0 .956l-1.287 1.287 1.287 1.288c.208.208.208.665 0 .956-.29.249-.706.249-.914.041Z" fill="currentColor"></path></svg></div>
              <div class="content">
                <h6>Đơn hàng hủy</h6>
                <h5 style="color: #FF4D4D;">${countBill_Cancelled}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="sales">
            <div class="title">
              <span>Doanh thu bán hàng</span>
            </div>
          </div>
      </div>
      <div class="right">
        <div class="ads">
          <img src="./images/99a844232cb72df77837.jpg" alt="">
          <img src="./images/3f951f5ebb36f1481974.png" alt="">
        </div>
        <div class="recent_activities">
          <div class="title">
            <span>Hoạt động gần đây</span>
          </div>  
        </div>
      </div>
    </div>
    `;
  dashboardElement.appendChild(
    header({
      user: loggedInUser,
      title: "Tổng quan",
    })
  );
  return dashboardElement;
};
