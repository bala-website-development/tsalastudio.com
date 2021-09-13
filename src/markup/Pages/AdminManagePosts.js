import React, { useState, useEffect, useRef } from "react";
import config from "../../config.json";
import { Link, useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import firebase from "../../firebase";
import JoditEditor from "jodit-react";
import Moment from "moment";
const AdminManagePosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState({});
  const [networkError, setNetworkError] = useState("");
  const [masterCategory, setMasterCategory] = useState([]);
  const [masterSubCategory, setMasterSubCategory] = useState([]);
  const [post_image, setPost_image] = useState("");
  const history = useHistory();
  const [p_categorydrp, setp_categorydrp] = useState("");
  const [p_subcategorydrp, setp_subcategorydrp] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [showp, setShowp] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config_ = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const getPostDetails = async () => {
    console.log("cakecategory", props);
    await fetch(config.service_url + "getposts")
      .then((response) => response.json())
      .then((data) => {
        let active = data
          //.filter((filter) => filter.isactive === "1")
          .map((data) => {
            return data;
          });
        setPosts(active);
        console.log(data, "getposts");
      })
      .catch((err) => {
        //setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  const deletePost = (id) => {
    console.log(id);
    fetch(config.service_url + "deletepost", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ Id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(JSON.stringify({ Id: id }));
          setSuccessMsg(data.message);
          handleVisible();
          getPostDetails();
        }
        else if (data?.status === 499) {
          history.push("/shop-login")
        }
        else {
          setSuccessMsg(data.message);
          handleVisible();
        }
      })
      .catch((err) => {
        //setNetworkError("Something went wrong, Please try again later!!");
        //console.log(networkError);
      });
  };
  const activateDeactivatePost = (type, pid, id) => {
    console.log(id);
    let post = {}
    post.post_id = pid;
    post.updateddate = new Date();
    if (type === "activate") post.isactive = id;
    if (type === "publish") post.published = id;
    fetch(config.service_url + "updatepost", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },

      body: JSON.stringify({ data: post }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(JSON.stringify({ data: post }));
          setSuccessMsg(data.message);
          handleVisible();
          getPostDetails();
        }
        else if (data?.status === 499) {
          history.push("/shop-login")
        }
        else {
          setSuccessMsg(data.message);
          handleVisible();
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };
  const getPostCategory = async () => {
    await fetch(config.service_url + "getpostcategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("master category", data);
          setMasterCategory(data.data);
        } else if (data.status === 400) {
          setSuccessMsg("No Data");
          handleVisible();
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };
  const getSubCategories = async () => {
    await fetch(config.service_url + "getsubcategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("master sub category", data);
          setMasterSubCategory(data.data);
        } else if (data.status === 400) {
          setSuccessMsg("No Data");
          handleVisible();
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };
  const onChange_image_post = async (e, imagename) => {
    setSuccessMsg("Please wait");
    console.log("image name", imagename);
    setSmShow(true);
    const file = e.target.files[0];
    console.log("file", e.target.files[0]);
    if (file.size < 1000000) {
      console.log("add products", file);
      const path = config.storage + "/posts";
      const storageRef = firebase.storage().ref(path);
      const fileRef = storageRef.child(editPost.post_id);
      await fileRef.put(file);
      setPost_image(await fileRef.getDownloadURL());
      console.log("add products", post_image);
      setSmShow(false);
      setSuccessMsg("");
    } else {
      setSuccessMsg("Please upload file less than 1 mb");
    }
  };

  useEffect(() => {
    getPostCategory();
    //getSubCategories();
    getPostDetails();

    // console.log("mobile view", isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editPostData = (e, post) => {
    setEditPost({});
    document.getElementById("frmPostadd").reset();
    setShowp((showp) => !showp);
    setEditPost(post);
    setContent(post.postcontent);
    setp_categorydrp(post.postcategory);
    setp_subcategorydrp(post.postsubcategory);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {}, mode: "blur" });
  const onSubmit = (data, e) => {
    let methodname = "addpost";
    console.log("content", content);
    setSuccessMsg("Please wait");
    setSmShow(true);
    e.preventDefault();
    if (localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null) {
      history.push("/");
    } else if (Object.keys(editPost).length > 0) {
      data.post_id = editPost.post_id;
      data.p_updateddate = new Date();
      methodname = "updatepost";
      data.posttitle = data.posttitle !== "" ? data.posttitle : editPost.posttitle;
      data.postcategory = data.postcategory !== "" ? data.postcategory : editPost.postcategory;
      data.postsubcategory = data.postsubcategory !== "" ? data.postsubcategory : editPost.postsubcategory;
      data.postcontent = data.postcontent !== "" ? content : editPost.postcontent;
      data.post_image = post_image;
      data.slug = data.posttitle.replace(/\s/g, "-").toLowerCase();
      data.updateddate = new Date();
    } else {
      data.post_id = uuid();
      data.createddate = new Date();
      data.createduserid = localStorage.getItem("uuid");
      data.createdby = localStorage.getItem("name");
      data.published = 0;
      data.slug = data.posttitle.replace(/\s/g, "-").toLowerCase();
      data.isactive = 1;
      data.displaydate = Moment().format("LL");
      data.viewcount = 0;
      data.updateddate = new Date();
      data.post_image = post_image;
      data.postcontent = content;
    }
    console.log("add post", data);
    fetch(config.service_url + methodname, { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("regitered user", data);
        if (data.status === 200) {
          e.target.reset();
          setEditPost({});
          setSuccessMsg(data.message);
          setSmShow(false);
          handleVisible();
          setp_categorydrp("");
          setp_subcategorydrp("");
          setPost_image("");
          getPostDetails();
        }
        else if (data?.status === 499) {
          history.push("/shop-login");
        }
        else {
          setSuccessMsg(data.message);
        }
      })
      .catch((err) => {
        setSuccessMsg("Something went wrong, Please try again later!!");
      });
  };
  const { post_id, posttitle, postcategory, postsubcategory, postcontent } = Object.keys(editPost).length > 0 ? editPost : {};

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{successMsg}</Modal.Header>
      </Modal>
      <div id="review_form_wrapper">
        <div className={!showp ? "" : "d-none"} id="review_form">
          <button className="btn my-2" onClick={(e) => setShowp((showp) => !showp)}>
            View all Posts ({posts.length > 0 ? posts.length : 0})
          </button>
          <div id="respond" className="comment-respond">
            <h3 className="comment-reply-title" id="reply-title">
              Add Post and Save
            </h3>

            <form className="comment-form" onSubmit={handleSubmit(onSubmit)} id="frmPostadd">
              <div className="comment-form-author">
                <label>
                  Post Title <span className="required">*</span>
                </label>
                <input type="text" defaultValue={posttitle} required aria-required="true" size="30" name="posttitle" {...register("posttitle")} id="posttitle" />
                {/* {errors.p_name && "Product name is required"} */}
              </div>
              <div className="comment-form-author">
                <div className="row">
                  <div className="col">
                    {" "}
                    <label>
                      Post Category <span className="required">*</span>
                    </label>
                    <select value={p_categorydrp} className="form-control" id="postcategory" {...register("postcategory")} name="postcategory" onChange={(e) => setp_categorydrp(e.target.value)}>
                      <option value={""}>{""}</option>
                      {masterCategory.map((cat) => (
                        <option value={cat.category}>{cat.category}</option>
                      ))}
                    </select>
                    {/* <input type="text" defaultValue={p_category} required aria-required="true" size="30" name="p_category" {...register("p_category")} id="p_category" /> */}
                    {/* {errors.p_category && "Category is required"} */}
                  </div>
                  <div className="col">
                    {" "}
                    <label>
                      Post Sub Category <span className="required">*</span>
                    </label>
                    <select value={p_subcategorydrp} className="postsubcategory" id="postsubcategory" {...register("postsubcategory")} className="form-control" onChange={(e) => setp_subcategorydrp(e.target.value)}>
                      <option value={""}>{""}</option>
                      {masterCategory.map((cat) => (
                        <option value={cat.category}>{cat.category}</option>
                      ))}
                    </select>
                    {/* <input type="text" defaultValue={p_subcategory} required aria-required="true" size="30" name="p_subcategory" {...register("p_subcategory")} id="p_subcategory" /> */}
                    {/* {errors.p_subcategory && "Subcategory is required"} */}
                  </div>
                </div>
              </div>
              {Object.keys(editPost).length > 0 && (
                <div className="comment-form-author">
                  <div className="row">
                    <div className="col">
                      <label>Post Image (max. size 1 mb)</label>
                      <input placeholder="Upload Product Image" name="postimage" onChange={onChange_image_post} accept="image/*" className="form-control" type="file" />
                      {/* <input placeholder="Upload Product Image" name="p_image" onChange={onChange_image} type="file" {...register("p_image")} id="p_image" /> */}
                    </div>
                    <div className="col">
                      <label>Post Image</label>
                      <img className="smallimage" src={post_image} />
                    </div>
                  </div>
                </div>
              )}
              <div className="comment-form-comment w-100">
                <label>
                  Post Content <span className="required">*</span>{" "}
                </label>
                <div className="row">
                  <div className="col-lg-12">
                    {/* <input type="textarea" aria-required="true" defaultValue={postcontent} rows="8" cols="45" required name="postcontent" {...register("postcontent")} id="postcontent" /> */}
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config_}
                      tabIndex={2} // tabIndex of textarea
                      rows="8"
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </div>{" "}
                </div>
                {/* {errors.p_description && "Product Description is required"} */}
              </div>

              <div className="form-submit">
                {Object.keys(editPost).length === 0 && (
                  <button type="submit" className="btn btnhover">
                    Save Post
                  </button>
                )}
                {Object.keys(editPost).length > 0 && (
                  <button className="btn btnhover" type="submit">
                    Update Post
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div id="product" className={showp ? "table check-tbl" : "d-none"}>
          <button
            className="btn my-2"
            onClick={(e) => {
              setEditPost({});
              setShowp((showp) => !showp);
              setPost_image("");
            }}
          >
            Add Post
          </button>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Post Title</th>
                <th>Category</th>
                <th>Create Date</th>

                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0
                ? posts.map((post, key) => (
                    <tr>
                      <td className="product-item-img">
                        <img className="smallimage" src={post.post_image} height="15" alt="" />
                      </td>
                      <td className="product-item-name font-weight-normal">{post.posttitle}</td>
                      <td className="product-item-name font-weight-normal">{post.postcategory}</td>
                      <td className="product-item-price font-weight-normal">{Moment(post.createddate).format("DD-MMM-YYYY hh:mm A")}</td>

                      <td>
                        <Link className="btn py-1" onClick={(e) => (setPost_image(post.post_image), editPostData(e, post))}>
                          Edit
                        </Link>{" "}
                        <Link className={post.published === 0 ? "btn bg-success py-1" : "btn  py-1"} onClick={(e) => activateDeactivatePost("publish", post.post_id, post.published === 1 ? 0 : 1)}>
                          {post.published === 0 ? "Publish" : "UnPublish"}
                        </Link>{" "}
                        <Link className={post.isactive === 0 ? "btn py-1 bg-success" : "btn bg-danger py-1"} onClick={(e) => activateDeactivatePost("activate", post.post_id, post.isactive === 1 ? 0 : 1)}>
                          {post.isactive === 1 ? "Deactivate" : "Activate"}
                        </Link>
                      </td>
                      <td>
                        <Link className="btn bg-danger py-1" onClick={(e) => deletePost(post.post_id)}>
                          X
                        </Link>
                      </td>
                    </tr>
                  ))
                : "No Post added"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManagePosts
