import { useState } from "react";
import { useToggleProjectArchiveStatusMutation } from "../../features/project/projectApiSlice";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";

const ArchiveProject = ({ params, data }) => {
	const [toggleArchive, setToggleArchive] = useState(false);

	const [toggleProjectArchiveStatus] = useToggleProjectArchiveStatusMutation();

	const handleArchiveToggle = () => {
		setToggleArchive(!toggleArchive);
	};

	const handleArchive = async () => {
		try {
			const { projectId } = params;
			const response = await toggleProjectArchiveStatus({
				projectId,
			});

			handleArchiveToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<button
				className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
				onClick={handleArchiveToggle}
			>
				{data?.isActive ? "Archive Project" : "Unarchive project"}
			</button>
			{toggleArchive && (
				<Modal action={handleArchiveToggle}>
					<Confirmation success={handleArchive} cancel={handleArchiveToggle} />
				</Modal>
			)}
		</>
	);
};

export default ArchiveProject;
