import sheet from "./header.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);

export const header = ({ user, title }) => {
  const headerElement = document.createElement("div");
  headerElement.id = "HeaderDashboard";
  headerElement.className = "head";
  headerElement.innerHTML = `
      <h3 class="title">${title}</h3>
      <div class="user">
      <div class="userItem">
      <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" font-size="24" class="jss217" color="#A2A8AF"><path d="M19.08 4.93A9.972 9.972 0 0 0 12 2a9.928 9.928 0 0 0-7.07 2.93A9.947 9.947 0 0 0 2 12a9.947 9.947 0 0 0 2.93 7.07A9.947 9.947 0 0 0 12 22a9.947 9.947 0 0 0 7.07-2.93A9.947 9.947 0 0 0 22 12a9.937 9.937 0 0 0-2.92-7.07ZM12 11.38a2.817 2.817 0 0 1 2.81 2.81c0 1.285-.86 2.374-2.048 2.701a.187.187 0 0 0-.141.185v.523c0 .338-.261.621-.6.643a.622.622 0 0 1-.653-.621v-.545a.187.187 0 0 0-.141-.185 2.83 2.83 0 0 1-2.048-2.69c0-.338.261-.632.61-.643a.626.626 0 0 1 .642.62 1.56 1.56 0 0 0 1.678 1.558 1.567 1.567 0 0 0 1.449-1.448A1.567 1.567 0 0 0 12 12.61c-1.547.022-2.81-1.242-2.81-2.8 0-1.274.871-2.363 2.048-2.701a.2.2 0 0 0 .141-.185V6.39c0-.338.261-.62.6-.643a.622.622 0 0 1 .653.621v.545c0 .087.054.163.141.185a2.83 2.83 0 0 1 2.048 2.69.637.637 0 0 1-.61.643.626.626 0 0 1-.642-.62 1.56 1.56 0 0 0-1.678-1.558 1.576 1.576 0 0 0-1.449 1.449A1.567 1.567 0 0 0 12 11.379Z" fill="#A2A8AF"></path></svg>
        <span>Vay vốn kinh doanh</span>
        </div>
        <div class="userItem">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" font-size="24" class="jss217" color="#A2A8AF"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17v-2h2v2h-2Zm3.17-6.83.9-.92c.57-.57.93-1.37.93-2.25 0-2.21-1.79-4-4-4S8 6.79 8 9h2c0-1.1.9-2 2-2s2 .9 2 2c0 .55-.22 1.05-.59 1.41l-1.24 1.26C11.45 12.4 11 13.4 11 14.5v.5h2c0-1.5.45-2.1 1.17-2.83Z" fill="#A2A8AF"></path></svg>
        <span>Trợ giúp</span>
        </div>
        <div class="userItem">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" font-size="24" class="jss217" color="#A2A8AF"><path d="M12 21C8.387 17.773 2 13.76 2 8.395 2 5.374 4.42 3 7.5 3c1.74 0 3.41.744 4.5 2 1.09-1.256 2.76-2 4.5-2C19.58 3 22 5.374 22 8.395c0 5.356-6.379 9.396-10 12.605Z" fill="#A2A8AF"></path></svg>
        <span>Gợi ý</span>
        </div>
        <div class="userItem" >
          <img src="http://localhost:8080/v1/data/image/anh-dai-dien-FB-200.jpg" alt="">
          <span style="
          color: #0F1824;
          font-weight: 600;">${user.username}</span>
          <svg class="MuiSvgIcon-root arrow-avatar" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>
        </div>
        <div class="userItem">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" font-size="24" style="color: rgb(0, 136, 255);"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 10.5c0-3.07-1.14-5.64-4-6.32V2h-4v2.18c-2.87.68-4 3.24-4 6.32V16l-2 1v2h16v-2l-2-1v-5.5Zm-5.6 11.46A2.014 2.014 0 0 1 9.99 20h4c0 .28-.05.54-.15.78-.26.6-.79 1.04-1.44 1.18Z" fill="currentColor"></path></svg>
        </div>
      </div>
      `;
  return headerElement;
};
