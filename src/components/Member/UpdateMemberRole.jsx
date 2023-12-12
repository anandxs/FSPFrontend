import { useState } from "react";
import Modal from "../Modal/Modal";

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
					<div
						className="bg-accent p-3 w-1/3 min-w-max"
						onClick={(e) => e.stopPropagation()}
					></div>
				</Modal>
			)}
		</>
	);
};

export default UpdateMemberRole;
