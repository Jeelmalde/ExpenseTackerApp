import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { expenseIcons } from "./TransactionList";

const EditTransaction = ({ transaction, onSave, onCancel }) => {
	const [formData, setFormData] = useState({ ...transaction });

	const handleChange = e => {
		const { id, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		onSave(formData);
		toast.success("Transaction Added");
	};

	return (
		<div
			className={`modal fade show d-block`}
			tabIndex="-1"
			aria-labelledby="editTransactionModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="editTransactionModalLabel">
							Edit Transaction
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={onCancel}
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
										disabled={transaction.balance <= 0}
									>
										Expense
									</option>
									<option key={"type2"} value={"income"}>
										Income
									</option>
									<option key={"type3"} value={"investment"}>
										Investment
									</option>
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="amount" className="form-label">
									Amount
								</label>
								<input
									type="number"
									className="form-control"
									id="amount"
									value={formData.amount}
									onChange={handleChange}
									required
								/>
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
													? !(formData.mode === "expense" && type === "default")
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
								<button type="submit" className="btn btn-dark">
									<FontAwesomeIcon icon={faSave} /> Save
								</button>{" "}
								<button
									type="button"
									className="btn btn-dark ms-2"
									onClick={onCancel}
								>
									<FontAwesomeIcon icon={faTimes} /> Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditTransaction;
