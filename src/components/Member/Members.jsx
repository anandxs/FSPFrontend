import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectMembersQuery } from "../../features/member/memberApiSlice";
import { customStyles } from "../../utils/tableStyle";
import AddMember from "./AddMember";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

const Members = () => {
	const { projectId } = useParams();
	const { data, isSuccess, isLoading, isError, error } =
		useGetProjectMembersQuery({
			projectId,
		});
	const { ownerId } = useSelector(selectCurrentProjectRole);

	const columns = [
		{
			name: "Name",
			selector: (row) =>
				`${row?.user?.firstName} ${row?.user?.lastName} ${
					ownerId === row?.user?.id ? "(Project Owner)" : ""
				}`,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.user.email,
			sortable: true,
		},
		{
			name: "Role",
			selector: (row) => row.role.name,
			sortable: true,
		},
	];

	const navigate = useNavigate();
	const goToMember = (member) => {
		if (ownerId !== member?.user?.id) {
			navigate(`${member.user.id}`);
		}
	};

	return (
		<div className="m-2 p-2">
			<div className="flex gap-2 justify-between items-center mb-3">
				<h1 className="text-xs sm:text-lg font-bold hover:underline">
					Members
				</h1>
				<AddMember />
			</div>
			<DataTable
				customStyles={customStyles}
				onRowClicked={goToMember}
				pointerOnHover
				pagination
				columns={columns}
				data={data}
			/>
		</div>
	);
};

export default Members;
