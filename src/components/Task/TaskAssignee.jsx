import { useState, useContext } from "react";
import Modal from "../Modal/Modal";
import ChangeTaskAssigneeModal from "./ChangeTaskAssigneeModal";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

const TaskAssignee = ({ assignee }) => {
	const [toggle, setToggle] = useState(false);
	const { role } = useSelector(selectCurrentProjectRole);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="flex justify-between sm:justify-start sm:gap-2 items-center text-xs mb-3 col-span-12 sm:col-span-6">
			<p>
				<span className="font-semibold">Assignee : </span>
				{assignee
					? `${assignee?.firstName} ${assignee?.lastName}`
					: "Unassigned"}
			</p>
			{role?.name === "ADMIN" && (
				<button
					onClick={handleToggle}
					className="bg-blue-600 text-gray-50 sm:text-sm px-2 py-1 rounded"
				>
					Change
				</button>
			)}
			{toggle && (
				<Modal action={handleToggle}>
					<ChangeTaskAssigneeModal handleToggle={handleToggle} />
				</Modal>
			)}
		</div>
	);
};

export default TaskAssignee;
