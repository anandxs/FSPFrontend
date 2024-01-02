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
				className="bg-primary text-white p-1 text-xs sm:text-md font-semibold rounded-sm"
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
