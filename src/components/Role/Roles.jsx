import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";
import { createContext } from "react";
import { useParams } from "react-router";
import { useGetProjectRolesQuery } from "../../features/role/roleApiSlice";
import EditRole from "./EditRole";
import DeleteRole from "./DeleteRole";
import CreateRole from "./CreateRole";

export const RoleContext = createContext({
	projectId: null,
	roleId: null,
	init: null,
});

const Roles = () => {
	const { projectId } = useParams();

	const { data: roles, isSuccess } = useGetProjectRolesQuery({ projectId });
	let data;
	if (isSuccess) {
		data = roles.map((role) => ({
			id: role.roleId,
			name: role.name,
		}));
	}

	const columns = [
		{
			name: "Role",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Option",
			cell: (row) => {
				return (
					<div className="flex gap-2">
						<RoleContext.Provider
							value={{
								projectId,
								roleId: row.id,
								init: row.name,
							}}
						>
							<EditRole />
							<DeleteRole />
						</RoleContext.Provider>
					</div>
				);
			},
		},
	];

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold hover:underline mb-3">
					Project Roles
				</h2>
				<RoleContext.Provider value={{ projectId }}>
					<CreateRole />
				</RoleContext.Provider>
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

export default Roles;
