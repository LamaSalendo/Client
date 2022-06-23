import React, { useReducer, useState } from "react";

import { MdDone } from "react-icons/md";
import PayPalButton from "./PayPal-Button";
import { ShoppingCartProps } from "../../Types";

function ShoppingCart({
  visible,
  shoppingCart,
  setShoppingCart,
  ChangeAmountOfItemInShoppingCart,
  DeleteItemInShoppingCart,
}: ShoppingCartProps) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [orderNumber, setOrderNumber] = useState<number>();
  const HandleChangeOnAmountInput = (e: any, id: string) => {
    if (parseInt(e.target.value) <= 0) {
      ChangeAmountOfItemInShoppingCart(id, 1);
    } else {
      ChangeAmountOfItemInShoppingCart(id, parseInt(e.target.value));
    }

    forceUpdate();
  };
  const PriceOfAllItems = shoppingCart.reduce((price, item) => {
    return price + item.price * item.amount;
  }, 0);

  const Buy = async () => {
    if (shoppingCart.length <= 0) {
      return;
    }
    const response = await (
      await fetch("api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shoppingCart),
      })
    ).json();
    if (!response.success) {
      return;
    }
    setOrderNumber((prev) => response.orderID);
    setShoppingCart((prev) => []);
    console.log(response);
  };

  const ShoppingCartItems = shoppingCart.map((item) => {
    return (
      <div className="h-24">
        <div className="h-full flex justify-between items-center">
          <div className="h-20 aspect-square">
            <img className="h-20 aspect-square" src={item.image} />
          </div>
          <div className="w-full h-full ml-3 flex flex-col justify-evenly">
            <div className="text-xs">
              <h1>{item.name}</h1>
              <h1>
                {item.price.toFixed(2)}
                {item.currency}
              </h1>
            </div>
            <div className="flex justify-between">
              <div className="h-6 w-6">
                <input
                  className="w-full h-full text-center"
                  type="number"
                  name="amount"
                  placeholder={item.amount.toString()}
                  onChange={(e) => {
                    HandleChangeOnAmountInput(e, item.id);
                  }}
                  max="10"
                  min="1"
                />
              </div>
              <div className="text-sm">
                <h1>
                  {(item.amount * item.price).toFixed(2)}
                  {item.currency}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div
      className={`h-full w-full bg-color-four justify-center ${
        visible ? "flex" : "hidden"
      }`}
    >
      <div
        className={`w-screen bg-color-four h-screen absolute top-[-40px] ${
          orderNumber ? "flex" : "hidden"
        } z-[1000] flex flex-col items-center justify-center`}
      >
        <div className="mb-5">
          <h1>Thanks for your Order!</h1>
        </div>
        <span className="h-24 w-24 rounded-full aspect-square bg-color-five text-color-four flex justify-center items-center mb-10">
          <MdDone size={32} />
        </span>
        <div className="text-3xl text-center">
          <h1 className="text-xl">Order Id:</h1>
          <h1 className="font-semibold">{orderNumber}</h1>
        </div>
      </div>
      <div className="w-[80%]">
        <div className="text-5xl mt-4 text-center">
          <h1>Buy now!</h1>
        </div>
        <div>
          <div className="mt-20">{ShoppingCartItems}</div>
        </div>
        <div className="flex justify-center mt-10 flex-col items-center">
          <div className="border-2 border-color-two text-color-one rounded-sm">
            <button onClick={Buy} className="h-10 px-4">
              Buy Now ({PriceOfAllItems?.toFixed(2)}
              {shoppingCart[0]?.currency})
            </button>
          </div>
          <PayPalButton
            shoppingCart={shoppingCart}
            setOrderNumber={setOrderNumber}
          />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
