import { useState } from "react";
import { customStyles } from "../utils/tableStyle";
import {
	useGetUsersQuery,
	useToggleUserAccountStatusMutation,
} from "../features/superadmin/superAdminApiSlice";
import DataTable from "react-data-table-component";

const Users = () => {
	const { data: users, isSuccess } = useGetUsersQuery();
	const [toggleUserAccountStatus] = useToggleUserAccountStatusMutation();

	const columns = [
		{
			name: "First Name",
			selector: (row) => row.firstName,
			sortable: true,
		},
		{
			name: "Last Name",
			selector: (row) => row.lastName,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.email,
			sortable: true,
			wrap: true,
		},
		{
			name: "Account Status",
			selector: (row) => row.isBlocked,
			sortable: true,
		},
		{
			name: "Block/Unblock",
			button: true,
			cell: (row) => {
				return (
					<button
						onClick={() => handleToggleBlock(row.id)}
						className="inline-block rounded bg-orange-600 px-3 py-1 text-xs font-medium text-gray-50 transition hover:shadow-xl focus:outline-none focus:ring active:bg-orange-600 disabled:opacity-50"
					>
						Toggle
					</button>
				);
			},
		},
	];

	const handleToggleBlock = (id) => {
		toggleUserAccountStatus({ userId: id }).unwrap();
	};

	const [filter, setFilter] = useState("");

	let data = [];
	if (isSuccess) {
		data = users
			.filter((u) => {
				if (filter === "blocked") {
					return u.isBlocked === true;
				} else if (filter === "active") {
					return u.isBlocked === false;
				} else {
					return u;
				}
			})
			.map((u) => {
				return {
					firstName: u.firstName,
					lastName: u.lastName,
					email: u.email,
					isBlocked: u.isBlocked ? "Blocked" : "Active",
					id: u.id,
				};
			});
	}

	const setQueryToActive = () => {
		setFilter("active");
	};

	const setQueryToBlocked = () => {
		setFilter("blocked");
	};

	const clearQuery = () => {
		setFilter("");
	};

	return (
		<div className="m-2 p-2">
			<div className="flex flex-wrap items-center justify-between mb-3">
				<h1 className="text-lg font-bold hover:underline">User Management</h1>
				<ul className="flex">
					<li
						onClick={setQueryToActive}
						className={`border border-black text-center text-xs w-16 sm:text-sm sm:w-20 ${
							filter === "active" ? "bg-indigo-950 text-gray-50" : "text-black"
						}`}
					>
						Active
					</li>
					<li
						onClick={setQueryToBlocked}
						className={`border border-black text-center text-xs w-16 sm:text-sm sm:w-20 ${
							filter === "blocked" ? "bg-indigo-950 text-gray-50" : "text-black"
						}`}
					>
						Blocked
					</li>
					<li
						onClick={clearQuery}
						className={`border border-black text-center text-xs w-16 sm:text-sm sm:w-20 ${
							filter === ""
								? "bg-indigo-950 text-gray-50 text-xs"
								: "text-black"
						}`}
					>
						All
					</li>
				</ul>
			</div>
			<DataTable
				customStyles={customStyles}
				columns={columns}
				data={data}
				pagination
			/>
		</div>
	);
};

export default Users;
