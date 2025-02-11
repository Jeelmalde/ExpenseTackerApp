import { faCheck, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Style.css";
import { expenseIcons } from "./TransactionList";

const AddTransaction = ({ onAddTransaction, balance }) => {
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({
		id: new Date().getTime().toString(),
		amount: "",
		description: "",
		type: "",
		mode: balance <= 0 ? "income" : "expense",
	});
	const [showModal, setShowModal] = useState(false);

	const handleChange = e => {
		const { id, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		onAddTransaction(formData);
		setSuccess(true);
		setFormData({
			id: new Date().getTime().toString(),
			amount: "",
			description: "",
			type: "",
			mode: balance <= 0 ? "income" : "expense" || "investment",
			date: moment().format("MM-DD-YYYY"),
		});
		setTimeout(() => {
			setSuccess(false);
		}, 800);
		setShowModal(false);
		toast.success("Transaction Added");
	};

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	return (
		<div>
			<div className="text-center">
				<button
					className="btn btn-dark col-md-4 col-12 my-1"
					type="button"
					onClick={handleShowModal}
				>
					+ Add Transaction
				</button>
			</div>

			<div
				className={`modal fade ${showModal ? "show d-block" : ""}`}
				tabIndex="-1"
				style={{ display: showModal ? "block" : "none" }}
				aria-labelledby="addTransactionModalLabel"
				aria-hidden="true"
				onClick={handleCloseModal}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content" onClick={e => e.stopPropagation()}>
						<div className="modal-header">
							<h5 className="modal-title" id="addTransactionModalLabel">
								Add Transaction
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={handleCloseModal}
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="type" className="form-label">
										Type
									</label>
									<select
										className="form-select"
										id="mode"
										value={formData.mode}
										onChange={handleChange}
										required
									>
										<option value="" disabled>
											Select Type
										</option>
										<option
											key={"type1"}
											value={"expense"}
											disabled={balance <= 0}
										>
											Expense
										</option>
										<option key={"type2"} value={"income"}>
											Income
										</option>
										<option
											key={"type3"}
											value={"investment"}
											disabled={balance <= 0}
										>
											Investment
										</option>
									</select>
								</div>
								<div className="mb-3">
									<label htmlFor="date" className="form-label">
										Date
									</label>
									<input
										type="date"
										className="form-control"
										id="date"
										value={formData.date}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="amount" className="form-label">
										Amount
									</label>
									<input
										type="number"
										className="form-control"
										id="amount"
										max={
											formData.mode === "expense" ||
											formData.mode === "investment"
												? balance
												: Infinity
										}
										value={formData.amount}
										onChange={handleChange}
										required
									/>
								</div>

								<div className="mb-3">
									<label htmlFor="description" className="form-label">
										Description
									</label>
									<input
										type="text"
										className="form-control"
										id="description"
										value={formData.description}
										onChange={handleChange}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="type" className="form-label">
										Category
									</label>
									{formData.mode === "investment" ? (
										<select
											className="form-select"
											id="type"
											value={formData.type}
											onChange={handleChange}
											//	disabled={formData.mode === "income"}
											required
										>
											<option value="" disabled>
												Select Category
											</option>
											{Object.keys(expenseIcons)
												.filter(
													type =>
														formData.mode === "investment" &&
														type === "mutualfund"
												)
												.map(type => (
													<option key={type} value={type}>
														{type.charAt(0).toUpperCase() + type.slice(1)}
													</option>
												))}
										</select>
									) : (
										<select
											className="form-select"
											id="type"
											value={formData.type}
											onChange={handleChange}
											//disabled={formData.mode === "income"}
											required
										>
											<option value="" disabled>
												Select Category
											</option>
											{Object.keys(expenseIcons)
												.filter(type =>
													formData.mode === "expense"
														? !(
																formData.mode === "expense" &&
																type === "default"
														  )
														: formData.mode === "income" && type === "default"
												)
												.map(type => (
													<option key={type} value={type}>
														{type.charAt(0).toUpperCase() + type.slice(1)}
													</option>
												))}
										</select>
									)}
								</div>
								<div className="d-grid gap-2 d-md-flex justify-content-md-center">
									<button type="submit" className="btn btn-dark btn-md">
										<FontAwesomeIcon icon={faSave} /> Save
									</button>{" "}
									<button
										type="button"
										className="btn btn-dark ms-2"
										onClick={handleCloseModal}
									>
										<FontAwesomeIcon icon={faTimes} /> Cancel
									</button>
								</div>
								<span className={`ms-3 fade ${success ? "show" : ""}`}>
									<FontAwesomeIcon icon={faCheck} /> Transaction Added
									Successfully!
								</span>
							</form>
						</div>
					</div>
				</div>
			</div>
			{showModal && <div className="modal-backdrop fade show"></div>}
		</div>
	);
};

export default AddTransaction;
