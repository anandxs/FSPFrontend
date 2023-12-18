import { useState } from "react";
import { useDeleteProjectMutation } from "../../features/project/projectApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Confirmation from "../Confirmation";
import Modal from "../Modal/Modal";

const DeleteProject = () => {
	const { projectId } = useParams();

	const [deleteToggle, setDeleteToggle] = useState(false);

	const navigate = useNavigate();

	const [deleteProject] = useDeleteProjectMutation();

	const handleDelete = () => {
		deleteProject({ projectId })
			.unwrap()
			.then(() => {
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDeleteToggle = () => {
		setDeleteToggle(!deleteToggle);
	};

	return (
		<>
			<button
				className="bg-orange-500 text-white text-sm text-bold px-3 py-1 rounded w-32"
				onClick={handleDeleteToggle}
			>
				Delete
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
