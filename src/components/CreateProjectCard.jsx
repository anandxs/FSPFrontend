import CreateProjectModal from "./CreateProjectModal";
import { useState } from "react";

const CreateProjectCard = ({ message }) => {
	const [showModal, setShowModal] = useState(false);

	const handleCreate = () => {
		setShowModal((prevState) => !prevState);
	};

	return (
		<>
			<div
				className="bg-primary w-56 h-24 rounded pl-2 pt-2 mb-3"
				onClick={handleCreate}
			>
				<p className="text-white font-bold text-xl">{message}</p>
			</div>
			{showModal && <CreateProjectModal setShowModal={setShowModal} />}
		</>
	);
};

export default CreateProjectCard;
