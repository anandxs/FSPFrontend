import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDeleteProjectMutation } from "../../features/project/projectApiSlice";
import { useNavigate } from "react-router-dom";
import Confirmation from "../Confirmation";
import Modal from "../Modal/Modal";

const DeleteProject = ({ params }) => {
	const [deleteToggle, setDeleteToggle] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [deleteProject] = useDeleteProjectMutation();

	const handleDelete = async () => {
		try {
			const { ownerId, projectId } = params;
			await deleteProject({ ownerId, projectId });
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteToggle = () => {
		setDeleteToggle(!deleteToggle);
	};

	return (
		<>
			<button
				className="bg-orange-500 text-white text-sm text-bold px-3 py-1 rounded"
				onClick={handleDeleteToggle}
			>
				Delete Project
			</button>
			{deleteToggle && (
				<Modal action={handleDeleteToggle}>
					<Confirmation success={handleDelete} cancel={handleDeleteToggle} />
				</Modal>
			)}
		</>
	);
};

export default DeleteProject;
