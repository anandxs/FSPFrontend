import { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import ChangeStageModal from "./ChangeStageModal";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { TaskContext } from "./Task";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

const TaskStage = ({ stage }) => {
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
				<span className="font-semibold">Stage :</span> {stage?.name}
			</p>
			<button
				onClick={handleToggle}
				className={`bg-indigo-950 text-gray-50 sm:text-sm px-2 py-1 rounded ${
					id === assignee?.id || role?.name === "ADMIN" ? "" : "hidden"
				}`}
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
