import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";
import { useDeleteTaskMutation } from "../../features/task/taskApiSlice";

const DeleteTask = () => {
	const { projectId, taskId } = useParams();

	const [toggleDelete, setToggleDelete] = useState(false);

	const [deleteTaskAsync] = useDeleteTaskMutation();

	const navigate = useNavigate();
	const handleDelete = () => {
		deleteTaskAsync({ projectId, taskId })
			.unwrap()
			.then(() => {
				navigate(`/projects/${projectId}/tasks`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleToggle = () => {
		setToggleDelete(!toggleDelete);
	};

	return (
		<>
			<button
				className="bg-orange-500 text-white px-3 py-0.5 text-md rounded-sm"
				onClick={handleToggle}
			>
				Delete
			</button>
			{toggleDelete && (
				<Modal action={handleToggle}>
					<Confirmation success={handleDelete} cancel={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default DeleteTask;
