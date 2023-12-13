import { useState } from "react";
import Modal from "../Modal/Modal";
import { useGetProjectGroupsQuery } from "../../features/group/groupApiSlice";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	resetFilters,
	selectCurrentFilters,
	toggleFilter,
} from "../../features/filter/filterSlice";

const CardFilter = () => {
	const [showModal, setShowModal] = useState(false);
	const { projectId } = useParams();

	const closeModal = () => {
		setShowModal(!showModal);
	};

	const dispatch = useDispatch();

	const handleClick = (id) => {
		dispatch(toggleFilter(id));
	};

	const { groups: groupFilters } = useSelector(selectCurrentFilters);
	const { data: groups, isSuccess } = useGetProjectGroupsQuery({ projectId });
	let options;
	if (isSuccess) {
		if (groups?.length === 0) options = <p>There are no groups</p>;
		options = groups.map((g) => {
			return (
				<div key={g.groupId} className="flex gap-2">
					<input
						type="checkbox"
						id={`option-${g.name}`}
						checked={groupFilters.includes(g.groupId)}
						onChange={() => handleClick(g.groupId)}
					/>
					<label htmlFor={`option-${g.name}`}>{g.name}</label>
				</div>
			);
		});
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
						<div>
							<h1 className="text-xl font-bold mb-2 py-1">Select Groups</h1>
							<button onClick={() => dispatch(resetFilters())}>Clear</button>
						</div>
						<ul className="flex flex-col">{options}</ul>
					</div>
				</Modal>
			)}
		</>
	);
};

export default CardFilter;
