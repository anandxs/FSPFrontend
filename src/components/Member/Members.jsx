import { useParams } from "react-router-dom";
import { useGetProjectMembersQuery } from "../../features/member/memberApiSlice";
import AddMember from "./AddMember";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Member from "./Member";
import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";

const Members = () => {
	const { projectId } = useParams();

	const [toggle, setToggle] = useState(false);
	const [mId, setMId] = useState();

	const handleToggle = (m) => {
		setMId(m?.user?.id);
		setToggle(!toggle);
	};

	const { data, isLoading, isSuccess, isError, error } =
		useGetProjectMembersQuery({
			projectId,
		});

	console.log(data);

	const columns = [
		{
			name: "Name",
			selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.user.email,
			sortable: true,
		},
		{
			name: "Role",
			selector: (row) => row.role,
			sortable: true,
		},
	];

	let members;
	if (isSuccess) {
		members = data.map((m) => m);
	}

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<div className="mb-2 flex justify-between">
				<h1 className="text-xl font-bold hover:underline">Members</h1>
				<AddMember />
			</div>
			<DataTable
				customStyles={customStyles}
				pagination
				columns={columns}
				data={members}
			/>
		</div>
	);
};

export default Members;
