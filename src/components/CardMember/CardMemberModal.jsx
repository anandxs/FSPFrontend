import { useParams } from "react-router-dom";
import { useGetAssigneesForCardQuery } from "../../features/cardMember/cardMemberApiSlice";
import { useGetProjectMembersQuery } from "../../features/member/memberApiSlice";
import RemoveCardMember from "./RemoveCardMember";
import AddCardMember from "./AddCardMember";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";
import { ROLE_OBSERVER } from "../../utils/constants";

const AssigneesModal = () => {
	const { projectId, cardId } = useParams();

	const {
		data: cardMembers,
		isLoading: cmLoadingStatus,
		isSuccess: cmSuccesStatus,
		isError: cmErrorStatus,
		error: cmError,
	} = useGetAssigneesForCardQuery({
		projectId,
		cardId,
	});

	const {
		data: projectMembers,
		isLoading: pmLoadingStatus,
		isSuccess: pmSuccessStatus,
		isError: pmErrorStatus,
		error: pmError,
	} = useGetProjectMembersQuery({ projectId });

	const { role } = useSelector(selectCurrentProjectRole);

	let assignees;
	if (cmLoadingStatus) {
		assignees = <p>Loading...</p>;
	} else if (cmSuccesStatus) {
		if (cardMembers?.length === 0) {
			assignees = <p>No members assigned</p>;
		} else {
			assignees = (
				<ul className="pr-4 flex flex-col gap-1">
					{cardMembers.map((a) => (
						<li key={a?.id} className="flex justify-between">
							{`${a.firstName} ${a.lastName}`}
							{role !== ROLE_OBSERVER && (
								<RemoveCardMember
									projectId={projectId}
									memberId={a?.id}
									cardId={cardId}
								/>
							)}
						</li>
					))}
				</ul>
			);
		}
	} else if (cmErrorStatus) {
		assignees = <p>{cmError}</p>;
	}

	let unassignedMembers;
	if (pmLoadingStatus) {
		unassignedMembers = <p>Loading...</p>;
	} else if (pmSuccessStatus && cmSuccesStatus) {
		let temp = projectMembers.filter(
			(x) => !cardMembers?.map((y) => y.id).includes(x.user.id)
		);
		unassignedMembers = (
			<ul className="pr-4 flex flex-col gap-1">
				{temp?.map((pm) => (
					<li key={pm?.user?.id} className="flex justify-between">
						{`${pm?.user?.firstName} ${pm?.user?.lastName}`}
						<AddCardMember
							projectId={projectId}
							cardId={cardId}
							assigneeId={pm?.user?.id}
						/>
					</li>
				))}
			</ul>
		);
	} else if (pmErrorStatus) {
		unassignedMembers = <p>{pmError}</p>;
	}

	return (
		<div
			className="bg-accent p-3 w-1/2 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="mb-2">
				<h1 className="text-xl font-bold mb-2 py-1">Assigned Members</h1>
				{assignees}
			</div>
			{role !== ROLE_OBSERVER && (
				<div>
					<h2 className="text-xl font-bold mb-2 py-1">Assign Members</h2>
					{unassignedMembers}
				</div>
			)}
		</div>
	);
};

export default AssigneesModal;
