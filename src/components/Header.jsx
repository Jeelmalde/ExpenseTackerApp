import {
	faCircleArrowDown,
	faCircleArrowUp,
	faIndianRupeeSign,
	faMoneyBillTrendUp,
	faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = ({ income, expense, balance, investment }) => {
	return (
		<div className="row mb-2">
			<div className="col-md-3 col-6 order-2">
				<div className="card shadow">
					<div className="card-body">
						<h1 className="display-4">
							<FontAwesomeIcon icon={faIndianRupeeSign} />
							{expense}
						</h1>
						<h3>
							<FontAwesomeIcon icon={faCircleArrowUp} color="red" /> Expense
						</h3>
					</div>
				</div>
			</div>
			<div className="col-md-3 col-12 mb-md-0 mb-3 order-md-3 order-1">
				<div className="card shadow">
					<div className="card-body">
						<h1 className="display-4">
							<FontAwesomeIcon icon={faIndianRupeeSign} />
							{balance}
						</h1>
						<h3>
							<FontAwesomeIcon icon={faWallet} color="brown" /> Balance
						</h3>
					</div>
				</div>
			</div>
			<div className="col-md-3 col-6 order-4">
				<div className="card shadow">
					<div className="card-body">
						<h1 className="display-4">
							<FontAwesomeIcon icon={faIndianRupeeSign} />
							{investment}
						</h1>
						<h3>
							<FontAwesomeIcon icon={faMoneyBillTrendUp} color="blue" />{" "}
							Investment
						</h3>
					</div>
				</div>
			</div>
			<div className="col-md-3 col-6 order-4">
				<div className="card shadow">
					<div className="card-body">
						<h1 className="display-4">
							<FontAwesomeIcon icon={faIndianRupeeSign} />
							{income}
						</h1>
						<h3>
							<FontAwesomeIcon icon={faCircleArrowDown} color="green" /> Income
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
