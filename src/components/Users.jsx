import DataTable from "react-data-table-component";
import {
	useGetUsersQuery,
	useToggleUserAccountStatusMutation,
} from "../features/superadmin/superAdminApiSlice";

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

	const customStyles = {
		table: {
			style: {
				border: "1px solid",
				borderBottom: "0px solid",
			},
		},
		header: {
			style: {
				fontSize: "22px",
				minHeight: "56px",
				paddingLeft: "16px",
				paddingRight: "8px",
			},
		},
		headCells: {
			style: {
				color: "#fff",
				backgroundColor: "#0E61DD",
				fontSize: "0.7rem",
				fontWeight: "700",
			},
		},
		cells: {
			style: {
				backgroundColor: "#CFE1FC",
				borderBottom: "1px solid",
			},
		},
		pagination: {
			style: {
				color: "#000",
				border: "1px solid",
				borderTop: "0px solid",
				backgroundColor: "#CFE1FC",
			},
			pageButtonsStyle: {
				color: "#000",
			},
		},
	};

	const handleToggleBlock = (id) => {
		toggleUserAccountStatus({ userId: id }).unwrap();
	};

	let data = [];
	if (isSuccess) {
		data = users.map((u) => {
			return {
				firstName: u.firstName,
				lastName: u.lastName,
				email: u.email,
				isBlocked: u.isBlocked ? "Blocked" : "Active",
				id: u.id,
			};
		});
	}

	return (
		<div className="col-span-10 p-4">
			<h1 className="text-2xl py-2 font-semibold hover:underline">
				User Management
			</h1>
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
