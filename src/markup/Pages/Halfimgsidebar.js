import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
import SideBar from "./../Element/SideBar";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import img from "./../../images/banner/bnr1.jpg";

const Halfimgsidebar = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const postsPerPage = 1;
  let arrayForHoldingPosts = [];
  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(postsPerPage);
  const [end, setEnd] = useState(0);
  const loopWithSlice = (start, end) => {
    const slicedPosts = posts.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setPostsToShow(arrayForHoldingPosts);
    setEnd(end);
  };
  const getPostDetails = async () => {
    setLoading((loading) => !loading);
    await fetch(config.service_url + "getposts")
      .then((response) => response.json())
      .then((data) => {
        let active = data
          .filter((filter) => filter.isactive === 1 && filter.published === 1 && filter.posttypevalue === "Blog")
          .map((data) => {
            return data;
          });
        setPosts(active);
        const slicedPosts = active.slice(0, postsPerPage);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setPostsToShow(arrayForHoldingPosts);
        setEnd(end);

        setLoading((loading) => !loading);
        console.log(data, "getposts");
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  const handleShowMorePosts = () => {
    loopWithSlice(0, next + postsPerPage);
    setNext(next + postsPerPage);
  };
  useEffect(() => {
    getPostDetails();
    //loopWithSlice(0, postsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>
        <Header />

        <div className="page-content bg-white">
          <div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(" + img + ")" }}>
            <div className="container">
              <div className="dlab-bnr-inr-entry">
                <h1 className="text-white">Our Blog</h1>

                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link to={"./"}>Home</Link>
                    </li>
                    <li>Our Blog</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="section-full content-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  {!loading ? (
                    postsToShow.map((item, index) => (
                      <>
                        <div className="blog-post blog-md clearfix blog-rounded">
                          <div className="dlab-post-media dlab-img-effect zoom-slow " key={index}>
                            <Link to={"/blog-single-sidebar/" + item.slug}>
                              <img src={item.post_image} alt="" />
                            </Link>
                          </div>
                          <div className="dlab-post-info">
                            <div className="dlab-post-title">
                              <h4 className="post-title">
                                <Link to={"/blog-single-sidebar/" + item.slug}>{item.posttitle}</Link>
                              </h4>
                            </div>
                            <div className="dlab-post-meta">
                              <div className="post-author-thumb">
                                <img src={item.post_image} alt="" />
                              </div>
                              <ul>
                                <li className="post-author">
                                  <Link to={""}>{item.createdby}</Link>{" "}
                                </li>
                                <li className="post-date">{item.displaydate}</li>
                              </ul>
                            </div>
                            <div className="dlab-post-text">
                              <p>
                                <div dangerouslySetInnerHTML={{ __html: item.postcontent.substring(0, 150) }} />
                              </p>
                            </div>
                            <div className="dlab-post-readmore">
                              <Link to={"/blog-single-sidebar/" + item.slug} title="READ MORE" rel="bookmark" className="btn btn-sm btn1 btnhover">
                                <i className="fa fa-angle-right"></i>READ MORE
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <div className="p-2 border round"> Please wait while we are loading post</div>
                  )}
                  {end <= posts.length + postsPerPage && (
                    <button className="btn btnhover" onClick={handleShowMorePosts}>
                      Load more Posts
                    </button>
                  )}
                  <div className="pagination-bx clearfix primary rounded-sm text-center d-none">
                    <ul className="pagination ">
                      <li className="previous">
                        <Link to={""}>
                          <i className="ti-arrow-left"></i> Prev
                        </Link>
                      </li>
                      <li className="active">
                        <Link to={""}>1</Link>
                      </li>
                      <li>
                        <Link to={""}>2</Link>
                      </li>
                      <li>
                        <Link to={""}>3</Link>
                      </li>
                      <li className="next">
                        <Link to={""}>
                          Next <i className="ti-arrow-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <SideBar />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Halfimgsidebar;
