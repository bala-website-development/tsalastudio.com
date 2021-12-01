import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import OurPartners from "./../Element/OurPartners";
import CountUp from "react-countup";

import img1 from "./../../images/banner/bnr1.jpg";
import img2 from "./../../images/background/bg1.jpg";
import img3 from "./../../images/background/bg5.jpg";
import img4 from "./../../images/background/bg3.jpg";
import member1 from "./../../images/our-team/member1.jpg";
import member2 from "./../../images/our-team/member2.jpg";
import member3 from "./../../images/our-team/member3.jpg";
import member4 from "./../../images/our-team/member4.jpg";

import cake1 from "./../../images/cake1.jpg";
import pic5 from "./../../images/about/pic5.jpg";
import pic6 from "./../../images/about/pic6.jpg";
import config from "../../config.json";
const teamInfo = [
  {
    image: member1,
    name: "Nashid Martines",
    post: "Founder",
  },
  {
    image: member2,
    name: "Konne Backfiled",
    post: "Sous Chef",
  },
  {
    image: member3,
    name: "Valentino Morose",
    post: "Ceo & Founder",
  },
  {
    image: member4,
    name: "Hackson Willingham",
    post: "Master Chef",
  },
];

class About extends Component {
  render() {
    return (
      <div>
        <Header active="about" />

        <div className="page-content bg-white">
          <div className="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + img1 + ")" }}>
            <div className="container">
              <div className="dlab-bnr-inr-entry">
                <h1 className="text-white">About Us</h1>

                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link to={"/"}>
                        <i className="fa fa-home"></i>
                      </Link>
                    </li>
                    <li>About Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="content-block">
            <div className="section-full bg-white content-inner" style={{ backgroundImage: "url(" + img3 + ")", backgroundSize: "100%" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-head text-center">
                      <div className="my-4">
                        <img src={config.logo} width="250px" className="rounded" alt="tsalastudio" />
                      </div>
                      <h3></h3>
                      <p>{config.aboutus_aboutpage}</p>
                    </div>
                  </div>
                </div>
                <div className="row sp30">
                  <div className="col-lg-6 col-md-6 m-b30">
                    <div className="about-thumb">
                      <img src={config.aboutus_imageurl1} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30">
                    <div className="about-thumb">
                      <img src={config.aboutus_imageurl2} alt="" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-head">
                      <h3 className="text-primary">Tsala Studio Offerings:</h3>
                      <div>
                        <blockquote>
                          <p>
                            <ul className="list-check mb-0 primary">
                              <li>
                                Regular in-house <strong>quilting &amp; hobby classes</strong>
                              </li>
                              <li>Hobby Classes &amp; Workshops are held periodically by well known artisans, quilters, crochet, embroidery and knitting experts from across the country&nbsp;</li>
                              <li>
                                The store also sells and services Swiss-based Bernina &amp; Bernette <strong>sewing machines</strong>
                              </li>
                              <li>We undertake orders for quilts, bags, home decor and almost any fabric that you might want to custom make</li>
                              <li>
                                Studio <strong>rent out</strong> option available
                              </li>
                              <li>We sell various kinds of quilt fabrics, batting, thread, bobbins, needles, cutting mats, rotary cutters, scissors, rulers, basting pins, tapes, buttons. We also sell supplies such as zippers, bag feet, D rings, magnetic buttons, bag handles (leather and faux leather), bag straps and much more..</li>
                            </ul>
                          </p>
                        </blockquote>
                        <Link to="/our-services" className="btn btnhover">
                          Click here for more Hobby Clases
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-head">
                      <div className="my-4 d-none">
                        <img src={config.logo} width="250px" className="rounded" alt="tsalastudio" />
                      </div>
                      <h3 className="title text-primary">ABOUT Vatsala Kamat</h3>
                      <div>
                        <blockquote>
                          <p>
                            Hi..! I am <strong>Vatsala Kamat</strong> and Crafting is my Art of Living. It all started during my childhood at <strong>Mysore</strong>, I observed my mother engrossed in various handicrafts and picked up her artistic traits.
                          </p>
                          <p>
                            Although I studied life science for my graduation followed by a course in law and interior designing, the law of destiny always <string>directed my life towards crafting</string>. Knitting ,Tatting, Sewing, Patchwork, Macrame Art, Various types of Hand Embroidery, English Paper Piecing, Crochet, Tasselling and Hand Applique are some of the art forms that I enjoy handcrafting for more than <strong>40 years.</strong>
                          </p>
                          <p>Travelling around the globe introduced me to varied local crafts and also influenced my urge to try something different leading to Quilting. My Family, Friends, Gardening and Music are the other captivating aspects of my life that keeps me young at heart.</p>
                          <p>
                            <strong>Tsala Studio </strong>is my brain child, It is an exclusive creative space for all women like me who have experienced or would like to experience the <strong>magic of our own handmade creations</strong>.
                          </p>
                          <p>
                            Email : <a href="mailto:tsalastudio@gmail.com">tsalastudio@gmail.com</a>
                          </p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-full content-inner bg-line-top bg-line-bottom" style={{ backgroundImage: "url(" + img4 + " )" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-head text-center text-white">
                      <h3 className="text-white">We Are Professional at Our Skills</h3>
                      <p>More than 2000+ customers trusted us</p>
                    </div>
                  </div>
                </div>
                <div className="row max-w900 m-auto">
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                    <div className="counter-style-1 text-white text-center">
                      <div className="counter-num">
                        <span className="counter">
                          <CountUp end={15} />
                        </span>
                        <small>+</small>
                      </div>
                      <span className="counter-text">Years of Experience</span>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                    <div className="counter-style-1 text-white text-center">
                      <div className="counter-num">
                        <span className="counter">
                          <CountUp end={10} />
                        </span>
                      </div>
                      <span className="counter-text">Awards Wins</span>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                    <div className="counter-style-1 text-white text-center">
                      <div className="counter-num">
                        <span className="counter">
                          <CountUp end={30} />
                        </span>
                        <small>+</small>
                      </div>
                      <span className="counter-text">Happy Clients</span>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                    <div className="counter-style-1 text-white text-center">
                      <div className="counter-num">
                        <span className="counter">
                          <CountUp end={99} />
                        </span>
                        <small>+</small>
                      </div>
                      <span className="counter-text">Perfect Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-full content-inner-1 bg-white" style={{ backgroundImage: "url(" + img2 + ")" }}>
              <div className="container d-none">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-head text-center">
                      <h3>Our Expert Chefs</h3>
                      <p>Meet our professional team meambers</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {teamInfo.map((item, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                      <div className="dlab-team1" key={index}>
                        <div className="thumb">
                          <img src={item.image} alt="" />
                          <ul className="social-link">
                            <li>
                              <Link to={""}>
                                <i className="fa fa-facebook"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to={""}>
                                <i className="fa fa-twitter"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="team-info text-center">
                          <h4 className="name">{item.name}</h4>
                          <p className="position">{item.post}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-tb50">
                <div className="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="section-head text-center">
                        <h3>Thanks for reaching us</h3>
                        <p>Better yet, see us in person! We love our customers, so feel free to visit during normal business hours.</p>
                        <Link to={"contact"} className="btn-secondry   btn btnhover btn-md">
                          <i className="fas fas-cart"></i>Contact us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <OurPartners /> */}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default About;
