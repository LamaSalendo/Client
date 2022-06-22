import { Item, OrderProps, Order as OrderType } from "../../Types";
import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

function Order({ visible, items, AddToShoppingCart, categories }: OrderProps) {
  const [CurrentPage, setCurrentPage] = useState("main");
  const [Rerenderer, setRerenderer] = useState(0);
  const [currentItem, setCurrentItem] = useState<Item>();
  const [currentAmount, setCurrentAmount] = useState(1);
  const HandleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    console.log("hi");
  };
  const HandleClickOnCategory = ({ id }: any) => {
    setCurrentPage(id);
  };
  const HandleClickOnItem = (item: Item) => {
    setCurrentItem((prev) => {
      return item;
    });
    setCurrentPage(() => {
      return "BuyItem";
    });
    console.log(currentItem);
  };

  const HandleCloseOnCategory = () => {
    setCurrentPage("main");
    setCurrentItem(undefined);
    setCurrentAmount(1);
  };

  const Categories = categories.map((item) => {
    return (
      <div
        onClick={() => {
          HandleClickOnCategory(item);
        }}
        data-id={item.id}
        data-name={item.name}
        className="h-28 border-b-2 py-1"
      >
        <div className="h-full flex justify-between items-center">
          <span className="h-24 190screen:w-0">
            <img
              className="h-full aspect-square"
              src={item.image}
              alt={item.name}
            />
          </span>
          <h1 className="text-xl mr-3 font-mono">{item.name}</h1>
        </div>
      </div>
    );
  });

  const AddItemToShoppingCart = () => {
    if (!currentItem) return;
    const { price, name, image, currency, id, categoryID } = currentItem;
    const order: OrderType = {
      price,
      image,
      id,
      name,
      categoryID,
      amount: currentAmount,
      currency,
    };
    AddToShoppingCart(order);
  };

  const CategoryPagesElements = categories.map((category) => {
    const Items = items
      .filter((item) => item.categoryID === category.id)
      .map((item) => {
        return (
          <div
            onClick={() => {
              HandleClickOnItem(item);
            }}
            className="h-44"
          >
            <div className="h-32">
              <img
                className="h-32 aspect-square"
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="text-sm">
              <h1>{item.name}</h1>
              <h1>
                {item.price.toFixed(2)}
                {item.currency}
              </h1>
            </div>
          </div>
        );
      });
    return (
      <div className={CurrentPage === category.id ? "block" : "hidden"}>
        <div className="w-full">
          <span onClick={HandleCloseOnCategory}>
            <AiOutlineClose size={16} />
          </span>
          <div>{category.name}</div>
        </div>
        <div className="grid grid-cols-1 330screen:grid-cols-2 560screen:grid-cols-3 justify-items-center">
          {Items}
        </div>
        <div>{!Items ? <div>Nothing to see here...</div> : <div />}</div>
      </div>
    );
  });
  return (
    <div className={`h-full justify-center ${visible ? "flex" : "hidden"}`}>
      <div className="w-[80%] max-w-[480px] pt-4">
        <div className={CurrentPage === "main" ? "block" : "hidden"}>
          <div className="flex justify-end">
            <div className="w-26 flex items-center">
              <input
                data-searchBarActive="0"
                className="w-0 duration-500 bg-color-four mr-2 border-b-2 ease-in focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                placeholder="Search Items..."
                onKeyDown={HandleKeyDown}
              />
              <FaSearch className="focus:ring-none focus:outline-none focus:border-none" />
            </div>
          </div>
          <div className="mt-2">
            <h1>Order here: </h1>
          </div>

          <div className="border-t-2 my-5">{Categories}</div>
          <div className="h-12"></div>
        </div>
        {CategoryPagesElements}
        <div className={CurrentPage === "BuyItem" ? "block" : "hidden"}>
          <div>
            <span onClick={HandleCloseOnCategory}>
              <AiOutlineClose size={16} />
            </span>
          </div>
          <div className="flex items-center flex-col">
            <div className="w-56 560screen:w-96">
              <img
                className="h-56 560screen:h-96 aspect-square"
                src={currentItem?.image}
                alt={currentItem?.name}
              />
            </div>
            <div className="w-full">
              <div className="text-left">
                <div className="text-4xl font-bold pt-4">
                  <h1>{currentItem?.name}</h1>
                </div>
                <div className="text-xl">
                  <h1>
                    {currentItem?.price.toFixed(2)}
                    {currentItem?.currency}
                  </h1>
                </div>
              </div>
              <div className="flex justify-around my-14">
                <div className="flex justify-between w-28">
                  <p>Amount:</p>
                  <input
                    type="number"
                    className="w-10 text-center"
                    onChange={(e: any) => {
                      setCurrentAmount(() => parseInt(e.target.value));
                      console.log(currentAmount);
                    }}
                  />
                </div>
                <div>
                  <button
                    onClick={AddItemToShoppingCart}
                    className="ring-2 ring-color-two ring-offset-2 rounded-md"
                  >
                    Add to Cart (
                    {(
                      (currentItem?.price ? currentItem.price : 0) *
                      currentAmount
                    ).toFixed(2)}
                    {currentItem?.currency})
                  </button>
                </div>
              </div>
            </div>

            <div className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
