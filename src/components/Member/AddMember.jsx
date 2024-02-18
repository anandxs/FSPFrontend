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
				className="inline-block rounded bg-indigo-950 px-5 py-2 text-xs font-medium text-gray-50 transition hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 disabled:opacity-50"
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
