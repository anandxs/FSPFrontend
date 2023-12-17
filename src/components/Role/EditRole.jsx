import { useState } from "react";
import Modal from "../Modal/Modal";
import EditRoleModal from "./EditRoleModal";

const EditRole = () => {
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
				Edit
			</button>
			{toggleEdit && (
				<Modal action={handleToggle}>
					<EditRoleModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default EditRole;
