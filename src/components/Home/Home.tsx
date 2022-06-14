import React from "react";
import { HomeProps } from "../../Types";
import { BsPlusCircleDotted } from "react-icons/bs";

function Home({ visible, coupons }: HomeProps) {
  const Coupons = coupons.slice(0, 3).map((coupon) => {
    return (
      <div className="h-28 w-16">
        <div className="h-full w-16">
          <img
            className="h-16 aspect-square border-2 border-color-five rounded-md"
            src={coupon.image}
            alt={coupon.name}
          />
          <div className="text-xs h-12 text-center text-color-two">
            <h1>{coupon.name}</h1>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className={`h-full justify-center ${visible ? "flex" : "hidden"}`}>
      <div className="w-[80%] max-w-[480px]">
        <div className="font-dancingscripts font-extrabold text-4xl py-6 text-center">
          <h1>The New Cafeteria App</h1>
        </div>
        <div>
          <div>
            <div className="text-lg font-semibold text-color-two mb-2">
              <h1>Coupons:</h1>
            </div>
            <div className="flex justify-between">
              {Coupons}
              <div className="h-16">
                <div className="h-full">
                  <div className="h-full aspect-square border-2 border-color-five bg-color-five rounded-md flex justify-center items-center">
                    <span className="text-color-four">
                      <BsPlusCircleDotted size={32} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
