import React, { Component, useEffect, useState } from "react";
import config from "../../config.json";
import { Link, useHistory } from "react-router-dom";
const dev = document.domain === "localhost";

const Payment = (props) => {
  const history = useHistory();
  const [paymentResponse, setPaymentResponse] = useState([]);
  useEffect(() => {
    displayRazorPay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function displayRazorPay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Failed, please check your network");
      return;
    }
    // call api for order api,  orderid, amount

    let _data = {
      //key_id: config.key_id,
      //key_secret: config.key_secret,
      amount: props.amount * 100, // get from order total
      currency: "INR",
      orderid: props.orderid, // get from orderid
      payment_capture: 1,
    };
    fetch(config.service_url + "payment", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data: _data }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("payment", data);
        if (data.status === 200) {
          // call payemnt
          //setPaymentResponse(data.data);
          console.log("orderid", data.data.id);
          const options = {
            amount: props.amount * 100,
            currency: "INR",
            name: config.title,
            description: config.description,
            image: config.faviconimage,
            order_id: data.data.id,
            handler: function (response) {
              console.log("razorpay response", response);
              UpdateOrderPayemntStatus(props.orderid, "Received", "Completed");
              //call order api to update the order sucess

              history.push("/success");
            },
            prefill: {
              name: props.name,
              email: props.email,
              contact: props.contactno,
            },
            notes: {
              address: config.contact_address,
            },
            theme: {
              color: config.themecolor,
            },
          };
          const paymentobj = new window.Razorpay(options);
          paymentobj.open();
          paymentobj.on("payment.failed", function (response) {
            // log failure message
            UpdateOrderPayemntStatus(props.orderid, "Failed", "Pending");
            console.log("payement failed");
            // update payment failed in order page
          });
        } else if (data?.status === 400) {
          console.log("orderid", "400");
          history.push("/shop-checkout");
        } else {
          console.log("orderid", "else");
          history.push("/shop-checkout");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.error = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const UpdateOrderPayemntStatus = async (orderid, paymentstatus, orderstatus) => {
    let _data = {
      orderid: orderid,
      paymentstatus: paymentstatus,
      paymentmethod: "Online",
      orderstatus: orderstatus,
    };

    await fetch(config.service_url + "updateorderbyuser", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ data: _data }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("payment status updated");
        } else if (data?.status === 499) {
          console.log("payment status not updated");
        } else {
          console.log("payment status not updated");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <button className="btn button-lg btnhover btn-block w-auto" type="button" onClick={displayRazorPay}>
        Payment is {paymentResponse?.data?.status ? paymentResponse?.data?.status : "pending. Please Wait.."}
      </button>
    </div>
  );
};

export default Payment;
