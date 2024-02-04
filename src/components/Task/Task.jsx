import { useParams, useNavigate } from "react-router-dom";
import { useGetTaskByIdQuery } from "../../features/task/taskApiSlice";
import { toast } from "react-toastify";
import { createContext, useEffect } from "react";
import DeleteTask from "./DeleteTask";
import TaskStage from "./TaskStage";
import TaskType from "./TaskType";
import TaskTitle from "./TaskTitle";
import TaskAssignee from "./TaskAssignee";
import TaskDescription from "./TaskDescription";
import Comments from "./Comments";
import AddAttachment from "./Attachment/Attachments";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

export const TaskContext = createContext({
	taskId: null,
	title: null,
	description: null,
	stageId: null,
	typeId: null,
	assigneeId: null,
	dueDate: null,
	totalHours: null,
	hoursSpent: null,
});

const Task = () => {
	const { projectId, taskId } = useParams();
	const { id } = useSelector(selectCurrentUser);

	const {
		data: task,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTaskByIdQuery({ projectId, taskId });

	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) {
		} else if (isError) {
			console.log(error);
			toast.error("Could not fetch task data");
			navigate(`/projects/${projectId}/tasks/`, {
				state: { projectId },
			});
		}
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="p-2">
			<TaskContext.Provider value={{ ...task }}>
				<div className="flex items-center gap-2 mb-3">
					<TaskTitle title={task?.title} />
					<DeleteTask />
				</div>
				<div className="grid grid-cols-12 gap-3">
					<TaskStage stage={task?.stage} />
					<TaskType type={task?.type} />
					<TaskAssignee assignee={task?.assignee} />
					{false && (
						<>
							<TotalHours totalHours={task?.totalHours} />
							<HoursSpent hoursSpent={task?.hoursSpent} />
						</>
					)}
				</div>
				{id === task?.assignee?.id && <LogHours />}
				<TaskDescription description={task?.description} />
				<AddAttachment />
				<Comments />
			</TaskContext.Provider>
		</div>
	);
};

const LogHours = () => {
	return <h1>hi</h1>;
};

const TotalHours = ({ totalHours }) => {
	return (
		<div className="flex justify-between sm:justify-start sm:gap-2 items-center text-xs mb-3 col-span-12 sm:col-span-6">
			<p>
				<span className="font-semibold">Total Hours Allotted: </span>
				<span>{totalHours}</span>
			</p>
		</div>
	);
};

const HoursSpent = ({ hoursSpent }) => {
	return (
		<div className="flex justify-between sm:justify-start sm:gap-2 items-center text-xs mb-3 col-span-12 sm:col-span-6">
			<p>
				<span className="font-semibold">Total Hours Spent: </span>
				<span>{hoursSpent}</span>
			</p>
		</div>
	);
};

export default Task;
