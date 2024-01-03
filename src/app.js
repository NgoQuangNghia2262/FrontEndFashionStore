import { header } from "./DefaultLayouts/Header/header.js";
import { headermenu } from "./DefaultLayouts/Header/headermenu.js";
import { sidebar } from "./DefaultLayouts/Sidebar/sidebar.js";
import { footer } from "./DefaultLayouts/Footer/footer.js";
import { home } from "./Pages/Home/home.js";
import { product } from "./Pages/Product/product.js";
import { NotFound } from "./Pages/NotFound/notfound.js";
import { login } from "./Pages/LogIn/login.js";
import { register } from "./Pages/Register/register.js";
import { cart } from "./Pages/Cart/cart.js";
import { payment } from "./Pages/Payment/payment.js";
import { category } from "./Pages/Category/category.js";
import { profile } from "./Pages/Profile/profile.js";
import { dashboard } from "./Pages/Dashboard/dashboard.js";
import { listproduct } from "./Pages/Dashboard/ListProduct/listproduct.js";
import { posv1 } from "./Pages/PosV1/posv1.js";
import { blog } from "./DefaultLayouts/Blog/blog.js";
import { brand } from "./DefaultLayouts/Brand/brand.js";

const routers = [
  { path: "/", view: home, SPA: 1, title: "Trang chủ" },
  { path: "/product", view: product, SPA: 1, title: "Sản phẩm" },
  { path: "/register", view: register, SPA: 1, title: "Đăng ký" },
  { path: "/login", view: login, SPA: 1, title: "Đăng nhập" },
  { path: "/cart", view: cart, SPA: 1, title: "Giỏ hàng" },
  { path: "/profile", view: profile, SPA: 1, title: "Profile" },
  { path: "/product/category", view: category, SPA: 0, title: "Trang chủ" },
  { path: "/payment", view: payment, SPA: 1, title: "Trang chủ" },
  { path: "/dashboard", view: dashboard, SPA: 0, title: "dashboard" },
  {
    path: "/dashboard/listproduct",
    view: listproduct,
    SPA: 0,
    title: "Danh sách sản phẩm",
  },
  { path: "/pos_v1", view: posv1, SPA: 0, title: "Trang chủ" },
];
const router = () => {
  const router = routers.find((router) => {
    return router.path === location.pathname;
  });
  if (!router) {
    return NotFound();
  }
  document.title = router.title;
  return router;
};

document.addEventListener("DOMContentLoaded", async () => {});
async function main() {
  const page = document.createElement("div");
  page.id = "page";
  const root = document.querySelector("#root");
  if (location.pathname.startsWith("/dashboard")) {
    root.appendChild(sidebar());
    page.style.marginLeft = "230px";
    page.style.padding = "85px 35px";
    page.style.backgroundColor = "#f0f1f1";
    root.appendChild(page);
  } else if (location.pathname.startsWith("/pos")) {
    root.appendChild(page);
  } else {
    root.appendChild(await header());
    root.appendChild(headermenu());
    root.appendChild(page);
    root.appendChild(await blog());
    root.appendChild(brand());
    root.appendChild(footer());
  }
  const routerNow = router();
  const html = await routerNow.view();
  document.querySelector("#page").appendChild(html);
  document.body.addEventListener("click", async (e) => {
    let href = e.target.href;
    if (!href) {
      return;
    }
    const hrefsplit = href.split("http://localhost:8000/");
    const routerNext = routers.find((router) => {
      return router.path === "/" + hrefsplit[hrefsplit.length - 1];
    });
    if (routerNext.SPA === routerNow.SPA) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      const html = await routerNext.view();
      document.querySelector("#page").innerHTML = "";
      document.querySelector("#page").appendChild(html);
      document.title = routerNext.title;
    }
  });
}
main();
