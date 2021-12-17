import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import Payment from "./../Element/Payment";
import loadingimg from "./../../images/load.gif";
import { Form } from "react-bootstrap";
import config from "../../config.json";
import bnr from "./../../images/banner/bnr1.jpg";
import uuid from "react-uuid";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Shopchekout = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [networkError, setNetworkError] = useState("");
  const [loading, setLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState("");

  const history = useHistory();
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  // const onSubmit = data => console.log(data);
  const [userAddress, setUserAddress] = useState([]);

  // setCartDetails(props.location.cartdetails);
  // setSubTotal(cartDetails.map(total => { return total.p_price * total.p_quantity }).reduce((a, b) => a + b, 0));
  const fetchCartDetails = () => {
    setLoading((load) => !load);
    fetch(config.service_url + "getCartProducts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 500) {
          setSubTotal(0);
          setLoading((loading) => !loading);
          // return;
        }
        setCartDetails(data);

        // console.log("query_cartDetails", data1);
        setSubTotal(
          data
            .map((total) => {
              return total.p_price * total.p_quantity || 0;
            })
            .reduce((a, b) => a + b, 0)
        );
        setLoading((loading) => !loading);
        console.log("cart details", data);
      })
      .catch(function (error) {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };

  const getUserProfile = async () => {
    await fetch(config.service_url + "getuserprofile", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ userid: localStorage.getItem("uuid") }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setUserAddress(data.data);
        } else if (data.status === 499) {
          history.push("/shop-login");
        } else {
          setMessage(data.message);
          handleVisible();
        }
      })
      .catch((err) => {
        setMessage("Something went wrong, Please try again later!!");
        handleVisible();
      });
  };

  useEffect(() => {
    fetchCartDetails();
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    delete userAddress[0].createddate;
    delete userAddress[0].userid;
    delete userAddress[0].password;
    delete userAddress[0].isactive;
    delete userAddress[0].updateddate;
    delete userAddress[0].token;
    let _data = {
      products: cartDetails,
      orderid: uuid(),
      orderstatus: "Ordered",
      paymentstatus: "NotReceived",
      paymentmethod: "",
      deliverystatus: "InProgress",
      deliverydate: "",
      orderdate: new Date(),
      tax: (subTotal * config.taxpercentage) / 100,
      shipping: subTotal < config.freeshippingcost ? config.shippingcost : 0,
      grosstotal: subTotal + (subTotal * config.taxpercentage) / 100 + (subTotal < config.freeshippingcost ? config.shippingcost : 0),
      userid: localStorage.getItem("uuid"),
      usernotes: notes,
      billingaddress: userAddress[0],
      shippingaddress: {
        address: data.address === "" ? userAddress[0].address : data.address,
        name: data.name === "" ? userAddress[0].name : data.name,
        email: userAddress[0].email, // need to change , need to add filed in UI
        city: data.city === "" ? userAddress[0].city : data.city,
        state: data.state === "" ? userAddress[0].state : data.state,
        pincode: data.pincode === "" ? userAddress[0].pincode : data.pincode,
        phonenumber: userAddress[0].phonenumber,
      },
    };
    console.log("input", data);
    console.log(_data);

    //send amount, order id
    if (cartDetails.length > 0) {
      fetch(config.service_url + "placeOrder", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data: _data }) })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            //handleVisible();
            //setMessage(data.message);
            setCartDetails([]);
            console.log("order completed", data);
            // call payemnt
            history.push({
              pathname: "/payment",
              state: { amount: data.data.grosstotal, orderid: data.data.orderid, orderstatus: data.data.orderstatus, paymentstatus: data.data.paymentstatus, contactno: data.data.billingaddress.phonenumber, name: data.data.billingaddress.name, email: data.data.billingaddress.email },
            });
            setStatus(true);
            //history.push("/success");
          } else if (data?.status === 499) {
            history.push("/shop-login");
          } else {
            setMessage(data.message);
            setStatus(true);
          }
        })
        .catch((err) => {
          setNetworkError("Something went wrong, Please try again later!!");
          console.log(networkError);
        });
    }
  };

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{message}</Modal.Header>
      </Modal>
      <Header active={"shop"} />

      <div className="page-content bg-white">
        <div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(" + bnr + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Checkout</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>Home</Link>
                  </li>
                  <li>Checkout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="section-full content-inner">
          <div className="container">
            <form className="shop-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-6 col-md-12 m-b30">
                  <h3>Billing & Shipping Address</h3>
                  {/* <div className="form-group">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Control as="select">
                        <option value="">Åland Islands</option>
                        <option value="">Afghanistan</option>
                        <option value="">Albania</option>
                        <option value="">Algeria</option>
                        <option value="">Andorra</option>
                        <option value="">Angola</option>
                        <option value="">Anguilla</option>
                        <option value="">Antarctica</option>
                        <option value="">Antigua and Barbuda</option>
                        <option value="">Argentina</option>
                        <option value="">Armenia</option>
                        <option value="">Aruba</option>
                        <option value="">Australia</option>
                      </Form.Control>
                    </Form.Group>
                  </div> */}
                  <div className="row">
                    <div className="form-group col-md-6">
                      Name
                      <input type="text" className="form-control" placeholder="First Name + Lastname Name" defaultValue={userAddress[0]?.name} {...register("name")} />
                    </div>
                  </div>
                  <div className="form-group">
                    Address
                    <input type="text" name="address" placeholder="Full Address" defaultValue={userAddress[0]?.address} className="form-control" {...register("address")} required />
                  </div>
                  <div className="form-group">
                    City
                    <input type="text" name="city" placeholder="Village/Town/City" defaultValue={userAddress[0]?.city} className="form-control" {...register("city")} required />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      State
                      <input type="text" className="form-control" placeholder="State" defaultValue={userAddress[0]?.state} name="state" {...register("state")} required />
                    </div>
                    <div className="form-group col-md-6">
                      Pincode
                      <input type="text" className="form-control" placeholder="Pincode" defaultValue={userAddress[0]?.pincode} name="pincode" {...register("pincode")} required />
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="form-group col-md-6">
                      <input type="text" className="form-control" placeholder="State / County" />
                    </div>
                    <div className="form-group col-md-6">
                      <input type="text" className="form-control" placeholder="Postcode / Zip" />
                    </div> */}
                  {/* </div> */}
                  <div className="row">
                    <div className="form-group col-md-6">{/* <input type="email" className="form-control" placeholder="Email" defaultValue={userAddress[0]?.email} {...register("email")} disabled /> */}</div>
                    <div className="form-group col-md-6">{/* <input type="text" className="form-control" placeholder="Phone" defaultValue={userAddress[0]?.phonenumber}  {...register("phonenumber")} /> */}</div>
                  </div>
                  {/* <h4>
                    <Link className="btn-link text-black" type="button" data-toggle="collapse" data-target="#create-an-account">
                      Create an account
                      <i className="fa fa-angle-down"></i>
                    </Link>
                  </h4> */}
                  <div id="create-an-account" className="collapse">
                    <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Password" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 m-b30 m-md-b0">
                  <h3>
                    <button className="btn-link text-black" type="button" data-toggle="collapse" data-target="#different-address1">
                      {/* Ship to a different address <i className="fa fa-angle-down"></i> */}
                      User notes / Instructions <i className="fa fa-angle-down d-none"></i>
                    </button>
                  </h3>
                  <div id="different-address" className="collapse">
                    <p>If you have shopped with us before, please enter your details in the boxes below. If you are a new customer please proceed to the Billing & Shipping section.</p>
                    {/* <div className="form-group">
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                          <option value="">Åland Islands</option>
                          <option value="">Afghanistan</option>
                          <option value="">Albania</option>
                          <option value="">Algeria</option>
                          <option value="">Andorra</option>
                          <option value="">Angola</option>
                          <option value="">Anguilla</option>
                          <option value="">Antarctica</option>
                          <option value="">Antigua and Barbuda</option>
                          <option value="">Argentina</option>
                          <option value="">Armenia</option>
                          <option value="">Aruba</option>
                          <option value="">Australia</option>
                        </Form.Control>
                      </Form.Group>
                    </div> */}
                    <div className="row">
                      <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="First Name" />
                      </div>
                      <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="Last Name" />
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Company Name" />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Address" />
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="Apartment, suite, unit etc." />
                      </div>
                      <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="Town / City" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="State / County" />
                      </div>
                      <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="Postcode / Zip" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <input type="email" className="form-control" placeholder="Email" />
                      </div>
                      <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="Phone" />
                      </div>
                    </div>
                    <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                  </div>
                  <div className="form-group">
                    <textarea type="textarea" rows="3" className="form-control" placeholder="Notes about your order, e.g. special notes for delivery" onChange={(e) => setNotes(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
              {/* </form> */}
              <div className="dlab-divider bg-gray-dark text-gray-dark icon-center">
                <i className="fa fa-circle bg-white text-gray-dark"></i>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <h3>Your Order</h3>
                  <table className="table-bordered check-tbl">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Product name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading ? (
                        cartDetails.length > 0 && status === false ? (
                          cartDetails.map((cart, key) => (
                            <tr className="alert">
                              <td className="product-item-img">
                                <img src={cart.p_image} alt="" />
                              </td>
                              <td className="product-item-name">{cart.p_name}</td>
                              <td className="product-item-price">{cart.p_price}</td>
                              <td className="product-item-quantity">{cart.p_quantity}</td>
                              <td className="product-item-totle">
                                <i class="fa fa-inr"></i> {cart.p_price * cart.p_quantity}
                              </td>
                            </tr>
                          ))
                        ) : (
                          "No items in your Cart for check out."
                        )
                      ) : (
                        <div className="p-2">
                          <div className="p-2">Fetching Cart deails, please wait...</div>
                          <img className="p-2" src={loadingimg} height="20" alt="Loading.."></img>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
                {!loading ? (
                  cartDetails.length > 0 &&
                  status === false && (
                    <div className="col-lg-6">
                      {/* <form className="shop-form" onSubmit={placeOrder}> */}
                      <h3>Order Total</h3>
                      <table className="table-bordered check-tbl">
                        <tbody>
                          <tr>
                            <td>Order Subtotal</td>
                            <td className="product-price">
                              <i class="fa fa-inr"></i> {subTotal}
                            </td>
                          </tr>
                          <tr>
                            <td>Shipping</td>
                            <td>
                              <i class="fa fa-inr"></i> {subTotal < config.freeshippingcost ? config.shippingcost : 0}
                              <div className={subTotal < config.freeshippingcost ? "small" : "d-none"}>
                                {config.freeshippingmessage} <i class="fa fa-inr"></i> {config.freeshippingcost}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Tax({config.taxpercentage}%)</td>
                            <td>
                              <i class="fa fa-inr"></i> {(subTotal * (config.taxpercentage / 100)).toFixed(2)}
                            </td>
                          </tr>
                          <tr className="bg-primary text-light">
                            <td>Total</td>
                            <td>
                              <i class="fa fa-inr"></i> {subTotal + (subTotal * config.taxpercentage) / 100 + (subTotal < config.freeshippingcost ? config.shippingcost : 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h4>Payment Method</h4>

                      <div className="d-none">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Name on Card" />
                        </div>
                        <div className="form-group">
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select">
                              <option value=""></option>
                              <option value="Cash on Delivary">Cash on Delivary</option>
                              <option value="Others">Others</option>
                            </Form.Control>
                          </Form.Group>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Credit Card Number" />
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Card Verification Number" />
                        </div>
                      </div>
                      <div className="form-group">
                        {cartDetails.length > 0 && status === false && (
                          <button disabled={loading} className="btn button-lg btnhover btn-block" type="submit">
                            Place Order Now{" "}
                          </button>
                        )}
                      </div>
                      {/* <div className="form-group d-none">{cartDetails.length > 0 && status === false && <Payment loadingstatus={loading} name={userAddress[0]?.name} email={userAddress[0]?.email} contactno={userAddress[0]?.contactno} amount={subTotal + (subTotal * config.taxpercentage) / 100 + (subTotal < config.freeshippingcost ? config.shippingcost : 0)} />}</div> */}
                      {/* </form> */}
                    </div>
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shopchekout;
