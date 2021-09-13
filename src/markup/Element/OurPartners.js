import React, { Component } from 'react';
import logo1 from './../../images/logos/logo1.jpg';
import logo2 from './../../images/logos/logo2.jpg';
import logo3 from './../../images/logos/logo3.jpg';
import logo4 from './../../images/logos/logo4.jpg';
import logo5 from './../../images/logos/logo5.jpg';
import logo6 from './../../images/logos/logo6.jpg';


class OurPartners extends Component {
	render() {
		return (
			<div className="container ">

				<div className="row client-area1">
					<div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 m-b30">
						<div className="client-logo" data-name="Bakery">
							<img src={logo1} alt="" />
						</div>
					</div>
					<div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 m-b30">
						<div className="client-logo" data-name="Bakery">
							<img src={logo2} alt="" />
						</div>
					</div>
					<div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 m-b30">
						<div className="client-logo" data-name="Bakery">
							<img src={logo3} alt="" />
						</div>
					</div>
					<div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 m-b30">
						<div className="client-logo" data-name="Bakery">
							<img src={logo4} alt="" />
						</div>
					</div>
					<div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 m-b30">
						<div className="client-logo" data-name="Bakery">
							<img src={logo5} alt="" />
						</div>
					</div>
					<div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 m-b30">
						<div className="client-logo" data-name="Bakery">
							<img src={logo6} alt="" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default OurPartners;