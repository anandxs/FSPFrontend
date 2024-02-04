import { useState } from "react";
import { useRemoveMemberMutation } from "../../features/member/memberApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";

const RemoveMember = () => {
	const navigate = useNavigate();
	const [deleteToggle, setDeleteToggle] = useState(false);
	const { projectId, memberId } = useParams();

	const [removeMember, { isLoading }] = useRemoveMemberMutation();
	const handleDelete = async () => {
		try {
			await removeMember({
				projectId,
				memberId,
			}).unwrap();
			handleDeleteToggle();
			navigate(-1);
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
				onClick={handleDeleteToggle}
				className="inline-block rounded bg-orange-600 px-5 py-1 text-xs font-medium text-white transition hover:shadow-xl focus:outline-none focus:ring active:bg-orange-500 disabled:opacity-50"
			>
				Remove
			</button>
			{deleteToggle && (
				<Modal action={handleDeleteToggle}>
					<Confirmation
						isLoading={isLoading}
						success={handleDelete}
						cancel={handleDeleteToggle}
					/>
				</Modal>
			)}
		</>
	);
};

export default RemoveMember;
