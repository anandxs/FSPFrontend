import { useState } from "react";
import Modal from "../Modal/Modal";
import ChangeDueDateModal from "./ChangeDueDateModal";

const TaskDueDate = ({ dueDate }) => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	const overdueFlag = dueDate && new Date(dueDate) < Date.now();
	const dueTodayFlag =
		dueDate && new Date(dueDate).toLocaleDateString() === new Date(Date.now());

	return (
		<div className="flex justify-between items-center mb-3">
			<p>
				<span className="font-semibold">Due Date : </span>
				<span
					className={
						overdueFlag
							? "px-1 py-0.5 bg-red-600 text-sm text-gray-50 rounded"
							: dueTodayFlag
							? "px-1 py-0.5 bg-green-500 text-sm text-gray-50 rounded"
							: ""
					}
				>
					{dueDate ? new Date(dueDate).toDateString() : "- -"}
					{overdueFlag ? "(Overdue)" : dueTodayFlag ? "(Due Today)" : ""}
				</span>
			</p>
			<button
				onClick={handleToggle}
				className="bg-indigo-950 text-gray-50 text-sm px-2 py-1 rounded"
			>
				Change
			</button>
			{toggle && (
				<Modal action={handleToggle}>
					<ChangeDueDateModal handleToggle={handleToggle} />
				</Modal>
			)}
		</div>
	);
};

export default TaskDueDate;
