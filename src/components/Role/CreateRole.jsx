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
				className="bg-primary text-white p-1 text-xs sm:text-md font-semibold rounded-sm"
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
