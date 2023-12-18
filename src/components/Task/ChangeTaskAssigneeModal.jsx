import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectMembersQuery } from "../../features/member/memberApiSlice";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useContext } from "react";
import { TaskContext } from "./Task";

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
	} else if (isError) {
		console.log(error);
	}

	const [updateTaskAsync] = useUpdateTaskMutation();
	const onSubmit = ({ assigneeId }) => {
		const { title, dueDate, description, stage, type } = task;

		const body = {
			assigneeId: assigneeId === "" ? null : assigneeId,
			title,
			description,
			dueDate,
			stageId: stage?.stageId,
			typeId: type?.typeId,
		};

		updateTaskAsync({ projectId, taskId, body })
			.unwrap()
			.then(() => {
				handleToggle();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Change Assignee</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<label htmlFor="assignee" className="font-semibold text-md block">
						Member
					</label>
					<select
						id="assignee"
						className="block w-full text-xs p-1"
						{...register("assigneeId")}
					>
						<option value={""}>Unassign</option>
						{isLoading && <option>Loading</option>}
						{memberOptions}
					</select>
					<p className="text-red-600">{errors?.assigneeId?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-md font-bold px-3 py-0.5 rounded w-full"
				>
					Update
				</button>
			</form>
		</div>
	);
};

export default ChangeTaskAssigneeModal;
