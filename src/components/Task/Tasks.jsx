import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectTasksQuery } from "../../features/task/taskApiSlice";
import CreateTask from "./CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useGetProjectStagesQuery } from "../../features/stage/stageApiSlice";
import { useGetProjectTaskTypesQuery } from "../../features/taskType/taskTypeApiSlice";
import {
	resetFilters,
	selectCurrentFilters,
	toggleStagesFilter,
} from "../../features/filter/filterSlice";

const Tasks = () => {
	const { projectId } = useParams();
	const { role } = useSelector(selectCurrentProjectRole);

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

	const filters = useSelector(selectCurrentFilters);

	let data;
	if (isSuccess) {
		data = tasks
			.filter((x) => {
				if (filters.stages.length === 0) return true;
				if (filters.stages.includes(x?.stage?.stageId)) return x;
			})
			.filter((x) => {
				if (filters.types.length === 0) return true;
			})
			.map((task) => ({
				taskId: task.taskId,
				title: task.title,
				type: task.type,
				stage: task.stage,
				assignee: task.assignee,
				totalHours: task.totalHours,
				hoursSpent: task.hoursSpent,
			}));
	}

	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle((toggle) => !toggle);
	};

	return (
		<div className="m-2 p-2">
			<div className="flex justify-between mb-3">
				<h1 className="text-xl font-bold hover:underline">Tasks</h1>
				<div className="flex gap-2 items-center">
					{role?.name === "ADMIN" && <CreateTask />}
					<button
						onClick={handleToggle}
						className="bg-primary p-1 text-xs text-white rounded-sm"
					>
						Filters
					</button>
					{toggle && (
						<Modal action={handleToggle}>
							<FilterModal />
						</Modal>
					)}
				</div>
			</div>
			<DataTable
				customStyles={customStyles}
				pagination
				onRowClicked={goToTask}
				pointerOnHover
				columns={columns}
				data={data}
			/>
		</div>
	);
};

const FilterModal = () => {
	const { projectId } = useParams();
	const { data: stages } = useGetProjectStagesQuery({ projectId });
	const { data: types } = useGetProjectTaskTypesQuery({ projectId });
	const filters = useSelector(selectCurrentFilters);
	const dispatch = useDispatch();

	return (
		<div
			className="bg-accent p-3 w-screen sm:w-2/3 sm:max-w-sm"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold mb-2">Filters</h1>
				<button
					className="bg-primary text-xs p-1 text-white font-semibold"
					onClick={() => dispatch(resetFilters())}
				>
					Reset
				</button>
			</div>
			<div className="flex justify-between gap-2">
				<ul>
					{stages?.map((stage) => (
						<li key={stage.stageId}>
							<label className="text-xs">
								<input
									type="checkbox"
									checked={filters.stages.includes(stage.stageId)}
									onChange={() => dispatch(toggleStagesFilter(stage.stageId))}
								/>{" "}
								{stage.name}
							</label>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Tasks;
