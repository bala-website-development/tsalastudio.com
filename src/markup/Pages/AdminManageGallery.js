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
  const [gallery, setGallery] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [gallery_image, setGallery_image] = useState("");
  const history = useHistory();
  const [smShow, setSmShow] = useState(false);
  const [showp, setShowp] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const getGalleryDetails = async () => {
    await fetch(config.service_url + "getgallery")
      .then((response) => response.json())
      .then((data) => {
        let active = data
          //.filter((filter) => filter.isactive === "1")
          .map((data) => {
            return data;
          });
        setGallery(active);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  const deleteGallery = (id) => {
    console.log(id);
    fetch(config.service_url + "deletegallery", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ Id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify({ Id: id }));
        setSuccessMsg(data.message);
        handleVisible();
        getGalleryDetails();
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        //console.log(networkError);
      });
  };
  const updategallery = (type, pid, id) => {
    console.log(id);
    let post = {};
    post.gallery_id = pid;
    post.updateddate = new Date();
    post.viewingallery = id;
    fetch(config.service_url + "updategallery", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },

      body: JSON.stringify({ data: post }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify({ data: post }));
        setSuccessMsg(data.message);
        handleVisible();
        getGalleryDetails();
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };

  const onChange_image_gallery = async (e, imagename) => {
    setSuccessMsg("Please wait");
    console.log("image name", imagename);
    setSmShow(true);
    const file = e.target.files[0];
    console.log("file", e.target.files[0]);
    if (file.size < 1000000) {
      console.log("add products", file);
      const path = config.storage + "/gallery";
      const storageRef = firebase.storage().ref(path);
      const fileRef = storageRef.child(uuid());
      await fileRef.put(file);
      setGallery_image(await fileRef.getDownloadURL());
      console.log("add products", gallery_image);
      setSmShow(false);
      setSuccessMsg("");
    } else {
      setSuccessMsg("Please upload file less than 1 mb");
    }
  };

  useEffect(() => {
    getGalleryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {}, mode: "blur" });
  const onSubmit = (data, e) => {
    let methodname = "addgallery";

    setSuccessMsg("Please wait");
    setSmShow(true);
    e.preventDefault();
    if (localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null) {
      history.push("/");
    } else {
      data.gallery_id = uuid();
      data.createddate = new Date();
      data.createduserid = localStorage.getItem("uuid");
      data.createdby = localStorage.getItem("name");
      data.viewingallery = 0;
      data.isactive = 1;
      data.displaydate = Moment().format("LL");
      data.imageurl = gallery_image;
    }
    console.log("add gallery", data);
    fetch(config.service_url + methodname, { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("regitered user", data);
        if (data.status === 200) {
          e.target.reset();
          setSuccessMsg(data.message);
          setSmShow(false);
          handleVisible();
          setGallery_image("");
          getGalleryDetails();
        } else {
          setSuccessMsg(data.message);
        }
      })
      .catch((err) => {
        setSuccessMsg("Something went wrong, Please try again later!!");
      });
  };

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{successMsg}</Modal.Header>
      </Modal>
      <div id="review_form_wrapper">
        <div className={!showp ? "" : "d-none"} id="review_form">
          <button className="btn my-2" onClick={(e) => setShowp((showp) => !showp)}>
            View all Gallery ({gallery.length > 0 ? gallery.length : 0})
          </button>
          <div id="respond" className="comment-respond">
            <h3 className="comment-reply-title" id="reply-title">
              Add Image and Save
            </h3>

            <form className="comment-form" onSubmit={handleSubmit(onSubmit)} id="frmPostadd">
              <div className="comment-form-author">
                <label>
                  Image Title <span className="required">*</span>
                </label>
                <input type="text" required aria-required="true" size="30" name="title" {...register("title")} id="title" />
                {/* {errors.p_name && "Product name is required"} */}
              </div>

              <div className="comment-form-author">
                <div className="row">
                  <div className="col">
                    <label>Post Image (max. size 1 mb)</label>
                    <input placeholder="Upload Product Image" name="postimage" onChange={onChange_image_gallery} accept="image/*" className="form-control" type="file" />
                  </div>
                  <div className="col">
                    <label>Post Image</label>
                    <img className="smallimage" src={gallery_image} />
                  </div>
                </div>
              </div>

              <div className="form-submit">
                <button type="submit" className="btn btnhover">
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="product" className={showp ? "table check-tbl" : "d-none"}>
          <button
            className="btn my-2"
            onClick={(e) => {
              setShowp((showp) => !showp);
              setGallery_image("");
            }}
          >
            Add Image
          </button>
          <table className="table check-tbl">
            <thead>
              <tr>
                <th>Gallery</th>
                <th>Image</th>
                <th>Title</th>
                <th>ImageURL</th>
                <th>Create Date</th>

                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {gallery.length > 0
                ? gallery.map((post, key) => (
                    <tr>
                      <td>
                        <Link className={post.viewingallery === 1 ? "btn py-1" : "btn bg-success py-1"} onClick={(e) => updategallery("viewingallery", post.gallery_id, post.viewingallery === 1 ? 0 : 1)}>
                          {post.viewingallery === 1 ? "Hide" : "Show"}
                        </Link>{" "}
                      </td>
                      <td className="product-item-img">
                        <img className="smallimage" src={post.imageurl} height="15" alt="" />
                      </td>
                      <td className="product-item-name font-weight-normal">{post.title}</td>
                      <td className="product-item-name font-weight-light text-small">
                        <Link
                          onClick={() => {
                            navigator.clipboard.writeText(post.imageurl);
                          }}
                          className="btn btnhove p-2"
                        >
                          Copy URL
                        </Link>
                      </td>
                      <td className="product-item-price font-weight-normal text-no-wrap">{Moment(post.createddate).format("DD-MMM-YYYY")}</td>

                      <td className="product-item-close">
                        <Link className="ti-close" onClick={(e) => deleteGallery(post.gallery_id)}></Link>
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

export default AdminManagePosts;
