import { useState } from "react";
import Modal from "../Modal/Modal";
import RenameProjectModal from "./RenameProjectModal";

const RenameProject = () => {
	const [toggleCreate, setToggleCreate] = useState(false);

	const handleToggle = () => {
		setToggleCreate(!toggleCreate);
	};

	return (
		<>
			<button
				type="button"
				className="inline-block rounded bg-indigo-950 px-5 py-2 text-xs font-medium text-gray-50 transition hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 disabled:opacity-50"
				onClick={handleToggle}
			>
				Rename
			</button>
			{toggleCreate && (
				<Modal action={handleToggle}>
					<RenameProjectModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default RenameProject;
