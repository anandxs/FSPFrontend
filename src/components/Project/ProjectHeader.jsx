import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	useGetProjectQuery,
	useUpdateProjectMutation,
} from "../../features/project/projectApiSlice";
import ArchiveProject from "./ArchiveProject";
import DeleteProject from "./DeleteProject";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import ExitProject from "./ExitProject";

const ProjectHeader = ({ projectId }) => {
	const [updateNameToggle, setUpdateNameToggle] = useState(false);
	const [groupToggle, setGroupToggle] = useState(false);
	const [cardToggle, setCardToggle] = useState(false);

	const { data } = useGetProjectQuery({ projectId });
	const [updateProject] = useUpdateProjectMutation();

	const form = useForm();

	const { register, formState, handleSubmit, setValue } = form;
	const { errors } = formState;

	const onSubmit = ({ projectName }) => {
		const body = {
			name: projectName,
		};
		updateProject({
			projectId,
			body,
		})
			.unwrap()
			.then(() => {
				setUpdateNameToggle(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleGroupToggle = () => {
		setGroupToggle(!groupToggle);
	};

	const handleCardToggle = () => {
		setCardToggle(!cardToggle);
	};

	const { id } = useSelector(selectCurrentUser);
	const { role, ownerId } = useSelector(selectCurrentProjectRole);

	return (
		<div className="bg-blue-300 py-2 flex flex-row justify-between px-4">
			<div className="flex flex-row gap-3">
				{updateNameToggle ? (
					<form
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						className="flex flex-row gap-1"
					>
						<input
							type="text"
							className="rounded bg-blue-100 border-black-1 w-32"
							{...register("projectName", {
								required: "Project name is requried.",
							})}
						/>
						<p className="text-xs text-red-600">
							{errors?.projectName?.message}
						</p>
						<button
							type="submit"
							className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
						>
							Ok
						</button>
						<button
							onClick={() => setUpdateNameToggle(false)}
							button="button"
							className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
						>
							Cancel
						</button>
					</form>
				) : (
					<p
						className="text-md font-bold"
						onClick={() => {
							setValue("projectName", data?.name);
							setUpdateNameToggle(true);
						}}
					>
						{data?.name}
					</p>
				)}
			</div>
			<div className="flex flex-row gap-2">
				{/* <button
						className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
						onClick={handleGroupToggle}
					>
						Create Group
					</button>
					{groupToggle && (
						<Modal action={handleGroupToggle}>
							<CreateGroupModal handleGroupToggle={handleGroupToggle} />
						</Modal>
					)} */}
				{/* <button
						className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
						onClick={handleCardToggle}
					>
						Create Card
					</button>
					{cardToggle && (
						<Modal action={handleCardToggle}>
							<CreateCardModal handleCardToggle={handleCardToggle} />
						</Modal>
					)} */}
				<>
					<ArchiveProject params={{ projectId }} data={data} />
					<DeleteProject params={{ projectId }} />
				</>
				{ownerId !== id && <ExitProject />}
			</div>
		</div>
	);
};

export default ProjectHeader;
