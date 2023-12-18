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
				className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
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
