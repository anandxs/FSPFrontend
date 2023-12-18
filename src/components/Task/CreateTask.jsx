import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateTaskModal from "./CreateTaskModal";

const CreateStage = () => {
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
				Create A Task
			</button>
			{toggleEdit && (
				<Modal action={handleToggle}>
					<CreateTaskModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default CreateStage;
