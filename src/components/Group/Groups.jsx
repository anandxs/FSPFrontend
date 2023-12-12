import DataTable from "react-data-table-component";
import { useGetProjectGroupsQuery } from "../../features/group/groupApiSlice";
import { useParams } from "react-router";
import { customStyles } from "../../utils/tableStyle";
import EditGroup from "./EditGroup";
import DeleteGroup from "./DeleteGroup";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

const Groups = () => {
	const { projectId } = useParams();

	const { data: groups, isSuccess } = useGetProjectGroupsQuery({ projectId });

	const { role } = useSelector(selectCurrentProjectRole);

	const columns = [
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Option",
			omit: role !== "ADMIN",
			cell: (row, index, column, id) => {
				return (
					<div className="flex gap-2">
						<EditGroup params={{ groupId: row.id }} init={row.name} />
						<DeleteGroup params={{ groupId: row.id }} />
					</div>
				);
			},
		},
	];

	let data;
	if (isSuccess) {
		data = groups.map((g) => ({
			id: g.groupId,
			name: g.name,
		}));
	}

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<h2 className="text-xl font-bold hover:underline">Project Groups</h2>
			<DataTable
				customStyles={customStyles}
				pagination
				columns={columns}
				data={data}
			/>
		</div>
	);
};

export default Groups;
