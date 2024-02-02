import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectMembersQuery } from "../../features/member/memberApiSlice";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useContext } from "react";
import { TaskContext } from "./Task";
import LoadingButton from "../LoadingButton";

const ChangeTaskAssigneeModal = ({ handleToggle }) => {
	const task = useContext(TaskContext);
	const { assignee } = task;
	const assigneeId = assignee?.id;

	const form = useForm({
		defaultValues: {
			assigneeId,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, taskId } = useParams();

	const { data, isLoading, isSuccess, isError, error } =
		useGetProjectMembersQuery({ projectId });
	let memberOptions;
	if (isSuccess) {
		memberOptions = data.map((member) => (
			<option key={member?.user?.id} value={member?.user?.id}>
				{`${member?.user?.firstName} ${member?.user?.lastName} -- ${member?.role?.name}`}
			</option>
		));
	} else if (isError) console.log(error);

	const [updateTaskAsync, { isLoading: updateLoading, isSubmitting }] =
		useUpdateTaskMutation();
	const onSubmit = async ({ assigneeId }) => {
		const { title, description, stage, type, hoursSpent, totalHours } = task;

		const body = {
			assigneeId: assigneeId === "" ? null : assigneeId,
			title,
			description,
			totalHours,
			hoursSpent,
			stageId: stage?.stageId,
			typeId: type?.typeId,
		};

		try {
			await updateTaskAsync({ projectId, taskId, body }).unwrap();
			handleToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-left">Change Assignee</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
				<div className="space-y-1 text-sm">
					<select
						id="assignee"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("assigneeId")}
					>
						<option value={""}>Unassign</option>
						{isLoading && <option>Loading</option>}
						{memberOptions}
					</select>
					<p className="text-red-600 text-sm">{errors?.assigneeId?.message}</p>
				</div>
				{isSubmitting || updateLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
					>
						Update
					</button>
				)}
			</form>
		</div>
	);
};

export default ChangeTaskAssigneeModal;
