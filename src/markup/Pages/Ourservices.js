import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import OurPartners from "./../Element/OurPartners";
import PriceTable from "./../Element/PriceTable";

import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

import img1 from "./../../images/banner/bnr1.jpg";
import img2 from "./../../images/background/bg5.jpg";
import img3 from "./../../images/background/bg4.jpg";
import img4 from "./../../images/background/bg1.jpg";
import cake1 from "./../../images/cake1.jpg";
import pic1 from "./../../images/about/pic1.jpg";
import serv_icon2 from "./../../images/icons/service-icon/icon2.png";
import icon3 from "./../../images/icons/service-icon/icon3.png";
import serv_icon4 from "./../../images/icons/service-icon/icon4.png";
import serv_icon5 from "./../../images/icons/service-icon/icon5.png";
import icon4 from "./../../images/icons/icon4.png";
import icon5 from "./../../images/icons/icon5.png";
import icon6 from "./../../images/icons/icon6.png";
import icon7 from "./../../images/icons/icon7.png";
import serv_icon1 from "./../../images/icons/service-icon/icon1.png";
import config from "../../config.json";

const Ourservices = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const getPostDetails = async () => {
    setLoading((loading) => !loading);
    await fetch(config.service_url + "getposts")
      .then((response) => response.json())
      .then((data) => {
        let active = data
          .filter((filter) => (filter.isactive === 1 && filter.published === 1 && filter.posttypevalue === "Course"))
          .map((data) => {
            return data;
          });
        setCourses(active);
        setLoading((loading) => !loading);
        console.log(data, "getposts");
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };

  useEffect(() => {
    getPostDetails();
  }, [])

  return (
    <div>
      <Header active="service" />
      <div className="page-content bg-white">
        <div class="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + img1 + ")", backgroundSize: "cover" }}>
          <div class="container">
            <div class="dlab-bnr-inr-entry">
              <h1 class="text-white">Our Services</h1>

              <div class="breadcrumb-row">
                <ul class="list-inline">
                  <li>
                    <Link to={"./"}>
                      <i class="fa fa-home"></i>
                    </Link>
                  </li>
                  <li>Our Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="bg-white " style={{ backgroundImage: "url(" + img2 + ")", backgroundSize: "100%" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <div className="icon-bx icon-bx-xl">
                      <img src={cake1} alt="" />
                    </div>
                    <h3>We’Ve Got You Covered!</h3>
                    <p>What You Get With Us</p>
                  </div>
                </div>
              </div>

              <div className="row d-none">
                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                  <div className="icon-bx-wraper bx-style-1 bg-white p-a30 center fly-box-ho">
                    <div className="icon-bx-md bg-primary radius m-b20">
                      <span className="icon-cell">
                        <img src={icon4} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4 className="dlab-tilte m-b5">Fast Delivery</h4>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                  <div className="icon-bx-wraper bx-style-1 bg-white p-a30 center fly-box-ho">
                    <div className="icon-bx-md bg-primary radius m-b20">
                      <span className="icon-cell">
                        <img src={icon5} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4 className="dlab-tilte m-b5">Pickup In Store</h4>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                  <div className="icon-bx-wraper bx-style-1 bg-white p-a30 center fly-box-ho">
                    <div className="icon-bx-md bg-primary radius m-b20">
                      <span className="icon-cell">
                        <img src={icon6} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4 className="dlab-tilte m-b5">Seat Reservation</h4>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                  <div className="icon-bx-wraper bx-style-1 bg-white p-a30 center fly-box-ho">
                    <div className="icon-bx-md bg-primary radius m-b20">
                      <span className="icon-cell">
                        <img src={icon7} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4 className="dlab-tilte m-b5">Catering Is An Option</h4>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                  <div className="icon-bx-wraper bx-style-1 bg-white p-a30 center fly-box-ho">
                    <div className="icon-bx-md bg-primary radius m-b20">
                      <span className="icon-cell">
                        <img src={icon4} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4 className="dlab-tilte m-b5">Fast Delivery</h4>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                  <div className="icon-bx-wraper bx-style-1 bg-white p-a30 center fly-box-ho">
                    <div className="icon-bx-md bg-primary radius m-b20">
                      <span className="icon-cell">
                        <img src={icon5} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4 className="dlab-tilte m-b5">Pickup In Store</h4>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                  <div className="icon-bx-wraper bx-style-1 bg-white p-a30 center fly-box-ho">
                    <div className="icon-bx-md bg-primary radius m-b20">
                      <span className="icon-cell">
                        <img src={icon6} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4 className="dlab-tilte m-b5">Seat Reservation</h4>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                  <div className="icon-bx-wraper bx-style-1 bg-white p-a30 center fly-box-ho">
                    <div className="icon-bx-md bg-primary radius m-b20">
                      <span className="icon-cell">
                        <img src={icon7} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4 className="dlab-tilte m-b5">Catering Is An Option</h4>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container1 mb-5">
            {
              courses && courses.map((course) => (
                <div class="card ">
                  <div class="card-header1">
                    <img src={course.post_image} alt="rover" />
                  </div>
                  <div class="card-body">
                    <span class="tag tag-teal">Sub Category name</span>
                    <h5>{course.posttitle}</h5>
                    <p className="mb-2">
                      <div dangerouslySetInnerHTML={{ __html: course.postcontent.substring(0, 150) }} />
                    </p>
                    <div className="user">
                      <a href={course.courselink} target="_blank">
                        Learn more ...
                      </a>
                    </div>
                  </div>
                </div>

              ))
            }

          </div>
          <div className="section-full content-inner service-area2 bg-img-fix bg-line-top bg-line-bottom" style={{ backgroundImage: "url(" + img3 + ")", backgroundSize: "cover" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <h2 className="text-white">What Do We Offer For You?</h2>
                    <p className="text-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div className="dlab-separator style1 bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 m-b30">
                  <img src={pic1} className="img-cover radius-sm" alt="" />
                </div>
                <div className="col-lg-8">
                  <div className="row p-l30">
                    <div className="col-lg-6 col-sm-6 m-b30">
                      <div className="icon-bx-wraper text-white service-box2">
                        <div className="icon-bx">
                          <Link to={""} className="icon-cell">
                            <img src={serv_icon2} alt="" />
                          </Link>
                        </div>
                        <div className="icon-content">
                          <h5 className="dlab-tilte">Pancakes</h5>
                          <p>Lorem Ipsum is dummy</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 m-b30">
                      <div className="icon-bx-wraper text-white service-box2">
                        <div className="icon-bx">
                          <Link to={""} className="icon-cell">
                            <img src={icon3} alt="" />
                          </Link>
                        </div>
                        <div className="icon-content">
                          <h5 className="dlab-tilte">Muffin</h5>
                          <p>Lorem Ipsum is dummy</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 m-b30">
                      <div className="icon-bx-wraper text-white service-box2">
                        <div className="icon-bx">
                          <Link to={""} className="icon-cell">
                            <img src={serv_icon4} alt="" />
                          </Link>
                        </div>
                        <div className="icon-content">
                          <h5 className="dlab-tilte">Pumpkin cakes</h5>
                          <p>Lorem Ipsum is dummy</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 m-b30">
                      <div className="icon-bx-wraper text-white service-box2">
                        <div className="icon-bx">
                          <Link to={""} className="icon-cell">
                            <img src={serv_icon5} alt="" />
                          </Link>
                        </div>
                        <div className="icon-content">
                          <h5 className="dlab-tilte">Pumpkin Cupcakes</h5>
                          <p>Lorem Ipsum is dummy</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 m-b30">
                      <div className="icon-bx-wraper text-white service-box2">
                        <div className="icon-bx">
                          <Link to={""} className="icon-cell">
                            <img src={serv_icon5} alt="" />
                          </Link>
                        </div>
                        <div className="icon-content">
                          <h5 className="dlab-tilte">Cake Services</h5>
                          <p>Lorem Ipsum is dummy</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 m-b30">
                      <div className="icon-bx-wraper text-white service-box2">
                        <div className="icon-bx">
                          <Link to={""} className="icon-cell">
                            <img src={serv_icon1} alt="" />
                          </Link>
                        </div>
                        <div className="icon-content">
                          <h5 className="dlab-tilte">Birthday Cake</h5>
                          <p>Lorem Ipsum is dummy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-full content-inner-1 bg-white" style={{ backgroundImage: "url(" + img4 + ")" }}>
            <PriceTable />

            <div className="content-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-head text-center">
                      <h3>Our PARTNERS</h3>
                      <p>famous companies trusted us, why you are not</p>
                    </div>
                  </div>
                </div>
              </div>
              <OurPartners />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Ourservices;
