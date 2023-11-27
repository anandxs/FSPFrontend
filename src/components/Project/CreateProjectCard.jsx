import CreateProjectModal from "./CreateProjectModal";
import { useState } from "react";
import Modal from "../Modal/Modal";

const CreateProjectCard = ({ message }) => {
	const [projectToggle, setProjectToggle] = useState(false);

	const handleProjectToggle = () => {
		setProjectToggle(!projectToggle);
	};

	return (
		<>
			<div
				className="bg-primary w-56 h-24 rounded pl-2 pt-2 mb-3"
				onClick={handleProjectToggle}
			>
				<p className="text-white font-bold text-xl">{message}</p>
			</div>
			{projectToggle && (
				<Modal action={handleProjectToggle}>
					<CreateProjectModal handleProjectToggle={handleProjectToggle} />
				</Modal>
			)}
		</>
	);
};

export default CreateProjectCard;
