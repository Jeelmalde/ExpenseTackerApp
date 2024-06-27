import React, { useEffect, useState } from "react";
import AddTransaction from "./AddTransaction";
import Header from "./Header";

import TransactionTable from "./TransactionTable";

const ExpenseTracker = () => {
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);
	const [investment, setInvestment] = useState(0);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem("transactions"));
		if (items?.length) setTransactions(items);
	}, []);

	useEffect(() => {
		if (transactions) {
			let totalExpense = 0;
			let totalIncome = 0;
			let totalInvestment = 0;

			transactions.forEach(item => {
				if (item.mode === "expense") {
					totalExpense += Number(item.amount);
				} else if (item.mode === "income") {
					totalIncome += Number(item.amount);
				} else if (item.mode === "investment") {
					totalInvestment += Number(item.amount);
				}
			});

			setExpense(totalExpense);
			setIncome(totalIncome);
			setInvestment(totalInvestment);
		}
	}, [transactions, setExpense, setIncome, setInvestment]);

	const onAddTransaction = formData => {
		let data = [formData, ...transactions];
		setTransactions(data);
		localStorage.setItem("transactions", JSON.stringify(data));
	};

	const deleteTransaction = id => {
		let newItems = transactions.filter(x => x.id !== id);
		setTransactions(newItems);
		localStorage.setItem("transactions", JSON.stringify(newItems));
	};

	const editItem = updatedTransaction => {
		setTransactions(prevTransactions => {
			const updatedTransactions = prevTransactions.map(transaction =>
				transaction.id === updatedTransaction.id
					? updatedTransaction
					: transaction
			);
			localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
			return updatedTransactions;
		});
	};

	return (
		<div className="container-fluid">
			<Header
				income={income}
				expense={expense}
				balance={income - (expense + investment)}
				investment={investment}
			/>
			{/* <TransactionList
				transactions={transactions}
				deleteItem={deleteTransaction}
				editItem={editItem}
			/> */}
			<AddTransaction
				onAddTransaction={onAddTransaction}
				balance={income - (expense + investment)}
			/>
			<TransactionTable
				transactions={transactions}
				deleteItem={deleteTransaction}
				editItem={editItem}
			/>
		</div>
	);
};

export default ExpenseTracker;
