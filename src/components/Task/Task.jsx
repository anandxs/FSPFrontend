import { useParams, useNavigate } from "react-router-dom";
import { useGetTaskByIdQuery } from "../../features/task/taskApiSlice";
import { toast } from "react-toastify";
import { createContext, useEffect } from "react";
import DeleteTask from "./DeleteTask";
import TaskStage from "./TaskStage";
import TaskType from "./TaskType";
import TaskDueDate from "./TaskDueDate";
import TaskTitle from "./TaskTitle";
import TaskAssignee from "./TaskAssignee";
import TaskDescription from "./TaskDescription";
import Comments from "./Comments";
import AddAttachment from "./Attachment/Attachments";

export const TaskContext = createContext({
	taskId: null,
	title: null,
	description: null,
	stageId: null,
	typeId: null,
	assigneeId: null,
	dueDate: null,
});

const Task = () => {
	const { projectId, taskId } = useParams();

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

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="m-2 p-2">
			<TaskContext.Provider value={{ ...task }}>
				<div className="flex items-center gap-2 mb-3">
					<TaskTitle title={task?.title} />
					<DeleteTask />
				</div>
				<div className="grid grid-cols-12 mb-3">
					<TaskStage stage={task?.stage} />
					<div className="col-span-1 mb-3"></div>
					<TaskType type={task?.type} />
					<div className="col-span-1 mb-3"></div>
					<TaskAssignee assignee={task?.assignee} />
					<div className="col-span-1 mb-3"></div>
					<TaskDueDate dueDate={task?.dueDate} />
					<TaskDescription description={task?.description} />
					<AddAttachment />
					<Comments />
				</div>
			</TaskContext.Provider>
		</div>
	);
};

export default Task;
