import React, { Component } from "react";
import { Link } from "react-router-dom";
import bgfoter from "./../../images/background/bg2.jpg";
import config from "../../config.json";

class Footer extends Component {
  render() {
    return (
      <footer className="site-footer " style={{ backgroundImage: "url(" + bgfoter + ")", backgroundSize: "cover" }}>
        <div className="footer-top bg-line-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div className="widget widget_getintuch">
                  <h5 className="footer-title text-white">Contact Us</h5>
                  <ul>
                    <li>
                      <i className="fa fa-map-marker"></i>
                      <p>{config.contact_address}</p>
                    </li>
                    <li>
                      <i className="fa fa-phone"></i>
                      <p>{config.contact_phone1}</p>
                    </li>
                    <li>
                      <i className="fa fa-mobile"></i>
                      <p>{config.contact_phone2}</p>
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      <p className="text-lowercase">{config.contact_email}</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div className="widget widget_services border-0">
                  <h4 className="footer-title">Quick Links</h4>
                  <ul className="list-2">
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/about"}>About</Link>
                    </li>
                    <li>
                      <Link to={"/our-services"}>Our Courses</Link>
                    </li>

                    <li>
                      <Link to={"/blog"}>Blog</Link>
                    </li>
                    <li>
                      <Link to={"/shop"}>Shop</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>Contact</Link>
                    </li>
                  </ul>
                </div>
                <div className="m-t20">
                  <ul className="dlab-social-icon dlab-social-icon-lg">
                    <li>
                      <a href={"https://www.facebook.com/tsalastudio/"} target="_blank" className="fa fa-facebook bg-primary mr-1"></a>
                    </li>
                    <li>
                      <a href={"https://www.instagram.com/tsalastudio/"} target="_blank" className="fa fa-instagram bg-primary mr-1"></a>
                    </li>
                    <li>
                      <a href={"https://www.pinterest.com/tsalaquiltingstudio/"} target="_blank" className="fa fa-pinterest-p bg-primary mr-1"></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div className="widget border-0">
                  <h4 className="footer-title">Opening Hours</h4>
                  <p className="m-b20">Our support available to help you.</p>
                  <ul className="work-hour-list">
                    <li>
                      <span className="day">
                        <span>Monday to Friday</span>
                      </span>
                      <span className="timing">10AM - 6PM</span>
                    </li>
                    <li>
                      <span className="day">
                        <span>Saturday</span>
                      </span>
                      <span className="timing">By Appointment</span>
                    </li>
                    <li>
                      <span className="day">
                        <span>Sunday</span>
                      </span>
                      <span className="timing">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 text-left">
                {" "}
                <span>
                  Developed/Maintained by{" "}
                  <a href="https://www.theuniquecreations.com" className="font-weight-bold" target="blank">
                    theuniquecreations
                  </a>{" "}
                  <div>Copyright © {new Date().getFullYear()} Unique Creations. All rights are reserved.</div>
                </span>{" "}
              </div>
              <div className="col-lg-6 col-md-6 text-right">
                <div className="widget-link">
                  <ul>
                    <li>
                      <a href="https://www.theuniquecreations.com/contact" className="font-weight-light" target="blank">
                        Contact us
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
