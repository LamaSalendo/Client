import { ReactNode, useEffect, useState } from "react";

function OrderScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch("api/order").then(async (response) => {
        const res = await response.json();
        setOrders(() => res);
      });
    }, 5000);
  }, []);

  const OrderNumbers = orders.map((order: any) => {
    return (
      <span className="text-5xl">
        <h1>{order.orderID}</h1>
      </span>
    );
  });

  return (
    <div
      className={`bg-[#000] h-full w-full text-[#ffff] grid-cols-4 grid grid-cols-${
        orders.length > 20 ? (orders.length > 28 ? 4 : 3) : 2
      }`}
    >
      {OrderNumbers}
      <div className="grid-cols-1 grid-cols-2 grid-cols-4 grid-cols-3"></div>
    </div>
  );
}

export default OrderScreen;
