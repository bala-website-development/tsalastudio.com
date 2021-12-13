import React from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Payment from "./../Element/Payment";
import Footer from "./../Layout/Footer";
import img1 from "./../../images/banner/bnr1.jpg";
import img2 from "./../../images/background/bg5.jpg";
import { useLocation } from "react-router-dom";
const PaymentPage = (props) => {
  const location = useLocation();
  return (
    <div>
      <div>
        <Header />

        <div className="page-content bg-white">
          <div className="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + img1 + ")" }}>
            <div className="container">
              <div className="dlab-bnr-inr-entry">
                <h1 className="text-white">Payment</h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link to={"./"}>
                        <i className="fa fa-home"></i>
                      </Link>
                    </li>
                    <li>Payment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="content-block">
            <div className="section-full content-inner-2 contact-form bg-white" style={{ backgroundImage: "url(" + img2 + ")", backgroundSize: "100%" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="page-notfound text-center">
                      <Payment amount={location.state.amount} name={location.state.name} orderid={location.state.orderid} email={location.state.email} contactno={location.state.contactno} orderstatus={location.state.orderstatus} paymentstatus={location.state.paymentstatus} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
