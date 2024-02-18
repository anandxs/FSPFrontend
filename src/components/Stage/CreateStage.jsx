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
				className="inline-block rounded bg-indigo-950 px-5 py-2 text-xs font-medium text-gray-50 transition hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 disabled:opacity-50"
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
