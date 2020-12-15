import React, { useState, useRef, useEffect } from "react";

const PayPalButton = () => {
  const [paidFor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const paypalRef = useRef();

  const price = 55;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AVJPVf_9awkJPe9II__hCg1X1I681VJ7UVHostv5_BES0xZiN85W3x7j-hAlFmDS0w_atRfIlDU4scgH";
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Beers",
                  amount: {
                    currency_code: "USD",
                    value: price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();

            setPaidFor(true);

            console.log(order);
          },
        })
        .render(".paypal");
    }
  }, []);

  return (
    <div>
      <div style={{ height: "80px", width: "100px" }} className={"paypal"}>
        PayPal
      </div>
    </div>
  );
};

export default PayPalButton;
