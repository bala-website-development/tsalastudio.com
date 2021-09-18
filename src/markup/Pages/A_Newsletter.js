import React, { useState, useEffect, useRef } from "react";
import config from "../../config.json";
import { Link, useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import firebase from "../../firebase";
import JoditEditor from "jodit-react";
import Moment from "moment";
const A_Newsletter = (props) => {
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
    // getGalleryDetails();
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
          //etGalleryDetails();
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
        <div className=" d-flex ">
          <div class="input-group mb-3 justify-content-center w-100">
            <input type="text" className="px-3 " placeholder="Enter your email" />
            <div class="input-group-append">
              <button class="btn btnhover" type="button">
                Join us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default A_Newsletter;
