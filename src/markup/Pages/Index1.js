import React, { useEffect, useState } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import OurPartners from "./../Element/OurPartners";
import Slider from "./../Element/Slider";
import Accord from "./../Element/Accord";
import config from "../../config.json";
import img1 from "./../../images/background/bg5.jpg";
import img2 from "./../../images/background/bg1.jpg";
import img3 from "./../../images/background/bg5.jpg";
import img4 from "./../../images/background/bg4.jpg";
import cake1 from "./../../images/cake1.jpg";
import pic1 from "./../../images/about/pic1.jpg";
import icon2 from "./../../images/icons/service-icon/icon2.png";
import icon3 from "./../../images/icons/service-icon/icon3.png";
import icon4 from "./../../images/icons/service-icon/icon4.png";
import icon5 from "./../../images/icons/service-icon/icon5.png";
import icon1 from "./../../images/icons/service-icon/icon1.png";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic2.jpg";
import work_pic3 from "./../../images/our-work/pic3.jpg";
import pic3 from "./../../images/about/pic3.jpg";
import A_Newsletter from "./A_Newsletter";
//Images
// var img1 = require("./../../images/background/bg5.jpg");
// var serblog1 = require("./../../images/our-services/pic1.jpg");
// var serblog2 = require("./../../images/our-services/pic2.jpg");
// var serblog3 = require("./../../images/our-services/pic3.jpg");
// var serblog4 = require("./../../images/our-services/pic4.jpg");
// var img2 = require("./../../images/background/bg1.jpg");
// var img3 = require("./../../images/background/bg5.jpg");
// var img4 = require("./../../images/background/bg4.jpg");

const blogNews = [
  {
    image: require("./../../images/blog/grid/pic1.jpg"),
    title: "Understand The Background Of Bakery Now.",
  },
  {
    image: require("./../../images/blog/grid/pic2.jpg"),
    title: "Seven Reliable Sources To Learn About Bakery.",
  },
  {
    image: require("./../../images/blog/grid/pic3.jpg"),
    title: "Ten Places That You Can Find Bakery.",
  },
];

const Index1 = () => {
  const [latestCat, setLatestCat] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      await fetch(config.service_url + "getHomePageCategory")
        .then((response) => response.json())
        .then((data) => setLatestCat(data));
      console.log("latestCat", latestCat);
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <Header active={"home"} />

      <div className="page-content bg-white">
        <div className="content-block">
          <Slider />
          <div className="section-full content-inner-3" style={{ backgroundImage: "url(" + img1 + ")", backgroundSize: "100%" }}>
            <div className="container">
              <div className="row service-area1">
                {latestCat &&
                  latestCat.map((cat) => (
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                      <div className="icon-bx-wraper text-center service-box1" style={{ backgroundImage: "url(" + cat.imageurl + ")" }}>
                        <div className="icon-content">
                          <h2 className="dlab-tilte text-white">{cat.title}</h2>
                          <p>{cat.subtitle}</p>
                          <div className="dlab-separator style1 bg-primary"></div>
                          <Link to={{ pathname: "/shop", category: cat.category }} className="btn btnhover">
                            More details <i className="fa fa-angle-double-right m-l5"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head mb-0 text-center">
                    <div className="my-4">
                      <img className="rounded" width="200px" src={config.logo} alt="" />
                    </div>
                    <h3 className="text-primary">{config.aboutustitle}</h3>
                    <p className="main-text">{config.aboutus1} </p>
                    <p>{config.aboutus2}</p>
                    <div>
                      <A_Newsletter />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-full content-inner service-area2 bg-img-fix bg-line-top bg-line-bottom" style={{ backgroundImage: "url(" + img4 + ")", backgroundSize: "cover" }}>
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
                            <img src={icon2} alt="" />
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
                            <img src={icon4} alt="" />
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
                            <img src={icon5} alt="" />
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
                            <img src={icon5} alt="" />
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
                            <img src={icon1} alt="" />
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
          <div className="section-full content-inner bg-gray" style={{ backgroundImage: "url(" + img2 + ")", backgroundSize: "100%" }}>
            <div className="container">
              <div className="row faq-area1">
                <div className="col-lg-6 m-b30">
                  <div className="m-r20">
                    <div className="section-head text-left">
                      <h2>Sale And Delivery Points</h2>
                      <p className="text-bold">Where to buy our high quality Cake</p>
                      <div className="dlab-separator style1 bg-primary"></div>
                    </div>
                    <div className="clearfix">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
                      <p className="text">
                        First and foremost I am a chef, whether behind the stove at one of my Northern California restaurants or for the past 15 years in front of the Lorem Ipsum is simply <strong>Bakery</strong> dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.
                      </p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
                      <Link to={"/faq"} className="btn btn-md btnhover shadow m-t30">
                        <i className="fa fa-angle-right m-r10"></i>Get Started
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 m-b30">
                  <Accord />
                </div>
              </div>
            </div>
          </div>
          <div className="section-full bg-white">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="port-box1 text-white">
                    <div className="dlab-media">
                      <img src={work_pic1} alt="" />
                    </div>
                    <div className="dlab-info">
                      <h2 className="title">vegan pie</h2>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="port-box1 text-white">
                    <div className="dlab-media">
                      <img src={work_pic2} alt="" />
                    </div>
                    <div className="dlab-info">
                      <h2 className="title">lemon cake</h2>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="port-box1 text-white">
                    <div className="dlab-media">
                      <img src={work_pic3} alt="" />
                    </div>
                    <div className="dlab-info">
                      <h2 className="title">wedding cake</h2>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="port-box1 text-white m-md-b0 m-sm-b0">
                    <div className="dlab-media">
                      <img src={work_pic2} alt="" />
                    </div>
                    <div className="dlab-info">
                      <h2 className="title">fruit cake</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-full bg-white" style={{ backgroundImage: "url(" + img3 + ")", backgroundSize: "100%" }}>
            <div className="container content-inner">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <div className="icon-bx icon-bx-xl">
                      <img src={cake1} alt="" />
                    </div>
                    <h3>We Are Professional at Our Skills</h3>
                    <p>More than 2000+ customers trusted us</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                  <div className="counter-style-1 text-center">
                    <div className="counter-num text-primary">
                      <span className="counter">
                        <CountUp end={53} />
                      </span>
                      <small>+</small>
                    </div>
                    <span className="counter-text">Years of Experience</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                  <div className="counter-style-1 text-center">
                    <div className="counter-num text-primary">
                      <span className="counter">
                        <CountUp end={102} />
                      </span>
                    </div>
                    <span className="counter-text">Awards Wins</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                  <div className="counter-style-1 text-center">
                    <div className="counter-num text-primary">
                      <span className="counter">
                        <CountUp end={36} />
                      </span>
                      <small>k</small>
                    </div>
                    <span className="counter-text">Happy Clients</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                  <div className="counter-style-1 text-center">
                    <div className="counter-num text-primary">
                      <span className="counter">
                        <CountUp end={99} />
                      </span>
                    </div>
                    <span className="counter-text">Perfect Products</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row m-lr0 about-area1">
                <div className="col-lg-6 p-lr0">
                  <img className="img-cover" src={pic3} alt="" />
                </div>
                <div className="col-lg-6 p-lr0 d-flex align-items-center text-center">
                  <div className="about-bx">
                    <div className="section-head text-center text-white">
                      <h4 className="text-white">Limited Time Offer</h4>
                      <p>Wedding Cake Sale !</p>
                      <div className="icon-bx">
                        <img src={icon2} alt="" />
                      </div>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                    <Link to={"about-1"} className="btn-secondry white btnhover btn-md">
                      <i className="fa fa-cart"></i>GET NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row client-area1 p-t80">
                <OurPartners />
              </div>
            </div>
            <div className="container content-inner d-none">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <div className="icon-bx icon-bx-xl">
                      <img src={cake1} alt="" />
                    </div>
                    <h3>From The Blog</h3>
                    <p>Latest news and updates</p>
                  </div>
                </div>
              </div>
              <div className="row">
                {blogNews.map((item, index) => (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <div className="blog-post blog-grid blog-rounded">
                      <div className="dlab-post-media dlab-img-effect">
                        <Link to={"/blog-single-sidebar"}>
                          <img src={item.image} alt="" />
                        </Link>
                      </div>
                      <div className="dlab-info p-a25">
                        <div className="dlab-post-title">
                          <h4 className="post-title">
                            <Link to={"/blog-single-sidebar"}>{item.title}</Link>
                          </h4>
                        </div>
                        <div className="dlab-post-meta">
                          <ul>
                            <li className="post-folder">
                              <i className="fa fa-folder-open-o"></i>
                              <Link to={""}>Cake</Link>,<Link to={""}> Biscuits</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index1;
