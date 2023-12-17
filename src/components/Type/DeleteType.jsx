import { useContext, useState } from "react";
import { useDeleteTaskTypeMutation } from "../../features/taskType/taskTypeApiSlice";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";
import { TypeContext } from "./Types";

const DeleteType = () => {
	const [toggleDelete, setToggleDelete] = useState(false);

	const { projectId, typeId } = useContext(TypeContext);

	const [deleteTaskTypeAsync] = useDeleteTaskTypeMutation();

	const handleDelete = () => {
		deleteTaskTypeAsync({
			projectId,
			typeId,
		})
			.unwrap()
			.then(() => {
				// success logic
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
				className="bg-orange-500 text-white px-3 py-0.5 text-sm rounded-sm"
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

export default DeleteType;
