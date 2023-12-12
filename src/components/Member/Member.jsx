import RemoveMember from "./RemoveMember";

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
			<button>Change Role</button>
			<RemoveMember />
		</div>
	);
};

export default Member;
