import DataTable from "react-data-table-component";
import {
	useGetUsersQuery,
	useToggleUserAccountStatusMutation,
} from "../features/superadmin/superAdminApiSlice";
import { useState } from "react";
import { customStyles } from "../utils/tableStyle";

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
			cell: (row, index, column, id) => {
				return (
					<button
						onClick={() => handleToggleBlock(row.id)}
						className="bg-orange-600 text-white px-2 py-1"
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
		<div className="col-span-10 p-4">
			<div className="flex justify-between items-center mb-2">
				<h1 className="text-2xl font-semibold hover:underline">
					User Management
				</h1>
				<ul className="flex p-0 text-xs">
					<li
						onClick={setQueryToActive}
						className={`border border-black py-1.5 px-1 w-20 text-center ${
							filter === "active" ? "bg-primary text-white" : "text-black"
						} font-bold`}
					>
						Active
					</li>
					<li
						onClick={setQueryToBlocked}
						className={`border border-black py-1.5 px-1 w-20 text-center ${
							filter === "blocked" ? "bg-primary text-white" : "text-black"
						} font-bold`}
					>
						Blocked
					</li>
					<li
						onClick={clearQuery}
						className={`border border-black py-1.5 px-1 w-20 text-center ${
							filter === "" ? "bg-primary text-white" : "text-black"
						} font-bold`}
					>
						All
					</li>
				</ul>
			</div>
			<DataTable
				customStyles={customStyles}
				pagination
				columns={columns}
				data={data}
			/>
		</div>
	);
};

export default Users;
