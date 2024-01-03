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
				</div>
				<TaskDescription description={task?.description} />
				<AddAttachment />
				<Comments />
			</TaskContext.Provider>
		</div>
	);
};

export default Task;
