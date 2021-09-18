import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";

class Accord extends Component {
  render() {
    return (
      <div className="dlab-accordion faq-style1">
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle className="panel" as={"div"} eventKey="0">
            <div className="acod-head">
              <h6 className="acod-title">
                <Link to={""} data-toggle="collapse" data-target="#collapse1" aria-expanded="true">
                  <i className="fa fa-cart-plus"></i> Where we are located?
                </Link>
              </h6>
            </div>
            <Accordion.Collapse eventKey="0">
              <div id="collapse1" className="acod-body collapse show" data-parent="#accordion001">
                <div className="acod-content">
                  <img src={require("./../../images/map.png")} alt="" />
                  <ul className="list-check mb-0 primary">
                    <li>
                      <Link to={""}>Bangalore</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Accordion.Collapse>
          </Accordion.Toggle>
          <Accordion.Toggle as={"div"} className="panel" eventKey="1">
            <div className="acod-head">
              <h6 className="acod-title">
                <Link to={""} data-toggle="collapse" data-target="#collapse2" className="collapsed" aria-expanded="false">
                  <i className="fa fa-address-book"></i> Join our course
                </Link>
              </h6>
            </div>

            <Accordion.Collapse eventKey="1">
              <div id="collapse2" className="acod-body" data-parent="#accordion001">
                <div className="acod-content">
                  <img src={require("./../../images/about/pic2.jpg")} className="alignleft radius-md" alt="" />
                  <p>Craft & Hobby Classes at TSALA STUDIO</p>
                </div>
              </div>
            </Accordion.Collapse>
          </Accordion.Toggle>
          <Accordion.Toggle className="panel" as={"div"} eventKey="2">
            <div className="acod-head">
              <h6 className="acod-title">
                <Link to={""} data-toggle="collapse" data-target="#collapse3" className="collapsed" aria-expanded="false">
                  <i className="fa fa-cc-discover"></i> Get your discount
                </Link>
              </h6>
            </div>
            <Accordion.Collapse eventKey="2">
              <div id="collapse2" className="acod-body" data-parent="#accordion001">
                <div className="acod-content">
                  <p>Contact us for more info</p>
                </div>
              </div>
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Accordion>
      </div>
    );
  }
}

export default Accord;
