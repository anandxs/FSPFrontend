import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";
import { createContext } from "react";
import { useParams } from "react-router";
import { useGetProjectTaskTypesQuery } from "../../features/taskType/taskTypeApiSlice";
import EditType from "./EditType";
import DeleteType from "./DeleteType";
import CreateType from "./CreateType";

export const TypeContext = createContext({
	projectId: null,
	typeId: null,
	init: null,
});

const Types = () => {
	const { projectId } = useParams();

	const { data: taskTypes, isSuccess } = useGetProjectTaskTypesQuery({
		projectId,
	});
	let data;
	if (isSuccess) {
		data = taskTypes.map((type) => ({
			id: type.typeId,
			name: type.name,
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
					<div className="flex gap-2">
						<TypeContext.Provider
							value={{
								projectId,
								typeId: row.id,
								init: row.name,
							}}
						>
							<EditType />
							<DeleteType />
						</TypeContext.Provider>
					</div>
				);
			},
		},
	];

	return (
		<div className="m-2 p-2">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold hover:underline mb-3">Task Types</h2>
				<TypeContext.Provider value={{ projectId }}>
					<CreateType />
				</TypeContext.Provider>
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

export default Types;
