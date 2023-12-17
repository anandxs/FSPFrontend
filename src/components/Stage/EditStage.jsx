import { useState } from "react";
import Modal from "../Modal/Modal";
import EditStageModal from "./EditStageModal";

const EditStage = () => {
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
					<EditStageModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default EditStage;
