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
				className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
				onClick={handleCreateToggle}
			>
				Add
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
