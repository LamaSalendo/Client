import React from "react";
import { CouponProps } from "../../Types";

function Coupon({ visible }: CouponProps) {
  return (
    <div
      className={`h-screen items-center justify-center ${
        visible ? "flex" : "hidden"
      }`}
    >
      <div className="text-4xl relative bottom-10">
        <h1>In Production</h1>
      </div>
    </div>
  );
}

export default Coupon;
