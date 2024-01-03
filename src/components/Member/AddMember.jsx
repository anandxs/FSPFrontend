import { useState } from "react";
import Modal from "../Modal/Modal";
import AddMemberModal from "./AddMemberModal";

const AddMember = () => {
	const [toggleCreate, setToggleCreate] = useState(false);

	const handleCreateToggle = () => {
		setToggleCreate(!toggleCreate);
	};

	return (
		<>
			<button
				type="button"
				className="bg-primary text-white p-1 text-xs sm:text-md font-semibold rounded-sm"
				onClick={handleCreateToggle}
			>
				Add Member
			</button>
			{toggleCreate && (
				<Modal action={handleCreateToggle}>
					<AddMemberModal handleCreateToggle={handleCreateToggle} />
				</Modal>
			)}
		</>
	);
};

export default AddMember;
