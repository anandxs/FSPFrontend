import { useNavigate, useParams } from "react-router-dom";
import { useGetMemberByIdQuery } from "../../features/member/memberApiSlice";
import { toast } from "react-toastify";
import RemoveMember from "./RemoveMember";
import UpdateMemberRole from "./UpdateMemberRole";

const Member = () => {
	const navigate = useNavigate();
	const { projectId, memberId } = useParams();
	const { data, isLoading, isSuccess, isError, error } = useGetMemberByIdQuery({
		projectId,
		memberId,
	});

	if (isError) {
		console.log(error);
		if (error?.status == 404) {
			navigate(-1);
			toast.error("Not a member.");
		} else toast.error("Something went wrong.");
	}

	if (isLoading) return <p>Loading...</p>;

	if (isSuccess)
		return (
			<div className="col-span-10 p-2 mt-3 ml-3">
				<h1 className="text-xl font-bold mb-2 py-1 hover:underline">
					Member Details
				</h1>
				<div className="flex flex-col gap-2 mb-3">
					<p>First Name: {data?.user?.firstName}</p>
					<p>Last Name: {data?.user?.lastName}</p>
					<p>Email: {data?.user?.email}</p>
					<p>Role: {data?.role?.name}</p>
				</div>

				<div className="flex gap-2">
					<UpdateMemberRole />
					<RemoveMember />
				</div>
			</div>
		);
};

export default Member;
