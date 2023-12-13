import { useState } from "react";
import Modal from "../Modal/Modal";
import { useGetProjectGroupsQuery } from "../../features/group/groupApiSlice";
import { useParams } from "react-router";

const CardFilter = ({ filters, setFilters }) => {
	const [showModal, setShowModal] = useState(false);
	const { projectId } = useParams();

	const closeModal = () => {
		setShowModal(!showModal);
	};

	const handleClick = (id) => {
		if (filters.includes(id)) {
			setFilters([...filters.filter((f) => f !== id)]);
		} else {
			setFilters([...filters, id]);
		}
	};

	const { data: groups, isSuccess } = useGetProjectGroupsQuery({ projectId });
	let options;
	if (isSuccess) {
		if (groups?.length === 0) options = <p>There are no groups</p>;
		options = groups.map((g) => (
			<div key={g.groupId} className="flex gap-2">
				<input
					type="checkbox"
					id={`option-${g.name}`}
					onClick={() => handleClick(g.groupId)}
				/>
				<label htmlFor={`option-${g.name}`}>{g.name}</label>
			</div>
		));
	}

	return (
		<>
			<button
				onClick={closeModal}
				className="bg-primary text-white font-semibold px-3 rounded"
			>
				Filters
			</button>
			{showModal && (
				<Modal action={closeModal}>
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
