import React, { useState, useEffect, useRef } from "react";
import config from "../../config.json";
import { Link, useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import firebase from "../../firebase";
import JoditEditor from "jodit-react";
import Moment from "moment";
const AdminViewUsers = (props) => {
  const [gallery, setGallery] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [gallery_image, setGallery_image] = useState("");
  const history = useHistory();
  const [smShow, setSmShow] = useState(false);
  const [showp, setShowp] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [newsletterUsers, setNewsletterUsers] = useState("");
  const [accoutUsers, setAccoutUsers] = useState("");

  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const getNewsletterUsers = async () => {
    //await fetch(config.service_url + "getNewsletterUsers")
    await fetch(config.service_url + "getNewsletterUsers", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
      .then((response) => response.json())
      .then((data) => {
        let active = data
          // .filter((filter) => filter.isactive == 1)
          .map((data) => {
            return data;
          });
        setNewsletterUsers(active);
        console.log("newsletterUsers", newsletterUsers);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  const getAccoutUsers = async () => {
    // await fetch(config.service_url + "getAccoutUsers")
    await fetch(config.service_url + "getAccoutUsers", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
      .then((response) => response.json())
      .then((data) => {
        let active = data
          //.filter((filter) => filter.isactive == 1)
          .map((data) => {
            return data;
          });
        setAccoutUsers(active);
        console.log("accoutUsers", accoutUsers);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };

  useEffect(() => {
    getNewsletterUsers();
    getAccoutUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id="review_form_wrapper">
        <div className="py-1 font-weight-bold text-primary"> NewsLetter Users ({newsletterUsers.length > 0 ? newsletterUsers.length : 0}):</div>
        <div> {newsletterUsers.length > 0 ? newsletterUsers.map((user) => user.email) + ", " : "No user Found"}</div>
        <div className="py-1 font-weight-bold text-primary"> Account Users ({accoutUsers.length > 0 ? accoutUsers.length : 0}):</div>
        <div>{accoutUsers.length > 0 ? accoutUsers.map((user) => user && user.email) + ", " : "No user Found"} </div>
      </div>
    </div>
  );
};

export default AdminViewUsers;
