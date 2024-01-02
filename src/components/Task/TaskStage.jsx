import { useState } from "react";
import Modal from "../Modal/Modal";
import ChangeStageModal from "./ChangeStageModal";

const TaskStage = ({ stage }) => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="flex justify-between sm:justify-start sm:gap-2 items-center text-xs mb-3 col-span-12 sm:col-span-6">
			<p>
				<span className="font-semibold">Stage :</span> {stage?.name}
			</p>
			<button
				onClick={handleToggle}
				className="bg-primary text-white sm:text-sm px-2 py-1 rounded"
			>
				Change
			</button>
			{toggle && (
				<Modal action={handleToggle}>
					<ChangeStageModal handleToggle={handleToggle} />
				</Modal>
			)}
		</div>
	);
};

export default TaskStage;
