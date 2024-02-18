import { useState } from "react";
import Modal from "../Modal/Modal";
import UpdateMemberRoleModal from "./UpdateMemberRoleModal";

const UpdateMemberRole = () => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<>
			<button
				onClick={handleToggle}
				className="inline-block rounded bg-indigo-950 px-5 py-1 text-xs font-medium text-gray-50 transition hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 disabled:opacity-50"
			>
				Change Role
			</button>
			{toggle && (
				<Modal action={handleToggle}>
					<UpdateMemberRoleModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default UpdateMemberRole;
