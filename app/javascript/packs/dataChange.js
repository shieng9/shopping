document.addEventListener("DOMContentLoaded", () => {
  //   id取得
  const t_goods = document.getElementById("t_goods");
  const t_quantity = document.getElementById("t_quantity");
  const allTotal = document.getElementById("allTotal");
  //   const changeQuantity = document.getElementsByClassName("changeQuantity");

  //   formのid取得
  const product_goods = document.getElementById("product_goods");
  const product_quantity = document.getElementById("product_quantity");
  const product_totalPrice = document.getElementById("product_totalPrice");

  //   商品の数量変更時
  document.addEventListener("input", () => {
    // console.log(t_goods.textContent);
    if (t_goods) {
      product_goods.value = t_goods.textContent;
      product_quantity.value = t_quantity.textContent;
      product_totalPrice.value = allTotal.textContent;
    }
  });
});


//   ログインしていない時の代替ボタン
const alter_login = document.getElementById("alter_login");
const alter_formSubmit = document.getElementById("alter_formSubmit");
if (alter_login) {
  alter_formSubmit.addEventListener("click", () => {
    alter_login.click();
  });
}
  