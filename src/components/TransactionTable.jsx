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
import { Space, Table } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EditTransaction from "./EditTransaction";
import "./Style.css";

const TransactionTable = ({ transactions, deleteItem, editItem }) => {
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

	const handleToast = () => {
		toast.error("Cannot delete the income");
	};

	const date = Array.from(new Set(transactions.map(item => item.date)));

	const dateFilters = date.map(date => ({
		text: date,
		value: date,
	}));

	const mode = Array.from(new Set(transactions.map(item => item.mode)));

	const modeFilters = mode.map(mode => ({
		text: mode,
		value: mode,
	}));

	const type = Array.from(new Set(transactions.map(item => item.type)));

	const typeFilters = type.map(type => ({
		text: expenseIcons[type],
		value: type,
	}));

	const columns = [
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: value => value || "-",
			filters: dateFilters,
			onFilter: (value, record) => record.date.startsWith(value),
			filterSearch: true,
		},
		{
			title: "Mode",
			dataIndex: "mode",
			key: "mode",
			render: value => value || "-",
			filters: modeFilters,
			onFilter: (value, record) => record.mode.startsWith(value),
			filterSearch: true,
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			render: value => (
				<>
					{expenseIcons[value]} {value.charAt(0).toUpperCase() + value.slice(1)}
				</>
			),
			filters: typeFilters,
			onFilter: (value, record) => record.type.startsWith(value),
			filterSearch: true,
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			render: value => value || "-",
			sorter: (a, b) => a.amount - b.amount,
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			render: value => value || "-",
		},

		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<FontAwesomeIcon
						icon={faEdit}
						fontSize={20}
						cursor="pointer"
						className="me-3"
						onClick={() => handleEditClick(record)}
					/>
					{record.type !== "default" ? (
						<FontAwesomeIcon
							icon={faTrash}
							fontSize={20}
							cursor="pointer"
							onClick={() => deleteItem(record.id)}
						/>
					) : (
						<FontAwesomeIcon
							icon={faTrash}
							fontSize={20}
							cursor="pointer"
							onClick={() => handleToast()}
						/>
					)}
				</Space>
			),
		},
	];

	return (
		<>
			<Table
				dataSource={transactions}
				columns={columns}
				rowKey={transactions => transactions?.id}
				pagination={false}
				bordered
				scroll={{
					y: 350,
				}}
			/>
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

export default TransactionTable;

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
