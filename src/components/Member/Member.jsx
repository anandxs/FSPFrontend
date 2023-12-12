import RemoveMember from "./RemoveMember";
import UpdateMemberRole from "./UpdateMemberRole";

const Member = () => {
	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<h1 className="text-xl font-bold mb-2 py-1 hover:underline">
				Member Details
			</h1>
			<p>First Name</p>
			<p>Last Name</p>
			<p>Email</p>
			<p>Role</p>
			<UpdateMemberRole />
			<RemoveMember />
		</div>
	);
};

export default Member;
