import { useState } from "react";
import Modal from "../Modal/Modal";
import ChangeStageModal from "./ChangeStageModal";

const TaskStage = ({ stage }) => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="col-span-5 flex justify-between py-2">
			<p>
				<span className="font-semibold">Stage :</span> {stage?.name}
			</p>
			<button
				onClick={handleToggle}
				className="bg-primary text-white text-sm px-2 py-1 rounded"
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
