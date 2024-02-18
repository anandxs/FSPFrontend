import { useParams } from "react-router-dom";
import { useGetTotalHoursRequiredForProjectQuery } from "../../features/stats/statsApiSlice";
import TasksPerStage from "./TasksPerStage";
import TasksPerType from "./TasksPerType";

const Dashboard = () => {
	return (
		<div className="m-2 p-2">
			<h1 className="text-xl font-bold hover:underline mb-2">Dashboard</h1>
			<div className="mb-2 flex gap-2 flex-wrap">
				<TotalHoursStat />
			</div>
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

const TotalHoursStat = () => {
	const { projectId } = useParams();
	const { data, isLoading, isSuccess, isError, error } =
		useGetTotalHoursRequiredForProjectQuery({ projectId });

	if (isLoading) return <p>Loading...</p>;

	if (isError) {
		console.log(error);
		return <p>Something went wrong</p>;
	}

	if (isSuccess)
		return (
			<div className={`bg-yellow-500 w-52 rounded font-bold text-gray-50 p-2`}>
				<p className="text-md">Total Hours Required</p>
				<p className="text-2xl">{data}</p>
			</div>
		);
};

export default Dashboard;
