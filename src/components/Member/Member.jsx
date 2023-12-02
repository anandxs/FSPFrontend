import { useState } from "react";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";
import { useRemoveMemberMutation } from "../../features/member/memberApiSlice";

const Member = ({ member, handleToggle, params }) => {
	const [deleteToggle, setDeleteToggle] = useState(false);

	const [removeMember] = useRemoveMemberMutation();

	const handleDelete = () => {
		const { memberId, ownerId, projectId } = params;
		removeMember({
			memberId,
			ownerId,
			projectId,
		})
			.unwrap()
			.then(() => {
				handleDeleteToggle();
				handleToggle();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDeleteToggle = () => {
		setDeleteToggle(!deleteToggle);
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="bg-accent p-3 w-1/3 min-w-max"
		>
			<h1 className="text-2xl font-bold mb-2 py-1">
				{`${member?.user?.firstName} ${member?.user?.lastName}`}
			</h1>
			<p>
				Role : <span className="font-bold">{member?.projectRole?.name}</span>
			</p>
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
		</div>
	);
};

export default Member;
