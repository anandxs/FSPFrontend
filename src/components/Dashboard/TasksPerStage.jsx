import {
	ChartComponent,
	SeriesCollectionDirective,
	SeriesDirective,
	Inject,
	Legend,
	Category,
	Tooltip,
	DataLabel,
	ColumnSeries,
} from "@syncfusion/ej2-react-charts";
import { useGetTasksPerStageDataQuery } from "../../features/stats/statsApiSlice";
import { useParams } from "react-router-dom";

const TasksPerStage = () => {
	const primaryxAxis = { valueType: "Category", title: "Stages" };
	const primaryyAxis = {
		title: "Task Count",
		interval: 1,
	};
	const { projectId } = useParams();
	const { data, isLoading, isSuccess, isError } = useGetTasksPerStageDataQuery({
		projectId,
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<p>Loading..</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex justify-center items-center h-full">
				<p>Something went wrong</p>
			</div>
		);
	}

	if (isSuccess) {
		return (
			<ChartComponent
				id="tasksperstagechart"
				primaryXAxis={primaryxAxis}
				primaryYAxis={primaryyAxis}
				title="Tasks Per Stage"
			>
				<Inject
					services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]}
				/>
				<SeriesCollectionDirective>
					<SeriesDirective
						dataSource={data}
						xName="stage"
						yName="count"
						name="Task Count"
						type="Column"
						columnSpacing={0.25}
						columnWidth={0.5}
						fill="purple"
					></SeriesDirective>
				</SeriesCollectionDirective>
			</ChartComponent>
		);
	}
};

export default TasksPerStage;
