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
				className="inline-block rounded bg-blue-600 px-5 py-1 text-xs font-medium text-white transition hover:shadow-xl focus:outline-none focus:ring active:bg-blue-500 disabled:opacity-50"
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
