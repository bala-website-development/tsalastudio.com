import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { BrowserView, MobileView, isMobile } from "react-device-detect";
// import { isMobile } from "react-device-detect";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
//import ReactStars from "react-stars";
import "react-multi-carousel/lib/styles.css";
import uuid from "react-uuid";
//import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import * as moment from "moment";
import img1 from "./../../images/banner/bnr1.jpg";
import { Modal } from "react-bootstrap";
import firebase from "../../firebase";
import Moment from "moment";
import Chart from "./Chart";
import AdminManagePosts from "./AdminManagePosts";
import AdminManageGallery from "./AdminManageGallery";
//import Camera, { FACING_MODES } from "react-html5-camera-photo";
//import "react-html5-camera-photo/build/css/index.css";
// import ImagePreview from './ImagePreview';
const Admin = (props) => {
  //const [productDtl, setProductDtl] = useState({});
  //const [validationMsg, setValidationMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [product_image, setProduct_image] = useState("");

  const [smShow, setSmShow] = useState(false);
  const [show, setShow] = useState(false);

  const [products, setProducts] = useState([]);
  const history = useHistory();
  const [orderDetails, setorderDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [editProduct, setEditProduct] = useState({});

  const [networkError, setNetworkError] = useState("");
  const [masterCategory, setMasterCategory] = useState([]);
  const [masterSubCategory, setMasterSubCategory] = useState([]);
  const [p_categorydrp, setp_categorydrp] = useState("");
  const [p_subcategorydrp, setp_subcategorydrp] = useState("");
  //const [dataUri, setDataUri] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [ownerNotes, setownerNotes] = useState("");
  const [flag, setFlag] = useState(false);
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };

  const onChange_image = async (e) => {
    setSuccessMsg("Please wait");
    setSmShow(true);
    const file = e.target.files[0];
    console.log("file", e.target.files[0]);
    if (file.size < 1000000) {
      console.log("add products", file);
      const path = config.storage + "/products";
      const storageRef = firebase.storage().ref(path);
      const fileRef = storageRef.child(editProduct.p_id);
      await fileRef.put(file);
      setProduct_image(await fileRef.getDownloadURL());
      console.log("add products", product_image);
      setSmShow(false);
      setSuccessMsg("");
    } else {
      setSuccessMsg("Please upload file less than 1 mb");
    }
  };

  const getAdminOrderHistory = async (e) => {
    await fetch(config.service_url + "getAdminOrderHistory", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("regitered user", data);
        if (data.status === 200) {
          // setSuccessMsg(data.message);
          setorderDetails(data.data);
          // handleVisible();
        } else if (data.status === 500) {
          setSuccessMsg(data.message);
          handleVisible();
        } else if (data.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
          handleVisible();
          history.push("/");
        }
      })
      .catch((err) => {
        setSuccessMsg("Something went wrong, Please try again later!!");
        // alert(err);
        handleVisible();
      });
  };

  const getOrderedUserDetails = async (userid) => {
    setEditProduct({});
    if (userid !== userDetails[0]?.userid) {
      setUserDetails([]);
      await fetch(config.service_url + "getUserProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: userid }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("regitered user", data);
          if (data.status === 200) {
            // setSuccessMsg(data.message);
            setUserDetails(data.data);
            // handleVisible();
          } else {
            setUserDetails([]);
            // handleVisible();
          }
        })
        .catch((err) => {
          setSuccessMsg("Something went wrong, Please try again later!!");
          // alert(err);
          handleVisible();
        });
    }
  };

  const getProductDetails = async () => {
    console.log("cakecategory", props);
    await fetch(config.service_url + "getproducts")
      .then((response) => response.json())
      .then((data) => {
        if (props.location.category) {
          let selective = data
            .filter((filter) => filter.p_category === props.location.category && filter.isactive === "1")
            .map((data) => {
              return data;
            });
          setProducts(selective);
          console.log(selective, "selective");
        } else {
          let active = data
            //.filter((filter) => filter.isactive === "1")
            .map((data) => {
              return data;
            });
          setProducts(active);
          console.log(data, "products");
        }
      })
      .catch((err) => {
        //setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  const deleteProduct = (id) => {
    console.log(id);
    fetch(config.service_url + "deleteProduct", {
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
          getProductDetails();
        } else if (data.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
          handleVisible();
        }
      })
      .catch((err) => {
        //setNetworkError("Something went wrong, Please try again later!!");
        //console.log(networkError);
      });
  };
  const activateDeactivateProduct = (pid, id) => {
    console.log(id);
    fetch(config.service_url + "updateproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ data: { p_id: pid, isactive: id } }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(JSON.stringify({ data: { p_id: pid, isactive: id } }));
          setSuccessMsg(data.message);
          handleVisible();
          getProductDetails();
        } else if (data?.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
          handleVisible();
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };

  const CancelOrder = async (orderid, productid, value, type) => {
    console.log(value);
    const specificOrder = orderDetails
      ?.filter((order) => order.orderid === orderid)
      .map((selOrder) => {
        selOrder?.products.map((prod) => {
          if (prod.p_id === productid) {
            if (type === "p_return") prod.p_order_status = "Returned";
            else prod.p_order_status = "Cancelled";
          }
          return prod;
        });
        return selOrder;
      });
    delete specificOrder[0].orderdate;
    specificOrder[0].grosstotal = value;
    specificOrder[0].updateddate = new Date();
    console.log("cancel order", specificOrder[0]);
    await fetch(config.service_url + "updateorder", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ id: orderid, data: specificOrder[0] }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setSuccessMsg(data.message);
          handleVisible();
          getAdminOrderHistory();
        } else if (data?.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
          handleVisible();
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };
  const CancelWholeOrder = async (orderid, value) => {
    const specificOrder = orderDetails;
    console.log(value);
    delete specificOrder[0].orderdate;
    specificOrder[0].updateddate = new Date();
    //orderstatus
    if (value === "w_return") specificOrder[0].orderstatus = "Returned";
    else if (value === "w_completed") specificOrder[0].orderstatus = "Completed";
    else if (value === "w_cancel") specificOrder[0].orderstatus = "Cancelled";
    //deliverystatus
    else if (value === "w_delivered") specificOrder[0].deliverystatus = "Delivered";
    else if (value === "w_pickup") specificOrder[0].deliverystatus = "Ready for Pick Up";
    else if (value === "w_shipped") specificOrder[0].deliverystatus = "Shipped";
    else if (value === "w_inprogress") specificOrder[0].deliverystatus = "InProgress";
    //paymentstatus
    else if (value === "pay_received") specificOrder[0].paymentstatus = "Received";
    else if (value === "pay_partial") specificOrder[0].paymentstatus = "Partially Received";
    else if (value === "pay_notreceived") specificOrder[0].paymentstatus = "Not Received";
    //paymentmethod
    else if (value === "paymode_cash") specificOrder[0].paymentmethod = "Cash";
    else if (value === "paymode_online") specificOrder[0].paymentmethod = "Online";
    //owener notes
    else if (value === "ownernotes") specificOrder[0].ownernotes = ownerNotes;
    console.log("cancel whole order", specificOrder[0]);
    delete specificOrder[0].grosstotal;
    //delete specificOrder[0].products; // check and addd this code
    await fetch(config.service_url + "updateorder", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ id: orderid, data: specificOrder[0] }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setSuccessMsg(data.message);
          handleVisible();
          getAdminOrderHistory();
        } else if (data?.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
          handleVisible();
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        //console.log(networkError);
      });
  };
  const getCategories = async () => {
    await fetch(config.service_url + "getcategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("master category", data);
          let _filterData = data.data.filter((_d) => _d.type === "product");
          setMasterCategory(_filterData);
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
          let _filterData = data.data.filter((_d) => _d.type === "product");
          console.log("master sub category", data);
          setMasterSubCategory(_filterData);
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

  useEffect(() => {
    getCategories();
    getSubCategories();
    getProductDetails();
    getAdminOrderHistory();
    // console.log("mobile view", isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  // const uploadimage = () => {
  //   service to upload setProduct_image
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {} });
  const onSubmit = (data, e) => {
    let methodname = "products";
    setSuccessMsg("Please wait");
    setSmShow(true);
    e.preventDefault();
    if (localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null) {
      history.push("/");
    } else if (Object.keys(editProduct).length > 0) {
      data.p_id = editProduct.p_id;
      // data.createddate = new Date();
      // data.createduserid = localStorage.getItem("uuid");
      // data.createdby = localStorage.getItem("name");
      console.log("update before", data);
      data.isactive = "1";
      data.p_updateddate = new Date();
      methodname = "updateproduct";
      data.p_name = data.p_name !== "" ? data.p_name : editProduct.p_name;
      data.p_category = data.p_category !== "" ? data.p_category : editProduct.p_category;
      data.p_subcategory = data.p_subcategory !== "" ? data.p_subcategory : editProduct.p_subcategory;
      data.p_quantity = data.p_quantity !== "" ? data.p_quantity : editProduct.p_quantity;
      data.p_description = data.p_description !== "" ? data.p_description : editProduct.p_description;
      if (data.p_price === "" || data.p_price <= 0 || data.p_price === "0") {
        if (editProduct.p_price === "" || editProduct.p_price <= 0 || editProduct.p_price === "0") {
          data.p_price = data.p_actual_price;
        } else {
          data.p_price = editProduct.p_price;
        }
      }

      data.p_image = product_image;
      data.p_actual_price = data.p_actual_price !== "" ? data.p_actual_price : editProduct.p_actual_price;
    } else {
      data.p_id = uuid();
      data.createddate = new Date();
      data.createduserid = localStorage.getItem("uuid");
      data.createdby = localStorage.getItem("name");
      //data.p_category = p_categorydrp;
      //data.p_subcategory = p_subcategorydrp;
      data.isactive = "1";
      data.p_updateddate = new Date();
      data.p_image = product_image;
      data.p_price = data.p_price === "" || data.p_price <= 0 ? data.p_actual_price : data.p_price;
    }
    console.log("add products", data);
    fetch(config.service_url + methodname, { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("regitered user", data);
        if (data.status === 200) {
          e.target.reset();
          reset({ p_name: "" });
          setEditProduct({});
          setSuccessMsg(data.message);
          setSmShow(false);
          handleVisible();
          // document.getElementById("p_category").value = "";
          // document.getElementById("p_subcategory").value = "";
          setp_categorydrp("");
          setp_subcategorydrp("");
          setProduct_image("");
          setFlag(true);
        } else if (data?.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
        }
      })
      .catch((err) => {
        setSuccessMsg("Something went wrong, Please try again later!!");
      });
  };

  const editData = (e, product) => {
    setFlag(false);
    setEditProduct({});
    document.getElementById("frmProductadd").reset();
    setShow((show) => !show);
    setEditProduct(product);
    setp_categorydrp(product.p_category);
    setp_subcategorydrp(product.p_subcategory);
  };

  const { p_name, p_actual_price, p_price, p_quantity, p_description } = Object.keys(editProduct).length > 0 ? editProduct : {};
  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{successMsg}</Modal.Header>
      </Modal>
      <Header />
      <div className="page-content bg-white">
        <div className="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + img1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Admin</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>
                      <i className="fa fa-home"></i>
                    </Link>
                  </li>
                  <li>Admin Management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full content-inner-1 bg-gray-light">
            <div className="container woo-entry">
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <div className="dlab-tabs product-description p-3 tabs-site-button m-t30">
                      <ul className="nav nav-tabs">
                        <li>
                          <Link className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-review">
                            Add Product ({products.length > 0 ? products.length : 0})
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#admin-mange-orders">
                            Manage Orders ({orderDetails.length > 0 ? orderDetails.length : 0})
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" id="pills-post-tab" data-bs-toggle="pill" data-bs-target="#pills-blogpost">
                            Manage Blog/Course
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" id="pills-post-tab" data-bs-toggle="pill" data-bs-target="#pills-gallery">
                            Manage Gallery
                          </Link>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane" id="admin-mange-orders">
                          <div>
                            {orderDetails &&
                              orderDetails?.map((dtl, index) => {
                                return (
                                  <div className="tab-content mb-1">
                                    <div className="row">
                                      <div className="p-1 col bg-light rounded border">
                                        <b>Customer :</b> {dtl.shippingaddress && dtl.shippingaddress.name + ", " + dtl.shippingaddress.address + ", " + dtl.shippingaddress.city + ", " + dtl.shippingaddress.state + ", " + dtl.shippingaddress.pincode + ". Phone:" + dtl.shippingaddress.phonenumber}{" "}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="p-1  m-1 col border rounded">
                                        <b>Order Date :</b> {Moment(dtl.orderdate).format("DD-MMM-YYYY hh:mm A")}
                                      </div>

                                      <div className="p-1  m-1 col border rounded">
                                        <div className="d-flex ">
                                          <div>
                                            <b>Order Status:</b>
                                            <b className={dtl.orderstatus === "Completed" ? "text-success" : "text-warning"}> {dtl.orderstatus} </b>
                                          </div>
                                          <div className="px-1">
                                            <div className="dropdown dropcenter">
                                              <button className="btn btn-secondary dropdown-toggle p-1" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                              <div className="dropdown-menu px-3" aria-labelledby="dropdownMenu2">
                                                <button className="p-1 m-1 btn bg-success dropdown-item " onClick={(e) => CancelWholeOrder(dtl.orderid, "w_completed")}>
                                                  Complete
                                                </button>
                                                <button className="p-1 m-1 btn text-dark bg-warning dropdown-item " onClick={(e) => CancelWholeOrder(dtl.orderid, "w_cancel")}>
                                                  Cancel
                                                </button>{" "}
                                                <button className="p-1 m-1 btn bg-secondary dropdown-item" onClick={(e) => CancelWholeOrder(dtl.orderid, "w_return")}>
                                                  Return
                                                </button>{" "}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="p-1  m-1 col border rounded">
                                        <div className="d-flex ">
                                          <div>
                                            <b>Delivery Status:</b> {dtl.deliverystatus}{" "}
                                          </div>
                                          <div>
                                            <div className="px-1">
                                              <div className="dropdown dropcenter">
                                                <button className="btn btn-secondary dropdown-toggle p-1" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                <div className="dropdown-menu px-3" aria-labelledby="dropdownMenu2">
                                                  <button className="p-1 m-1 btn bg-success dropdown-item " onClick={(e) => CancelWholeOrder(dtl.orderid, "w_delivered")}>
                                                    Delivered
                                                  </button>
                                                  <button className="p-1 m-1 btn text-dark bg-warning dropdown-item " onClick={(e) => CancelWholeOrder(dtl.orderid, "w_inprogress")}>
                                                    In Progress
                                                  </button>
                                                  <button className="p-1 m-1 btn bg-primary dropdown-item " onClick={(e) => CancelWholeOrder(dtl.orderid, "w_pickup")}>
                                                    Pick up
                                                  </button>
                                                  <button className="p-1 m-1 btn bg-info dropdown-item " onClick={(e) => CancelWholeOrder(dtl.orderid, "w_shipped")}>
                                                    Shipped
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="p-1   m-1 col border rounded">
                                        <b>User Notes :</b> {dtl.usernotes}{" "}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="p-1 m-1 col border rounded">
                                        <div className="d-flex">
                                          <div>
                                            <b>Payment Method:</b> {dtl.paymentmethod}{" "}
                                          </div>

                                          <div>
                                            <div className="px-1">
                                              <div className="dropdown dropcenter">
                                                <button className="btn btn-secondary dropdown-toggle p-1" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                <div className="dropdown-menu px-3" aria-labelledby="dropdownMenu2">
                                                  <button className="p-1 m-1 btn bg-success dropdown-item " onClick={(e) => CancelWholeOrder(dtl.orderid, "paymode_cash")}>
                                                    Cash
                                                  </button>{" "}
                                                  <button className="p-1 m-1 btn text-dark bg-warning dropdown-item " onClick={(e) => CancelWholeOrder(dtl.orderid, "paymode_online")}>
                                                    Online
                                                  </button>{" "}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="p-1  m-1 col border rounded">
                                        <div className="d-flex">
                                          <div>
                                            <b>Payment Status:</b> {dtl.paymentstatus}
                                          </div>
                                          <div>
                                            <div>
                                              <div className="px-1">
                                                <div className="dropdown dropcenter">
                                                  <button className="btn btn-secondary dropdown-toggle p-1" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                  <div className="dropdown-menu px-3" aria-labelledby="dropdownMenu2">
                                                    <button className="p-1 m-1 btn  bg-success dropdown-item" onClick={(e) => CancelWholeOrder(dtl.orderid, "pay_received")}>
                                                      Received
                                                    </button>
                                                    <button className="p-1 m-1 text-dark btn bg-warning dropdown-item" onClick={(e) => CancelWholeOrder(dtl.orderid, "pay_partial")}>
                                                      Partially
                                                    </button>
                                                    <button className="p-1 m-1 btn bg-primary dropdown-item" onClick={(e) => CancelWholeOrder(dtl.orderid, "pay_notreceived")}>
                                                      NotReceived
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="p-1  m-1 col border rounded">
                                        <b>Gross Total :</b> <i class="fa fa-inr"></i> {dtl.grosstotal}
                                      </div>
                                      <div className="p-1   m-1 col border rounded">
                                        <div className="d-flex">
                                          <div>
                                            <b>Owner Notes :</b>
                                          </div>
                                          <div>
                                            <div>
                                              <div className="px-1">
                                                <div className="dropdown dropleft">
                                                  <button className="btn btn-secondary dropdown-toggle p-1" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                  <div className="dropdown-menu px-3" aria-labelledby="dropdownMenu2">
                                                    <textarea type="textarea" rows="3" defaultValue={dtl.ownernotes} className="form-control w-100" placeholder="Owner Notes" onChange={(e) => setownerNotes(e.target.value)}></textarea>
                                                    <button className="p-1 m-1 btn text-dark bg-warning  dropdown-item" onClick={(e) => CancelWholeOrder(dtl.orderid, "ownernotes")}>
                                                      Update
                                                    </button>{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {dtl.ownernotes}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row accordion p-1  rounded" id="accordionproduct">
                                      <div class="accordion-item1">
                                        <p class="accordion-header" id={"headingOne" + index}>
                                          <button class=" p-1 btn btnhover collapsed" type="button" onClick={(e) => getOrderedUserDetails(dtl.userid)} data-bs-toggle="collapse" data-bs-target={"#collapseOne" + index} aria-expanded="false" aria-controls={"#collapseOne" + index}>
                                            View all Products
                                          </button>
                                        </p>
                                        <div id={"collapseOne" + index} class="accordion-collapse collapse" aria-labelledby={"headingOne" + index} data-bs-parent="#accordionproduct">
                                          <div class="accordion-body">
                                            {/* <div> */}
                                            {userDetails?.map((user) => {
                                              return (
                                                <>
                                                  <b> {user.name} </b>
                                                  <span>
                                                    {user.address + ", " + user.city + ", " + user.state + ", " + user.pincode + "(Phone: " + user.phonenumber + ")"}, {} <br></br>
                                                  </span>

                                                  <span> {user.email} </span>
                                                </>
                                              );
                                            })}
                                            {/* </div> */}
                                            {dtl.products?.map((productDtl) => {
                                              return (
                                                <div>
                                                  <div className="content-block">
                                                    <div className="section-full py-3">
                                                      <div>
                                                        <div className="row">
                                                          <div className="col-lg-3 ">
                                                            {/* <Link to={{ pathname: `/shop-product-details/${productDtl.p_id}` }}></Link> */}
                                                            <img className="mediumimage" src={productDtl.p_image} alt="" />
                                                          </div>
                                                          <div className="col-lg-9">
                                                            <div className="row">
                                                              <div className="col">
                                                                <div className="mb-2">
                                                                  <Link to={{ pathname: `/shop-product-details/${productDtl.p_id}` }}>{productDtl.p_name}</Link>
                                                                </div>
                                                                <div className="mb-2 text-nowrap">
                                                                  Price per Unit: <i class="fa fa-inr"></i> {productDtl.p_price} | Qty: {productDtl.p_quantity}
                                                                </div>{" "}
                                                                <div>
                                                                  <b>
                                                                    Total:<i class="fa fa-inr"></i>
                                                                    {productDtl.p_quantity * productDtl.p_price}
                                                                  </b>
                                                                </div>
                                                              </div>
                                                              <div className="col">
                                                                <div className="mt-2">
                                                                  Status:
                                                                  <b className="text-warning"> {productDtl.p_order_status}</b>
                                                                </div>
                                                                <div>
                                                                  <button className="p-1 m-1 btn text-dark bg-warning" disabled={productDtl.p_order_status === "Cancelled" || productDtl.p_order_status === "Returned" ? true : false} onClick={(e) => CancelOrder(dtl.orderid, productDtl.p_id, dtl.grosstotal - productDtl.p_quantity * productDtl.p_price, "p_cancel")}>
                                                                    Cancel
                                                                  </button>{" "}
                                                                  <button className="p-1 m-1 btn bg-secondary" disabled={productDtl.p_order_status === "Cancelled" || productDtl.p_order_status === "Returned" ? true : false} onClick={(e) => CancelOrder(dtl.orderid, productDtl.p_id, dtl.grosstotal, "p_return")}>
                                                                    Return
                                                                  </button>{" "}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        <div className="tab-pane " id="pills-dashboard">
                          <Chart chartData={orderDetails}></Chart>
                        </div>
                        <div className="tab-pane active" id="pills-review">
                          <div id="review_form_wrapper">
                            <div className={!show ? "" : "d-none"} id="review_form">
                              <button className="btn my-2" onClick={(e) => setShow((show) => !show)}>
                                View all Products
                              </button>
                              <div id="respond" className="comment-respond">
                                <h3 className="comment-reply-title" id="reply-title">
                                  Add a Product
                                </h3>

                                <form className="comment-form" onSubmit={handleSubmit(onSubmit)} id="frmProductadd">
                                  <div className="comment-form-author">
                                    <label>
                                      Name <span className="required">*</span>
                                    </label>
                                    <input type="text" required aria-required="true" defaultValue={p_name} size="30" name="p_name" {...register("p_name")} id="p_name" />
                                    {/* {errors.p_name && "Product name is required"} */}
                                  </div>
                                  <div className="comment-form-author">
                                    <div className="row">
                                      <div className="col">
                                        {" "}
                                        <label>
                                          Category <span className="required">*</span>
                                        </label>
                                        <select value={p_categorydrp} className="form-control" id="p_category" {...register("p_category")} name="p_category" onChange={(e) => setp_categorydrp(e.target.value)}>
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
                                          Sub Category <span className="required">*</span>
                                        </label>
                                        <select value={p_subcategorydrp} className="p_subcategory" id="p_subcategory" {...register("p_subcategory")} className="form-control" onChange={(e) => setp_subcategorydrp(e.target.value)}>
                                          <option value={""}>{""}</option>
                                          {masterSubCategory.map((cat) => (
                                            <option value={cat.subcategory}>{cat.subcategory}</option>
                                          ))}
                                        </select>
                                        {/* <input type="text" defaultValue={p_subcategory} required aria-required="true" size="30" name="p_subcategory" {...register("p_subcategory")} id="p_subcategory" /> */}
                                        {/* {errors.p_subcategory && "Subcategory is required"} */}
                                      </div>
                                    </div>
                                  </div>
                                  {Object.keys(editProduct).length > 0 && (
                                    <div className="comment-form-author">
                                      <div className="row">
                                        <div className="col">
                                          <label>Upload Image (max. size 1 mb)</label>
                                          <input placeholder="Upload Product Image" name="p_image" onChange={onChange_image} accept="image/*" className="form-control" type="file" />
                                          {/* <input placeholder="Upload Product Image" name="p_image" onChange={onChange_image} type="file" {...register("p_image")} id="p_image" /> */}
                                        </div>
                                        <div className="col">
                                          <label>Image</label>
                                          <img className="smallimage" src={product_image} />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <div className="comment-form-author">
                                    <div className="row">
                                      <div className="col">
                                        {" "}
                                        <label>
                                          Actual Price <span className="required">*</span>
                                        </label>
                                        <input type="number" required aria-required="true" defaultValue={p_actual_price} size="30" name="p_actual_price" {...register("p_actual_price")} id="p_actual_price" />
                                        {/* {errors.p_price && "Price is required"} */}
                                      </div>
                                      <div className="col">
                                        {" "}
                                        <label>
                                          Price / Offer Price <span></span>
                                        </label>
                                        <input type="number" defaultValue={p_price} size="30" name="p_price" {...register("p_price")} id="p_price" />
                                        {/* {errors.p_price && "Price is required"} */}
                                      </div>
                                      <div className="col">
                                        {" "}
                                        <label className="text-nowrap">
                                          Avaliable Quantity <span className="required">*</span>
                                        </label>
                                        <input type="text" defaultValue={p_quantity} required aria-required="true" size="30" name="p_quantity" {...register("p_quantity")} id="p_quantity" />
                                        {/* {errors.p_quantity && "Available Quantity is required"} */}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="comment-form-comment">
                                    <label>
                                      Product Description <span className="required">*</span>{" "}
                                    </label>
                                    <input type="textarea" aria-required="true" defaultValue={p_description} rows="8" cols="45" required name="p_description" {...register("p_description")} id="p_description" />
                                    {/* {errors.p_description && "Product Description is required"} */}
                                  </div>

                                  <div className="form-submit">
                                    {Object.keys(editProduct).length === 0 && (
                                      <button type="submit" className="btn btnhover">
                                        Add Product
                                      </button>
                                    )}
                                    {Object.keys(editProduct).length > 0 && (
                                      <button className="btn btnhover" type="submit">
                                        Update Product
                                      </button>
                                    )}
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div id="product" className={show ? "table check-tbl" : "d-none"}>
                              <button
                                className="btn my-2"
                                onClick={(e) => {
                                  setEditProduct({});
                                  setShow((show) => !show);
                                  setProduct_image("");
                                  setFlag(false);
                                }}
                              >
                                Add Product
                              </button>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>Product name</th>
                                    <th>Category</th>
                                    <th>Actual Price</th>
                                    <th>Offer Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {products.length > 0
                                    ? products.map((product, key) => (
                                        <tr>
                                          <td className="product-item-img">
                                            <img className="smallimage" src={product.p_image} height="15" alt="" />
                                          </td>
                                          <td className="product-item-name">{product.p_name}</td>
                                          <td className="product-item-name">{product.p_category}</td>
                                          <td className="product-item-price">{product.p_actual_price}</td>
                                          <td className="product-item-price">{product.p_price}</td>
                                          <td className="product-item-quantity">{product.p_quantity}</td>

                                          <td>
                                            <Link className="btn py-1" onClick={(e) => (setProduct_image(product.p_image), editData(e, product))}>
                                              Edit
                                            </Link>{" "}
                                            <Link className={product.isactive === "1" ? "btn py-1" : "btn bg-danger py-1"} onClick={(e) => activateDeactivateProduct(product.p_id, product.isactive === "1" ? "0" : "1")}>
                                              {product.isactive === "1" ? "Deactivate" : "Activate"}
                                            </Link>
                                          </td>
                                          <td>
                                            <Link className="btn bg-danger py-1" onClick={(e) => deleteProduct(product.p_id)}>
                                              x
                                            </Link>
                                          </td>
                                        </tr>
                                      ))
                                    : "No Product added"}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="pills-blogpost">
                          <AdminManagePosts />
                        </div>
                        <div className="tab-pane" id="pills-gallery">
                          <AdminManageGallery />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Owl category={productDtl.p_category} /> */}
          <div class="section-full related-products content-inner bg-gray-light">
            <div class="container">
              <div class="products-carousel"></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
