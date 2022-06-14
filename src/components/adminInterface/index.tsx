import { ReactNode, useEffect, useState } from "react";

function AdminInterface() {
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
      <span className="text-xs">
        <h1>{order.orderID}</h1>
        <h1>{order.name}</h1>
        {order.items.map((_order: any) => {
          return <div>{_order.name}</div>;
        })}
        <button
          onClick={() => {
            const data = { id: order.orderID };
            fetch("api/order", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(data),
            });
          }}
          className="w-10 h-10 bg-color-one"
        >
          Delete
        </button>
      </span>
    );
  });

  return <div>{OrderNumbers}</div>;
}

export default AdminInterface;
