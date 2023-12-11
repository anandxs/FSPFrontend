import { useState } from "react";
import { useDeleteProjectGroupMutation } from "../../features/group/groupApiSlice";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";

const DeleteGroup = ({ params }) => {
	const [toggleDelete, setToggleDelete] = useState(false);

	const [deleteGroup] = useDeleteProjectGroupMutation();

	const handleDelete = () => {
		const { groupId } = params;
		deleteGroup({
			groupId,
		})
			.unwrap()
			.then(() => {})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDeleteToggle = () => {
		setToggleDelete(!toggleDelete);
	};

	return (
		<>
			<button
				className="bg-orange-500 text-white px-3 py-0.5 text-sm rounded-sm"
				onClick={handleDeleteToggle}
			>
				Delete
			</button>
			{toggleDelete && (
				<Modal action={handleDeleteToggle}>
					<Confirmation success={handleDelete} cancel={handleDeleteToggle} />
				</Modal>
			)}
		</>
	);
};

export default DeleteGroup;
