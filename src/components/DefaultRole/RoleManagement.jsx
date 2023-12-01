import { useState } from "react";
import CreateRoleModal from "./CreateRoleModal";
import Modal from "../Modal/Modal";
import { useGetRolesQuery } from "../../features/defaultRole/defaultRoleApiSlice";

const RoleManagement = () => {
	const [toggleCreate, setToggleCreate] = useState(false);

	const { data, isLoading } = useGetRolesQuery();

	const handletoggleCreate = () => {
		setToggleCreate(!toggleCreate);
	};

	return (
		<section className="p-2 flex">
			<div className="flex gap-5">
				<h1 className="text-2xl font-bold">Set Default Project Roles</h1>
				<button
					onClick={handletoggleCreate}
					className="bg-primary text-white font-semibold px-2 py-1 rounded"
				>
					Add Role
				</button>
				{toggleCreate && (
					<Modal action={handletoggleCreate}>
						<CreateRoleModal handletoggleCreate={handletoggleCreate} />
					</Modal>
				)}
			</div>
			<div></div>
		</section>
	);
};

export default RoleManagement;
