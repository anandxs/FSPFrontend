import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";
import { createContext } from "react";
import { useParams } from "react-router";
import { useGetProjectStagesQuery } from "../../features/stage/stageApiSlice";
import EditStage from "./EditStage";
import DeleteStage from "./DeleteStage";
import CreateStage from "./CreateStage";

export const StageContext = createContext({
	projectId: null,
	stageId: null,
	init: null,
});

const Stages = () => {
	const { projectId } = useParams();

	const { data: stages, isSuccess } = useGetProjectStagesQuery({ projectId });
	let data;
	if (isSuccess) {
		data = stages.map((stage) => ({
			id: stage.stageId,
			name: stage.name,
		}));
	}

	const columns = [
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Option",
			cell: (row) => {
				return (
					<div className="flex gap-2 items-center">
						<StageContext.Provider
							value={{
								projectId,
								stageId: row.id,
								init: row.name,
							}}
						>
							<EditStage />
							<DeleteStage />
						</StageContext.Provider>
					</div>
				);
			},
		},
	];

	return (
		<div className="m-2 p-2">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-xs sm:text-lg font-bold hover:underline">
					Project Stages
				</h2>
				<StageContext.Provider value={{ projectId }}>
					<CreateStage />
				</StageContext.Provider>
			</div>
			<DataTable
				customStyles={customStyles}
				pagination
				columns={columns}
				data={data}
			/>
		</div>
	);
};

export default Stages;
