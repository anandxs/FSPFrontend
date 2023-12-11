import { useAssignCardToMemberMutation } from "../../features/cardMember/cardMemberApiSlice";

const AddCardMember = ({ projectId, cardId, assigneeId }) => {
	const [assignMember] = useAssignCardToMemberMutation();

	const handleClick = () => {
		assignMember({ projectId, cardId, assigneeId }).unwrap();
	};

	return (
		<button
			onClick={handleClick}
			className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
		>
			Assign
		</button>
	);
};

export default AddCardMember;
