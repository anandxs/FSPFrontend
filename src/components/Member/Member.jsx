import { useParams } from "react-router-dom";
import { useGetProjectMemberQuery } from "../../features/member/memberApiSlice";
import RemoveMember from "./RemoveMember";
import UpdateMemberRole from "./UpdateMemberRole";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

const Member = () => {
	const { projectId, memberId } = useParams();
	const { data, isSuccess } = useGetProjectMemberQuery({ projectId, memberId });

	let member;
	if (isSuccess) {
		member = data;
	}

	const { role } = useSelector(selectCurrentProjectRole);

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<h1 className="text-xl font-bold mb-2 py-1 hover:underline">
				Member Details
			</h1>
			<div className="flex flex-col gap-2 mb-3">
				<p>First Name: {member?.user?.firstName}</p>
				<p>Last Name: {member?.user?.lastName}</p>
				<p>Email: {member?.user?.email}</p>
				<p>Role: {member?.role}</p>
			</div>

			{role === "ADMIN" && (
				<div className="flex gap-2">
					<UpdateMemberRole />
					<RemoveMember />
				</div>
			)}
		</div>
	);
};

export default Member;
