import { useState } from "react";
import { useDeleteCardMutation } from "../../features/card/cardApiSlice";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";
import { useNavigate } from "react-router-dom";

const DeleteCard = ({ params }) => {
	const [toggleDelete, setToggleDelete] = useState(false);

	const [deleteCard] = useDeleteCardMutation();

	const navigate = useNavigate();

	const handleDelete = () => {
		const { projectId, groupId, cardId } = params;
		deleteCard({
			projectId,
			groupId,
			cardId,
		})
			.unwrap()
			.then(() => {
				navigate(`/projects/${projectId}/cards`);
			})
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

export default DeleteCard;
