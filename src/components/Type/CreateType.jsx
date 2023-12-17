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
				className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
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
