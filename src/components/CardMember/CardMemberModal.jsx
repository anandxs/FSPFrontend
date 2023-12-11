import { useParams } from "react-router-dom";
import { useGetAssigneesForCardQuery } from "../../features/cardMember/cardMember";
import { useGetProjectMembersQuery } from "../../features/member/memberApiSlice";

const AssigneesModal = () => {
	const { projectId, cardId } = useParams();

	const {
		data: assignees,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetAssigneesForCardQuery({
		projectId,
		cardId,
	});

	let members;

	if (isLoading) {
		members = <p>Loading...</p>;
	} else if (isSuccess) {
		if (assignees?.length === 0) {
			members = <p>No members assigned</p>;
		} else {
			members = (
				<ul className="pr-4">
					{assignees.map((a) => (
						<li key={a?.id} className="flex justify-between">
							{`${a.firstName} ${a.lastName}`}
						</li>
					))}
				</ul>
			);
		}
	} else if (isError) {
		members = <p>{error}</p>;
	}

	return (
		<div
			className="bg-accent p-3 w-1/2 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Assigned Members</h1>
			<div>{members}</div>
		</div>
	);
};

export default AssigneesModal;
