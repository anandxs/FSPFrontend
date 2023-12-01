import { useState } from "react";
import Modal from "../Modal/Modal";
import EditRoleModal from "./EditRoleModal";

const EditRole = ({ params }) => {
	const [toggleEdit, setToggleEdit] = useState(false);

	const handleEditToggle = () => {
		setToggleEdit(!toggleEdit);
	};

	return (
		<>
			<button
				className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
				onClick={handleEditToggle}
			>
				Edit
			</button>
			{toggleEdit && (
				<Modal action={handleEditToggle}>
					<EditRoleModal
						init={"hi"}
						params={{ roleId: params.roleId }}
						handleEditToggle={handleEditToggle}
					/>
				</Modal>
			)}
		</>
	);
};

export default EditRole;
