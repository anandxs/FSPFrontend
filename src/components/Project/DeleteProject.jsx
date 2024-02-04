import { useState } from "react";
import { useDeleteProjectMutation } from "../../features/project/projectApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Confirmation from "../Confirmation";
import Modal from "../Modal/Modal";

const DeleteProject = () => {
	const { projectId } = useParams();
	const [deleteToggle, setDeleteToggle] = useState(false);
	const navigate = useNavigate();
	const [deleteProject, { isLoading }] = useDeleteProjectMutation();

	const handleDelete = async () => {
		try {
			await deleteProject({ projectId }).unwrap();
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteToggle = () => {
		setDeleteToggle(!deleteToggle);
	};

	return (
		<button
			className="inline-block rounded bg-orange-600 px-5 py-2 text-xs font-medium text-white transition hover:shadow-xl focus:outline-none focus:ring active:bg-orange-500 disabled:opacity-50"
			onClick={handleDeleteToggle}
		>
			Delete
			{deleteToggle && (
				<Modal action={handleDeleteToggle}>
					<Confirmation
						isLoading={isLoading}
						success={handleDelete}
						cancel={handleDeleteToggle}
					/>
				</Modal>
			)}
		</button>
	);
};

export default DeleteProject;
