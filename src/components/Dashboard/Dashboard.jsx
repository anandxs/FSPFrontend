import TasksPerStage from "./TasksPerStage";
import TasksPerType from "./TasksPerType";

const Dashboard = () => {
	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<div className="mb-2">
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
		</div>
	);
};

export default Dashboard;
