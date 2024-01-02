import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateStageModal from "../../components/Stage/CreateStageModal";

const CreateStage = () => {
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
				Create Stage
			</button>
			{toggleEdit && (
				<Modal action={handleToggle}>
					<CreateStageModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default CreateStage;
