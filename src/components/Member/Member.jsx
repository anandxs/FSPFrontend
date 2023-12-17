import { useParams } from "react-router-dom";
import { useGetMemberByIdQuery } from "../../features/member/memberApiSlice";
import RemoveMember from "./RemoveMember";
import UpdateMemberRole from "./UpdateMemberRole";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const Member = () => {
	const { projectId, memberId } = useParams();
	const { data, isSuccess } = useGetMemberByIdQuery({ projectId, memberId });

	let member;
	if (isSuccess) {
		member = data;
	}

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<h1 className="text-xl font-bold mb-2 py-1 hover:underline">
				Member Details
			</h1>
			<div className="flex flex-col gap-2 mb-3">
				<p>First Name: {member?.user?.firstName}</p>
				<p>Last Name: {member?.user?.lastName}</p>
				<p>Email: {member?.user?.email}</p>
				<p>Role: {member?.role?.name}</p>
			</div>

			<div className="flex gap-2">
				<UpdateMemberRole />
				<RemoveMember />
			</div>
		</div>
	);
};

export default Member;
