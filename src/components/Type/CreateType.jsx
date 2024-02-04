import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateTaskTypeModal from "./CreateTypeModal";

const CreateTaskType = () => {
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
				Create A Task Type
			</button>
			{toggleEdit && (
				<Modal action={handleToggle}>
					<CreateTaskTypeModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default CreateTaskType;
