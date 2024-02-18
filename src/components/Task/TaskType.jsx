import { useState, useContext } from "react";
import Modal from "../Modal/Modal";
import ChangeTypeModal from "./ChangeTypeModal.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { TaskContext } from "./Task";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

const TaskType = ({ type }) => {
	const [toggle, setToggle] = useState(false);
	const { id } = useSelector(selectCurrentUser);
	const { role } = useSelector(selectCurrentProjectRole);
	const { assignee } = useContext(TaskContext);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="flex justify-between sm:justify-start sm:gap-2 items-center text-xs mb-3 col-span-12 sm:col-span-6">
			<p>
				<span className="font-semibold">Task Type : </span>
				{type?.name}
			</p>
			<button
				onClick={handleToggle}
				className={`bg-indigo-950 text-gray-50 sm:text-sm px-2 py-1 rounded ${
					// id === assignee ||
					role?.name === "ADMIN" ? "" : "hidden"
				}`}
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
