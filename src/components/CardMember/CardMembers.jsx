import React, { useState } from "react";
import Modal from "../Modal/Modal";
import AssigneesModal from "./CardMemberModal";

const Assignees = () => {
	const [showModal, setShowModal] = useState(false);

	const handleModalToggle = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<button
				onClick={handleModalToggle}
				className="bg-primary text-white text-sm rounded px-1 w-full"
			>
				Assignees
			</button>
			{showModal && (
				<Modal action={handleModalToggle}>
					<AssigneesModal />
				</Modal>
			)}
		</>
	);
};

export default Assignees;
