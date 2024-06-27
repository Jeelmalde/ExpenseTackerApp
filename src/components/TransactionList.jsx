// import {
// 	faBurger,
// 	faCar,
// 	faDollar,
// 	faEllipsisH,
// 	faFilm,
// 	faHeartbeat,
// 	faLightbulb,
// 	faShoppingBag,
// 	faTrash,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React from "react";
// import "./Style.css";

// const TransactionList = ({ transactions, deleteItem }) => {
// 	return (
// 		<>
// 			{transactions?.length ? (
// 				<ul className="list-group transactions shadow">
// 					{transactions.map(item => (
// 						<li
// 							key={item.id}
// 							className="list-group-item d-flex justify-content-between align-items-center"
// 						>
// 							{expenseIcons[item.type]}
// 							<div className="ms-3 me-auto">
// 								<div className="fw-bold">{item.description}</div>
// 								{item.amount}
// 							</div>
// 							{item.type !== "default" ? (
// 								<FontAwesomeIcon
// 									icon={faTrash}
// 									fontSize={24}
// 									cursor="pointer"
// 									onClick={() => deleteItem(item.id)}
// 								/>
// 							) : null}
// 						</li>
// 					))}
// 				</ul>
// 			) : (
// 				<div className="text-center text-italic no-record card shadow">
// 					No Transactions Yet
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default TransactionList;

// export const expenseIcons = {
// 	default: <FontAwesomeIcon icon={faDollar} fontSize={24} />,
// 	food: <FontAwesomeIcon icon={faBurger} fontSize={24} />,
// 	entertainment: <FontAwesomeIcon icon={faFilm} fontSize={24} />,
// 	transportation: <FontAwesomeIcon icon={faCar} fontSize={24} />,
// 	shopping: <FontAwesomeIcon icon={faShoppingBag} fontSize={24} />,
// 	health: <FontAwesomeIcon icon={faHeartbeat} fontSize={24} />,
// 	utilities: <FontAwesomeIcon icon={faLightbulb} fontSize={24} />,
// 	other: <FontAwesomeIcon icon={faEllipsisH} fontSize={24} />,
// };

import {
	faBurger,
	faCar,
	faDollar,
	faEdit,
	faEllipsisH,
	faFilm,
	faHeartbeat,
	faLightbulb,
	faMoneyBillTrendUp,
	faShoppingBag,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import EditTransaction from "./EditTransaction";
import "./Style.css";

const TransactionList = ({ transactions, deleteItem, editItem }) => {
	const [editTransaction, setEditTransaction] = useState(null);

	const handleEditClick = transaction => {
		setEditTransaction(transaction);
	};

	const handleEditSave = updatedTransaction => {
		editItem(updatedTransaction);
		setEditTransaction(null);
	};

	const handleEditCancel = () => {
		setEditTransaction(null);
	};

	//console.log(transactions);
	// const columns = [
	// 	{
	// 		title: "Date",
	// 		dataIndex: "date",
	// 		key: "date",
	// 		render: value => value || "-",
	// 	},
	// 	{
	// 		title: "Mode",
	// 		dataIndex: "mode",
	// 		key: "mode",
	// 		render: value => value || "-",
	// 	},
	// 	{
	// 		title: "Type",
	// 		dataIndex: "type",
	// 		key: "type",
	// 		render: value => expenseIcons[value] || "-",
	// 	},
	// 	{
	// 		title: "Amount",
	// 		dataIndex: "amount",
	// 		key: "amount",
	// 		render: value => value || "-",
	// 	},
	// 	{
	// 		title: "Description",
	// 		dataIndex: "description",
	// 		key: "description",
	// 		render: value => value || "-",
	// 	},

	// 	// {
	// 	// 	title: 'Action',
	// 	// 	key: 'action',
	// 	// 	render: (_, record) => (
	// 	// 		<Space size="middle">
	// 	// 			<a>Invite {record.name}</a>
	// 	// 			<a>Delete</a>
	// 	// 		</Space>
	// 	// 	),
	// 	// },
	// ];

	return (
		<>
			{transactions?.length ? (
				<ul className="list-group transactions shadow">
					{transactions.map(item => (
						<li
							key={item.id}
							className="list-group-item d-flex justify-content-between align-items-center"
						>
							{expenseIcons[item.type]}
							<div className="ms-3 me-auto">
								<div className="fw-bold">{item.description}</div>
								{item.amount}
							</div>
							<div>
								<FontAwesomeIcon
									icon={faEdit}
									fontSize={24}
									cursor="pointer"
									className="me-3"
									onClick={() => handleEditClick(item)}
								/>
								{item.type !== "default" ? (
									<FontAwesomeIcon
										icon={faTrash}
										fontSize={24}
										cursor="pointer"
										onClick={() => deleteItem(item.id)}
									/>
								) : null}
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className="text-center text-italic no-record card shadow">
					No Transactions Yet
				</div>
			)}

			{editTransaction && (
				<EditTransaction
					transaction={editTransaction}
					onSave={handleEditSave}
					onCancel={handleEditCancel}
				/>
			)}
		</>
	);
};

export default TransactionList;

export const expenseIcons = {
	default: <FontAwesomeIcon icon={faDollar} fontSize={24} />,
	food: <FontAwesomeIcon icon={faBurger} fontSize={24} />,
	entertainment: <FontAwesomeIcon icon={faFilm} fontSize={24} />,
	transportation: <FontAwesomeIcon icon={faCar} fontSize={24} />,
	shopping: <FontAwesomeIcon icon={faShoppingBag} fontSize={24} />,
	health: <FontAwesomeIcon icon={faHeartbeat} fontSize={24} />,
	utilities: <FontAwesomeIcon icon={faLightbulb} fontSize={24} />,
	other: <FontAwesomeIcon icon={faEllipsisH} fontSize={24} />,
	mutualfund: <FontAwesomeIcon icon={faMoneyBillTrendUp} fontSize={24} />,
};
