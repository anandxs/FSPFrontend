import { useState } from "react";
import Modal from "../Modal/Modal";
import EditGroupModal from "./EditGroupModal";

const EditGroup = ({ params, init }) => {
	const [toggleEdit, setToggleEdit] = useState(false);

	const handleGroupToggle = () => {
		setToggleEdit(!toggleEdit);
	};

	return (
		<>
			<button
				className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
				onClick={handleGroupToggle}
			>
				Edit
			</button>
			{toggleEdit && (
				<Modal action={handleGroupToggle}>
					<EditGroupModal
						init={init}
						params={params}
						handleGroupToggle={handleGroupToggle}
					/>
				</Modal>
			)}
		</>
	);
};

export default EditGroup;
