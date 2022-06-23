// @ts-nocheck

import React, { useEffect } from "react";

function PayPalButton({ shoppingCart, setOrderNumber }: any) {
  const lelek = () => {
    return fetch("/api/order/paypal/setItems", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shoppingCart),
    });
  };
  useEffect(() => {
    window.paypal.Button.render(
      {
        env: "sandbox", // Or 'production'
        // Set up the payment:
        // 1. Add a payment callback
        payment: async (data, actions) => {
          // 2. Make a request to your server
          let finished = false;
          await lelek();
          //while (!finished);
          return actions.request
            .post("/api/order/paypal", shoppingCart)
            .then(function (res) {
              // 3. Return res.id from the response
              return res.id;
            });
        },
        // Execute the payment:
        // 1. Add an onAuthorize callback
        onAuthorize: function (data, actions) {
          // 2. Make a request to your server
          return actions.request
            .post("/api/order/paypal/execute", {
              paymentID: data.paymentID,
              payerID: data.payerID,
            })
            .then(function (res) {
              // 3. Show the buyer a confirmation message.
              setOrderNumber((prev) => res.orderID);
            });
        },
      },
      "#paypal-button"
    );
  }, []);

  return <div id="paypal-button"></div>;
}

export default PayPalButton;
