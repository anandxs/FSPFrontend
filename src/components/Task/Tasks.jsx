import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectTasksQuery } from "../../features/task/taskApiSlice";
import CreateTask from "./CreateTask";

const Cards = () => {
	const { projectId } = useParams();

	const navigate = useNavigate();

	const goToTask = (task) => {
		navigate(`/projects/${projectId}/tasks/${task?.taskId}`, {
			state: { projectId, taskId: task?.taskId, task },
		});
	};

	const { data: tasks, isSuccess } = useGetProjectTasksQuery({ projectId });

	const columns = [
		{
			name: "Title",
			selector: (row) => row.title,
			sortable: true,
		},
		{
			name: "Type",
			selector: (row) => row.type.name,
			sortable: true,
		},
		{
			name: "Stage",
			selector: (row) => row.stage.name,
			sortable: true,
		},
		{
			name: "Assignee",
			selector: (row) => {
				const assignee = row.assignee;
				if (assignee) {
					return `${assignee.firstName} ${assignee.lastName}`;
				}
				return `Unassigned`;
			},
			sortable: true,
		},
		{
			name: "Due Date",
			selector: (row) => row.dueDate,
			sortable: true,
			cell: (row) => {
				const date =
					row.dueDate !== null ? new Date(row.dueDate).toDateString() : "- -";
				return (
					<p
						className={`${
							row.dueDate !== null && new Date(row.dueDate) < Date.now()
								? "bg-red-600 px-2 py-1 text-white rounded"
								: ""
						}`}
					>
						{date}
					</p>
				);
			},
		},
	];

	let data;
	if (isSuccess) {
		data = tasks.map((task) => ({
			taskId: task.taskId,
			title: task.title,
			type: task.type,
			stage: task.stage,
			assignee: task.assignee,
			dueDate: task.dueDate,
		}));
	}

	return (
		<div className="m-2 p-2">
			<div className="flex justify-between mb-3">
				<h1 className="text-xl font-bold hover:underline">Tasks</h1>
				<CreateTask />
			</div>
			<DataTable
				customStyles={customStyles}
				pagination
				onRowClicked={goToTask}
				columns={columns}
				data={data}
			/>
		</div>
	);
};

export default Cards;
