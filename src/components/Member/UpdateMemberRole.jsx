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
				className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
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
