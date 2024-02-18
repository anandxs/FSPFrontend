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
				className="bg-indigo-950 w-56 h-24 rounded pl-2 pt-2 mb-3 transition hover:shadow-2xl focus:outline-none focus:ring active:bg-indigo-500"
				onClick={handleProjectToggle}
			>
				<p className="text-gray-50 font-bold text-xl">{message}</p>
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
