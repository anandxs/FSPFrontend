import { useState } from "react";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";
import { useNavigate, useParams } from "react-router-dom";
import { useExitProjectMutation } from "../../features/member/memberApiSlice";

const ExitProject = () => {
	const { projectId } = useParams();
	const [exitProject] = useExitProjectMutation();

	const navigate = useNavigate();
	const handleExit = () => {
		exitProject({ projectId })
			.unwrap()
			.then(() => {
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [showModal, setShowModal] = useState(false);
	const handleToggle = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<button
				onClick={handleToggle}
				className="bg-orange-500 text-white text-sm text-bold px-3 py-1 rounded w-32"
			>
				Exit
			</button>
			{showModal && (
				<Modal action={handleToggle}>
					<Confirmation success={handleExit} cancel={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default ExitProject;
