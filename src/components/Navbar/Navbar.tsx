import React, { BaseSyntheticEvent } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { NavbarProps } from "../../Types";
import { BsBagFill } from "react-icons/bs";
function Navbar({ currentPage, setCurrentPage, shoppingcart }: NavbarProps) {
  const handleClick = (e: any) => {
    const a = e.nativeEvent.path;
    let ElementName;
    for (let item of a) {
      if (item.dataset?.name) {
        ElementName = item.dataset.name;
        break;
      }
    }
    setCurrentPage(ElementName);
  };
  return (
    <div className="bg-color-three h-full flex items-center justify-evenly">
      <div
        data-name="home"
        className={`flex flex-col items-center ${
          currentPage === "home" ? "text-color-five" : "text-color-four"
        }`}
        onClick={handleClick}
      >
        <AiFillHome />
        <p className="text-xs">Home</p>
      </div>
      <div
        data-name="order"
        className={`flex flex-col items-center ${
          currentPage === "order" ? "text-color-five" : "text-color-four"
        }`}
        onClick={handleClick}
      >
        <BsBagFill />
        <p className="text-xs">Order</p>
      </div>
      <div
        data-name="coupons"
        className={`flex flex-col items-center ${
          currentPage === "coupons" ? "text-color-five" : "text-color-four"
        }`}
        onClick={handleClick}
      >
        <RiCoupon2Fill />
        <p className="text-xs">Coupons</p>
      </div>
      <div
        data-name="profile"
        className={`flex flex-col items-center ${
          currentPage === "profile" ? "text-color-five" : "text-color-four"
        }`}
        onClick={handleClick}
      >
        <FaUser />
        <p className="text-xs">Profile</p>
      </div>
      <div
        data-name="shoppingcart"
        className={` flex-col items-center ${
          currentPage === "shoppingcart" ? "text-color-five" : "text-color-four"
        } ${shoppingcart.length ? "flex" : "hidden"}`}
        onClick={handleClick}
      >
        <FaShoppingCart />
        <p className="text-xs">Cart</p>
      </div>
    </div>
  );
}

export default Navbar;
