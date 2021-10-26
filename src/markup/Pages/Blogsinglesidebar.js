import React, { Component, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SideBar from "./../Element/SideBar";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import img from "./../../images/banner/bnr1.jpg";
import config from "../../config.json";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as moment from "moment";
const Blogsinglesidebar = (props) => {
  const { slug } = props.match.params;
  const [blogpost, setBlogpost] = useState([]);
  const [comments, setComments] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [image, setImage] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const geturl = window.location.href.split("/");
  const getvalue = geturl[window.location.href.split("/").length - 1];
  const history = useHistory();
  const getpostbytitle = async () => {
    setLoading((loading) => !loading);
    let id = slug === undefined ? getvalue : slug;
    await fetch(config.service_url + `getpost/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          let _filterData = data.data.filter((blog) => blog.posttypevalue === "Blog");
          if (_filterData) {
            setBlogpost(_filterData);
            getcomments(_filterData[0].post_id);
            setImage(_filterData[0].post_image);
            console.log("post image", image);
            setLoading((loading) => !loading);
          }
        } else {
          setLoading((loading) => !loading);
          setSuccessMsg("No Posts");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const getcomments = async (post_id) => {
    await fetch(config.service_url + `getcomments/${post_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setComments(data.data);
          console.log(data, "comments");
        } else {
          console.log(data.message);
        }
      });
  };
  useEffect(() => {
    getpostbytitle();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data, e) => {
    e.preventDefault();
    let datas = {
      userid: localStorage.getItem("uuid"),
      username: localStorage.getItem("name"),
      post_id: blogpost[0].post_id,
      createddate: new Date(),
      comment: data.comment,
      displaydate: moment().format("LLL"),
      isactive: 1,
    };
    console.log("add review", datas);
    fetch(config.service_url + "addcomments", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data: datas }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("regitered user", data);

        if (data.status === 200) {
          setSuccessMsg(data.message);
          e.target.reset();
          getcomments(datas.post_id);
        } else if (data?.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
        }
      });
  };
  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{successMsg}</Modal.Header>
      </Modal>
      <Header />

      <div className="page-content bg-white">
        <div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(" + image + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">{blogpost.length > 0 && blogpost[0].posttitle}</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>Home</Link>
                  </li>
                  <li>{blogpost.length > 0 && blogpost[0].posttitle}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="section-full bg-white content-inner-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-b30">
                {!loading ? (
                  blogpost.length !== 0 ? (
                    blogpost.map((item, index) => (
                      <div className="blog-post blog-single sidebar">
                        <div className="dlab-post-media dlab-img-effect zoom-slow radius-sm text-center">
                          <Link to={"/blog-single-sidebar"}>
                            <img src={item.post_image} className="postthumbnailimage" alt={item.posttitle} />
                          </Link>
                        </div>
                        <div className="dlab-post-info">
                          <div className="dlab-post-title">
                            <h2 className="post-title">{item.posttitle}</h2>
                          </div>
                          <div className="dlab-post-meta">
                            <div className="post-author-thumb">
                              <img src={item.post_image} alt="" />
                            </div>
                            <ul>
                              <li className="post-author">
                                <Link>{item.createdby}</Link>{" "}
                              </li>
                              <li className="post-date">{item.displaydate}</li>
                            </ul>
                          </div>
                          <div className="dlab-post-text">
                            <div dangerouslySetInnerHTML={{ __html: item.postcontent }} />
                          </div>
                          <div className="dlab-post-tags clear d-none">
                            <div className="post-tags">
                              <Link to={""}>Child </Link> <Link to={""}>Eduction </Link> <Link to={""}>Money </Link> <Link to={""}>Resturent </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <div className="row">
                        <div className="icon-bx-wraper text-white service-box2">
                          <div className="icon-content">
                            <h5 className="dlab-tilte text-dark">No Post Found</h5>
                          </div>
                          <br />
                        </div>
                      </div>
                      <div className="row mb-5">
                        <Link to="/blog-half-img-sidebar" className="btn btnhover p-2">
                          All Posts
                        </Link>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="p-2 border round"> Please wait while we are loading post</div>
                )}
                <div className="clear container" id="comment-list">
                  <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="comments-area" id="comments">
                      <h2 className="comments-title">{comments.length > 0 ? comments.length : 0} Comments</h2>
                      <div className="clearfix">
                        <ol className="comment-list">
                          {comments &&
                            comments.map((comment) => (
                              <li className="comment">
                                <div className="comment-body">
                                  <div className="comment-author vcard">
                                    <div className="dlab-post-meta">
                                      <ul>
                                        <li>
                                          <cite className="fn">{comment.username}</cite> <span className="says">says:</span>
                                        </li>
                                        <li className="post-date">{comment.displaydate}</li>
                                        {localStorage.getItem("role") === "admin" && (
                                          <li className="post-date">
                                            <Link>Delete</Link>
                                          </li>
                                        )}
                                      </ul>
                                    </div>

                                    <div className="comment-meta">
                                      {" "}
                                      <Link to={""}></Link>{" "}
                                    </div>
                                  </div>
                                  <p>{comment.comment}</p>
                                  <div className="reply d-none">
                                    {" "}
                                    <Link to={""} className="comment-reply-link d-none">
                                      Reply
                                    </Link>{" "}
                                  </div>
                                </div>
                                {/* <ol className="children">
                                <li className="comment odd parent">
                                  <div className="comment-body">
                                    <div className="comment-author vcard">
                                      <img className="avatar photo" src={require("./../../images/testimonials/pic2.jpg")} alt="" />
                                      <cite className="fn">Harry</cite> <span className="says">says:</span>
                                      <div className="comment-meta">
                                        {" "}
                                        <Link to={""}>October 6, 2015 at 7:15 am</Link>{" "}
                                      </div>
                                    </div>
                                    <p></p>
                                    <div className="reply">
                                      {" "}
                                      <Link to={""} className="comment-reply-link">
                                        Reply
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </li>
                              </ol>
                            */}
                              </li>
                            ))}
                        </ol>

                        <div className="comment-respond" id="respond">
                          <h4 className="comment-reply-title" id="reply-title">
                            Leave a Comment
                            <small>
                              <Link style={{ display: "none" }} to={""} id="cancel-comment-reply-link" rel="nofollow">
                                Cancel reply
                              </Link>{" "}
                            </small>
                          </h4>
                          {/* <p>Your email address will not be published. Required fields are marked *</p> */}
                          <form className="comment-form" id="commentform" method="post" action="http://sedatelab.com/developer/donate/wp-comments-post.php">
                            <textarea type="textarea" rows="8" placeholder="Comment" name="comment" id="comment" {...register("comment")} required></textarea>
                            {/* <p className="comment-form-author">
                              <label for="author">
                                Name <span className="required">*</span>
                              </label>
                              <input type="text" value="" placeholder="Author" id="author" />
                            </p>
                            <p className="comment-form-email">
                              <label for="email">
                                Email <span className="required">*</span>
                              </label>
                              <input type="text" value="" placeholder="Email" id="email" />
                            </p>
                            <p className="comment-form-url">
                              <label for="url">Website</label>
                              <input type="text" value="" placeholder="Website" id="url" />
                            </p> */}
                            <br />
                            {localStorage.getItem("uuid") == undefined ? <label for="author">Please log in to post comment</label> : ""}
                            <p className="form-submit">
                              <input type="submit" disabled={localStorage.getItem("uuid") == undefined ? true : false} value="Post Comment" className="btn btnhover" id="submit" />
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <SideBar />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blogsinglesidebar;
