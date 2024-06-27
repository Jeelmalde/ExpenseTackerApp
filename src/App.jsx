import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./App.css";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
	return (
		<div className="container">
			<header className="expense-tracker-header text-center ">
				<div className="header-content ">
					<FontAwesomeIcon icon={faWallet} size="3x" className="header-icon" />
					<h1 className="header-title">Expense Tracker</h1>
				</div>
			</header>
			<ExpenseTracker />
		</div>
	);
}

export default App;
