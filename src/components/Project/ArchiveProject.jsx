import { useState } from "react";
import { useToggleProjectArchiveStatusMutation } from "../../features/project/projectApiSlice";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";
import { useParams } from "react-router-dom";

const ArchiveProject = ({ data }) => {
	const { projectId } = useParams();

	const [toggleArchive, setToggleArchive] = useState(false);

	const [toggleProjectArchiveStatus] = useToggleProjectArchiveStatusMutation();

	const handleToggle = () => {
		setToggleArchive(!toggleArchive);
	};

	const handleArchive = () => {
		toggleProjectArchiveStatus({
			projectId,
		})
			.unwrap()
			.then(() => {
				handleToggle();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<button
				className="bg-orange-500 text-white text-sm text-bold px-3 py-1 rounded w-32"
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
