import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import config from "../../config.json";
const SideBar = (props) => {
  const [posts, setPosts] = useState([]);
  const [galleryimage, setGalleryImage] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const getPostDetails = async () => {
    console.log("recentpost", posts);
    await fetch(config.service_url + "getrecentposts")
      .then((response) => response.json())
      .then((data) => {
        let active = data
          .filter((filter) => filter.isactive === 1 && filter.published === 1 && filter.posttypevalue === "Blog")
          .map((data) => {
            return data;
          });
        setPosts(active);
        console.log("recentpost", posts);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  const getGalleryDetails = async () => {
    await fetch(config.service_url + "getgallery")
      .then((response) => response.json())
      .then((data1) => {
        let active1 = data1
          .filter((filter1) => filter1.viewingallery === 1)
          .map((data1) => {
            return data1;
          });
        setGalleryImage(active1);
        console.log("galleryimages", galleryimage);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  useEffect(() => {
    getPostDetails();
    getGalleryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-lg-4 sticky-top">
      <aside className="side-bar">
        <div className="widget d-none">
          <div className="search-bx style-2">
            <form role="search" method="post">
              <div className="input-group">
                <input name="text" className="form-control" placeholder="Enter your keywords..." type="text" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btnhover primary">
                    Search
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className={props?.fromhome ? "d-none" : "widget widget_gallery gallery-grid-4"}>
          <h5 className="widget-title style-1">Our Gallery</h5>
          <SimpleReactLightbox>
            <SRLWrapper>
              <ul id="lightgallery" className="lightgallery">
                {galleryimage.map((item, index) => (
                  <li>
                    <div className="dlab-post-thum dlab-img-effect">
                      <a href={item.imageurl} className="check-km">
                        <img src={item.imageurl} alt={item.title} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </SRLWrapper>
          </SimpleReactLightbox>
        </div>
        <div className="widget recent-posts-entry">
          <h5 className="widget-title style-1">Recent Posts</h5>
          <div className="widget-post-bx">
            {posts.map((item, index) => (
              <div className="widget-post clearfix">
                <div className="dlab-post-media ">
                  <img className="round" src={item.post_image} width="200" height="200" alt="" />
                </div>
                <div className="dlab-post-info">
                  <div className="dlab-post-meta">
                    <ul>
                      <li className="post-date">{item.displaydate}</li>
                    </ul>
                  </div>
                  <div className="dlab-post-header">
                    <h6 className="post-title">
                      <Link to={"/blog-single-sidebar/" + item.slug} target="_blank">
                        {item.posttitle}
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="widget widget_archive d-none">
          <h5 className="widget-title style-1">Categories List</h5>
          <ul>
            <li>
              <Link to={""}>Dinner Recipes</Link>
            </li>
            <li>
              <Link to={""}>Vegan Recipes</Link>
            </li>
            <li>
              <Link to={""}>Healthy Food</Link>
            </li>
            <li>
              <Link to={""}>Italian Food</Link>
            </li>
            <li>
              <Link to={""}>Indian Food</Link>
            </li>
          </ul>
        </div>
        <div className="widget widget_tag_cloud radius d-none">
          <h5 className="widget-title style-1">Tags</h5>
          <div className="tagcloud">
            <Link to={""}>Bakery</Link>
            <Link to={""}>Cake</Link>
            <Link to={""}>Food</Link>
            <Link to={""}>Dinner</Link>
            <Link to={""}>Burger</Link>
            <Link to={""}>Restaurant</Link>
            <Link to={""}>Healthy</Link>
            <Link to={""}>Coffe</Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
