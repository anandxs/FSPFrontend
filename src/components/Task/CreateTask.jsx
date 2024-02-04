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
				className="inline-block rounded bg-blue-600 px-5 py-2 text-xs font-medium text-white transition hover:shadow-xl focus:outline-none focus:ring active:bg-blue-500 disabled:opacity-50"
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
