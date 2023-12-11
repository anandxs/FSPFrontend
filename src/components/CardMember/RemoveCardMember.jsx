import { useRemoveMemberFromCardMutation } from "../../features/cardMember/cardMemberApiSlice";

const RemoveCardMember = ({ projectId, memberId, cardId }) => {
	const [removeMember] = useRemoveMemberFromCardMutation();

	const handleClick = () => {
		removeMember({ projectId, assigneeId: memberId, cardId }).unwrap();
	};

	return (
		<button
			onClick={handleClick}
			className="bg-orange-500 text-white px-3 py-0.5 text-sm rounded-sm"
		>
			Remove
		</button>
	);
};

export default RemoveCardMember;
