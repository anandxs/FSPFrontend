import { useParams, useNavigate } from "react-router-dom";
import { useGetTaskByIdQuery } from "../../features/task/taskApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import DeleteTask from "./DeleteTask";

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
		<section className="col-span-10 p-3">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold hover:underline mb-3 w-fit">
					{task?.title}
				</h2>
			</div>
			<div>
				<p>Stage: {task?.stage?.name}</p>
				<p>Task Type: {task?.type?.name}</p>
				<p>
					Assignee:{" "}
					{task?.assignee
						? `${task?.assignee?.firstName} ${task?.assignee?.lastName}`
						: "Unassigned"}
				</p>
				<p>Due Date: {task?.dueDate}</p>
				<p className="flex flex-col gap-1">
					<span className="underline">Description</span>
					<span>{task?.description}</span>
				</p>
			</div>
			<DeleteTask />
		</section>
	);
};

export default Task;
