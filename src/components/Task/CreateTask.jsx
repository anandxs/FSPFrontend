import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateTaskModal from "./CreateTaskModal";

const CreateTask = () => {
	const [toggleEdit, setToggleEdit] = useState(false);

	const handleToggle = () => {
		setToggleEdit(!toggleEdit);
	};

	return (
		<>
			<button
				className="bg-primary text-white p-1 text-xs rounded-sm"
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

export default CreateTask;
