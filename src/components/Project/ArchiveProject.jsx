import { useState } from "react";
import { useToggleProjectArchiveStatusMutation } from "../../features/project/projectApiSlice";
import { useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";

const ArchiveProject = ({ data }) => {
	const { projectId } = useParams();
	const [toggleArchive, setToggleArchive] = useState(false);

	const [toggleProjectArchiveStatus] = useToggleProjectArchiveStatusMutation();

	const handleToggle = () => {
		setToggleArchive(!toggleArchive);
	};

	const handleArchive = async () => {
		try {
			await toggleProjectArchiveStatus({
				projectId,
			}).unwrap();
			handleToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<button
				className="bg-orange-500 text-gray-50 text-sm text-bold px-3 py-1 rounded w-32"
				onClick={handleToggle}
			>
				{data?.isActive ? "Archive" : "Unarchive"}
			</button>
			{toggleArchive && (
				<Modal action={handleToggle}>
					<Confirmation success={handleArchive} cancel={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default ArchiveProject;
