import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateRoleModal from "./CreateRoleModal";

const CreateRole = () => {
	const [toggleEdit, setToggleEdit] = useState(false);

	const handleToggle = () => {
		setToggleEdit(!toggleEdit);
	};

	return (
		<>
			<button
				className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
				onClick={handleToggle}
			>
				Create Role
			</button>
			{toggleEdit && (
				<Modal action={handleToggle}>
					<CreateRoleModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default CreateRole;
