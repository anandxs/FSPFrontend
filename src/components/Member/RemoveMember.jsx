import { useState } from "react";
import { useRemoveMemberMutation } from "../../features/member/memberApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";

const RemoveMember = () => {
	const [deleteToggle, setDeleteToggle] = useState(false);

	const navigate = useNavigate();

	const { projectId, memberId } = useParams();
	const [removeMember] = useRemoveMemberMutation();
	const handleDelete = () => {
		removeMember({
			projectId,
			memberId,
		})
			.unwrap()
			.then(() => {
				handleDeleteToggle();
				navigate(-1);
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
				onClick={handleDeleteToggle}
				className="bg-orange-500 text-white px-3 py-0.5 text-sm rounded-sm"
			>
				Remove
			</button>
			{deleteToggle && (
				<Modal action={handleDeleteToggle}>
					<Confirmation success={handleDelete} cancel={handleDeleteToggle} />
				</Modal>
			)}
		</>
	);
};

export default RemoveMember;
