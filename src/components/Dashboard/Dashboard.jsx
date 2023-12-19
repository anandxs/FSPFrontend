import TasksPerStage from "./TasksPerStage";
import TasksPerType from "./TasksPerType";

const Dashboard = () => {
	return (
		<div className="m-2 p-2">
			<h1 className="text-xl font-bold hover:underline">Dashboard</h1>
			<div className="flex justify-between">
				<div>
					<TasksPerStage />
				</div>
				<div>
					<TasksPerType />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
