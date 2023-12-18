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
				className="bg-primary text-white text-sm text-bold px-3 py-1 rounded w-32"
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
