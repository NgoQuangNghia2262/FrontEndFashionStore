import sheet from "./blog.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet);
const blog_Item = ({ src, title, text, href }) => {
  const blog_Item_Element = document.createElement("div");
  blog_Item_Element.className = "DefaultLayout_Blog-Item";
  blog_Item_Element.innerHTML = `
  <a href="${href}">
      <div class="top">
        <img src="${src}" alt="">
      </div>
      <div class="bottom">
        <div class="title">
          ${title}
        </div>
        <div class="text">
          ${text}
        </div>
      </div>
    </a>
  `;
  return blog_Item_Element;
};
export const blog = async () => {
  const blogElement = document.createElement("div");
  blogElement.id = "DefaultLayout_Blog";
  blogElement.innerHTML = `
  <div class="container">
    <div class="container_header">
      <div class="title">
        <h1>TIN TỨC THỜI TRANG</h1>
      </div>
    </div>
    <div id="list_blog">
    </div>
  </div>
  `;
  try {
    const response = await fetch("http://localhost:8000/get_html_elle_vn");
    const html = await response.text();
    const parser = new DOMParser();
    const DOM_is_Website_Elle_vn = parser.parseFromString(html, "text/html");
    const content_category__inner = DOM_is_Website_Elle_vn.querySelectorAll(
      "div.content-category__inner"
    );
    if (content_category__inner) {
      content_category__inner.forEach((Item) => {
        blogElement.querySelector(".container #list_blog").appendChild(
          blog_Item({
            href: Item.querySelector(
              ".content-category__item > a.post-item__thumb"
            ).href,
            src: Item.querySelector(
              ".content-category__item img.img-responsive"
            ).dataset.lazySrc,
            text: Item.querySelector(".content-category__item > .text-category")
              .innerHTML,
            title: Item.querySelector(
              ".content-category__item > .title-category"
            ).innerHTML,
          })
        );
      });
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error.message);
  }

  return blogElement;
};
