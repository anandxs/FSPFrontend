import { useContext, useState } from "react";
import { useDeleteStageMutation } from "../../features/stage/stageApiSlice";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";
import { StageContext } from "./Stages";

const DeleteStage = () => {
	const [toggleDelete, setToggleDelete] = useState(false);

	const { projectId, stageId } = useContext(StageContext);

	const [deleteStageAsync] = useDeleteStageMutation();

	const handleDelete = () => {
		deleteStageAsync({
			projectId,
			stageId,
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

export default DeleteStage;
