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
					row?.name.toUpperCase() !== "ADMIN" && (
						<div className="flex gap-2 items-center">
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
					)
				);
			},
		},
	];

	return (
		<div className="m-2 p-2">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-xs sm:text-lg font-bold hover:underline">
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
