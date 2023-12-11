import { useState } from "react";
import Modal from "../Modal/Modal";
import { useGetProjectGroupsQuery } from "../../features/group/groupApiSlice";
import { useParams } from "react-router";

const CardFilter = () => {
	const [showModal, setShowModal] = useState(false);
	const { projectId } = useParams();

	const handleClick = () => {
		setShowModal(!showModal);
	};

	const { data: groups, isSuccess } = useGetProjectGroupsQuery({ projectId });

	let options;
	if (isSuccess) {
		options = groups.map((g) => (
			<div key={g.groupId} className="flex gap-2">
				<input type="checkbox" id={`option-${g.name}`} />
				<label htmlFor={`option-${g.name}`}>{g.name}</label>
			</div>
		));
	}

	return (
		<>
			<button
				onClick={handleClick}
				className="bg-primary text-white font-semibold px-3 rounded"
			>
				Filters
			</button>
			{showModal && (
				<Modal action={handleClick}>
					<div
						onClick={(e) => e.stopPropagation()}
						className="bg-accent p-3 w-1/3 min-w-max"
					>
						<h1 className="text-xl font-bold mb-2 py-1">Select Groups</h1>
						<ul className="flex flex-col">{options}</ul>
					</div>
				</Modal>
			)}
		</>
	);
};

export default CardFilter;
