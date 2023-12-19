import { useState } from "react";
import Modal from "../Modal/Modal";
import ChangeTaskAssigneeModal from "./ChangeTaskAssigneeModal";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

const TaskAssignee = ({ assignee }) => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	const { role } = useSelector(selectCurrentProjectRole);

	return (
		<div className="col-span-5 flex justify-between items-center mb-3">
			<p>
				<span className="font-semibold">Assignee : </span>
				{assignee
					? `${assignee?.firstName} ${assignee?.lastName}`
					: "Unassigned"}
			</p>
			{role?.name === "ADMIN" && (
				<button
					onClick={handleToggle}
					className="bg-primary text-white text-sm px-2 py-1 rounded"
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
