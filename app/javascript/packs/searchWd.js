const goods_list_area = document.getElementsByClassName("goods_list_area");
const goods_search = document.getElementById("goods_search");

goods_search.addEventListener("input", () => {
  reset();
  const sword = goods_search.value;
  if (sword === "") {
    return;
  }
  [...goods_list_area].forEach((part) => {
    if (part.textContent.indexOf(sword) === -1) {
      part.classList.add("hide");
    }
  });
});

function reset() {
  [...document.getElementsByClassName("hide")].forEach((el) => {
    el.classList.remove("hide");
  });
}
    