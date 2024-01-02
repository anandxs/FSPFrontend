import TasksPerStage from "./TasksPerStage";
import TasksPerType from "./TasksPerType";

const Dashboard = () => {
	return (
		<div className="m-2 p-2">
			<h1 className="text-xl font-bold hover:underline">Dashboard</h1>
			<div className="flex flex-wrap">
				<div className="w-full sm:w-1/2">
					<TasksPerStage />
				</div>
				<div className="w-full sm:w-1/2">
					<TasksPerType />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
