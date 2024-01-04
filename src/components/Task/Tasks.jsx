import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectTasksQuery } from "../../features/task/taskApiSlice";
import CreateTask from "./CreateTask";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

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
			name: "Total Hours Required",
			selector: (row) => row.totalHours,
		},
		{
			name: "Hours Spent",
			selector: (row) => row.hoursSpent,
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
			totalHours: task.totalHours,
			hoursSpent: task.hoursSpent,
		}));
	}

	const { role } = useSelector(selectCurrentProjectRole);

	return (
		<div className="m-2 p-2">
			<div className="flex justify-between mb-3">
				<h1 className="text-xl font-bold hover:underline">Tasks</h1>
				{role?.name === "ADMIN" && <CreateTask />}
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
