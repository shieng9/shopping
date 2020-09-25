import React, { Fragment, StrictMode, Suspense } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

function List(props) {
  return (
    <div className="goods_list">
      <div className="goods_detail">
        <p>商品: {props.goods}</p>
        <p>値段: {props.prices}円</p>
        <p>
          <span>数量: </span>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="数量"
            step="1"
            maxLength="3"
            value={props.quantity}
            onChange={props.onChange}
            required
            className="changeQuantity"
          />
        </p>
        <p>合計金額: {props.total}円</p>
      </div>
      <div className="goods_pictures_area">
        画像: <br />
        <img className="goods_pictures" src={props.pictures} alt="ロード失敗" />
      </div>
    </div>
  );
}

class Board extends React.Component {
  renderList(i) {
    return (
      <List
        goods={this.props.goods[i]}
        prices={this.props.prices[i]}
        quantity={this.props.quantity[i]}
        onChange={(e) => this.props.onChange(e, i)}
        total={this.props.total[i]}
        pictures={this.props.pictures[i]}
      />
    );
  }

  renderLists() {
    const lists = [];
    for (let i = 0; i < this.props.goods.length; i++) {
      lists[i] = { id: i, func: this.renderList(i) };
    }
    const renderAll = lists.map((list) => (
      <div className="goods_list_area" key={list.id}>
        <hr />
        {list.func}
      </div>
    ));
    return <div>{renderAll}</div>;
  }

  render() {
    return <div id="goods_lists">{this.renderLists()}</div>;
  }
}

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      goods: ["りんご", "みかん", "ぶどう", "スイカ"],
      prices: [10, 20, 100, 1000],
      quantity: [0, 0, 0, 0],
      total: [0, 0, 0, 0],
      pictures: [
        "/assets/fruits/りんご.jpg",
        "/assets/fruits/みかん.jpg",
        "/assets/fruits/ぶどう.jpg",
        "/assets/fruits/スイカ.jpg",
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, i) {
    // 整数かつ0以上100以下かつ3桁のみ可
    if (
      Number.isInteger(e.target.value - 0) &&
      0 <= e.target.value &&
      e.target.value < 101 &&
      e.target.value.length < 4
    ) {
      let quantity = this.state.quantity.slice();
      quantity[i] = e.target.value;
      let total = this.state.total.slice();
      total[i] = this.state.prices[i] * quantity[i];

      this.setState({
        quantity: quantity,
        total: total,
      });
    }
  }

  renderTotal() {
    let t_goods = [];
    let t_quantity = [];
    for (let i = 0; i < this.state.goods.length; i++) {
      if (this.state.quantity[i] > 0) {
        t_goods[i] = this.state.goods[i];
        t_quantity[i] = this.state.quantity[i];
      } else {
        t_goods[i] = "";
        t_quantity[i] = "";
      }
    }

    const totalItems = t_goods.map((g, i) => {
      if (t_goods[i] !== "") {
        return (
          <li key={g.toString()}>
            <span id={g}>{g + " "}</span>
            <span id={g + "の数"}>{t_quantity[i] + "個"}</span>
          </li>
        );
      }
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let allTotal = this.state.total.reduce(reducer);

    return (
      <div id="renderTotal">
        <h3>〜選択中の商品〜</h3>
        <ul>{totalItems}</ul>
        <p>支払い合計金額： {allTotal}円</p>
        <div id="willFormData">
          <p id="t_goods">{t_goods.join("/")}</p>
          <p id="t_quantity">{t_quantity.join("/")}</p>
          <p id="allTotal">{allTotal + "円"}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <StrictMode>
          <Suspense fallback={<div>Loading...</div>}>
            <Board
              goods={this.state.goods}
              prices={this.state.prices}
              quantity={this.state.quantity}
              onChange={this.handleChange}
              total={this.state.total}
              pictures={this.state.pictures}
            />
            <hr />
            <div id="totalBox">{this.renderTotal()}</div>
          </Suspense>
        </StrictMode>
      </Fragment>
    );
  }
}

Menu.propTypes = {
  goods: PropTypes.string,
  prices: PropTypes.number,
  quantity: PropTypes.number,
  total: PropTypes.number,
  pictures: PropTypes.string,
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Menu />,
    document.getElementById("root")
  );
});
