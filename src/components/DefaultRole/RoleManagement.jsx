import { useState } from "react";
import CreateRoleModal from "./CreateRoleModal";
import Modal from "../Modal/Modal";
import { useGetRolesQuery } from "../../features/defaultRole/defaultRoleApiSlice";
import Table from "../Table";
import DeleteRole from "./DeleteRole";

const RoleManagement = () => {
	const [toggleCreate, setToggleCreate] = useState(false);

	const { data, isLoading } = useGetRolesQuery();

	const handletoggleCreate = () => {
		setToggleCreate(!toggleCreate);
	};

	const columns = [
		{ key: "name", header: "Role" },
		{ key: "roleId", header: "Options" },
	];

	const deleteRole = (roleId) => {
		return <DeleteRole params={{ roleId }} />;
	};

	return (
		<section className="p-2">
			<div className="flex gap-5">
				<h2 className="text-xl font-bold">Set Default Project Roles</h2>
				<button
					onClick={handletoggleCreate}
					className="bg-primary text-white text-sm font-semibold px-2 py-1 rounded"
				>
					Add Role
				</button>
				{toggleCreate && (
					<Modal action={handletoggleCreate}>
						<CreateRoleModal handletoggleCreate={handletoggleCreate} />
					</Modal>
				)}
			</div>
			<div>
				{isLoading && <p>Loading...</p>}
				<Table data={data} columns={columns} deleteAction={deleteRole} />
			</div>
		</section>
	);
};

export default RoleManagement;
