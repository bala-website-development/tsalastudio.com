import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic1.jpg";
import work_pic3 from "./../../images/our-work/pic1.jpg";
import config from "../../config.json";
const Testimonial = (props) => {
  const [products, setProducts] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const getTestimonial = async () => {
    console.log("recentpost", products);
    await fetch(config.service_url + "gettestimonial")
      .then((response) => response.json())
      .then((data1) => {
        if (data1.status === 200) {
          let active1 = data1.data
            .filter((filter1, index) => filter1.isactive === "1")
            .map((data) => {
              return data;
            });
          setProducts(active1);
          console.log("gettestimonial", active1);
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log("gettestimonial", err);
      });
  };

  useEffect(() => {
    getTestimonial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-r20 mt-5">
      <div className="section-head text-left">
        <h2>Testimonial</h2>
        <div className="dlab-separator style1 bg-primary"></div>
      </div>

      <div>
        <div class="container1 mb-5">
          {products.length > 0 &&
            products.map((course) => (
              <div class="card">
                <div class="card-header1">
                  <img src={course.t_image} alt="rover" />
                </div>
                <div class="card-body dangerous">
                  <h5>{course.t_title}</h5>
                  <p className="mb-2">
                    {/* <div dangerouslySetInnerHTML={{ __html: course.postcontent.substring(0, 150) }} /> */}
                    <div dangerouslySetInnerHTML={{ __html: course.t_content }} />
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
