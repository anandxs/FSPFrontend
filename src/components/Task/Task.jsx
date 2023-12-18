import { useParams, useNavigate } from "react-router-dom";
import { useGetTaskByIdQuery } from "../../features/task/taskApiSlice";
import { toast } from "react-toastify";
import { createContext, useEffect } from "react";
import DeleteTask from "./DeleteTask";
import TaskStage from "./TaskStage";
import TaskType from "./TaskType";
import TaskDueDate from "./TaskDueDate";
import TaskTitle from "./TaskTitle";

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
			console.log(task);
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
		<TaskContext.Provider value={{ ...task }}>
			<section className="col-span-10 p-3">
				<div className="flex items-center gap-2 mb-3">
					<TaskTitle title={task?.title} />
					<DeleteTask />
				</div>
				<div className="grid grid-cols-12 mb-3">
					<TaskStage stage={task?.stage} />
					<div className="col-span-1 mb-3"></div>
					<TaskType type={task?.type} />
					<div className="col-span-1 mb-3"></div>
					<div className="col-span-5 flex justify-between items-center mb-3">
						<p>
							<span className="font-semibold">Assignee : </span>
							{task?.assignee
								? `${task?.assignee?.firstName} ${task?.assignee?.lastName}`
								: "Unassigned"}
						</p>
						<button className="bg-primary text-white text-sm px-2 py-1 rounded">
							Change
						</button>
					</div>
					<div className="col-span-1 mb-3"></div>
					<TaskDueDate dueDate={task?.dueDate} />
					<div className="col-span-12 mb-3">
						{task?.description ? (
							<div>
								<div className="flex gap-2 items-center">
									<h2 className="underline font-semibold text-lg mb-1">
										Description
									</h2>
									<button className="bg-orange-500 text-white px-3 py-0.5 text-xs rounded-sm">
										Delete
									</button>
								</div>
								<p>{task?.description}</p>
							</div>
						) : (
							<button className="bg-primary text-white text-sm px-2 py-1 rounded">
								Add Description
							</button>
						)}
					</div>
				</div>
			</section>
		</TaskContext.Provider>
	);
};

export default Task;
