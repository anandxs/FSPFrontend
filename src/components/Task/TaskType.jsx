import { useState } from "react";
import Modal from "../Modal/Modal";
import ChangeTypeModal from "./ChangeTypeModal.jsx";

const TaskType = ({ type }) => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="col-span-5 flex justify-between items-center mb-3">
			<p>
				<span className="font-semibold">Task Type : </span>
				{type?.name}
			</p>
			<button
				onClick={handleToggle}
				className="bg-primary text-white text-sm px-2 py-1 rounded"
			>
				Change
			</button>
			{toggle && (
				<Modal action={handleToggle}>
					<ChangeTypeModal handleToggle={handleToggle} />
				</Modal>
			)}
		</div>
	);
};

export default TaskType;
