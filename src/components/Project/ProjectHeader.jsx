import {
	useGetProjectByIdQuery,
	useUpdateProjectNameMutation,
} from "../../features/project/projectApiSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProject } from "../../features/project/projectSlice";
import CreateGroupModal from "../Group/CreateGroupModal";
import Modal from "../Modal/Modal";
import CreateCardModal from "../Card/CreateCardModal";

const ProjectHeader = ({ ownerId, projectId }) => {
	const [updateNameToggle, setUpdateNameToggle] = useState(false);
	const [groupToggle, setGroupToggle] = useState(false);
	const [cardToggle, setCardToggle] = useState(false);

	const { data } = useGetProjectByIdQuery({ ownerId, projectId });
	const [updateProject] = useUpdateProjectNameMutation();

	const dispatch = useDispatch();

	const form = useForm();

	const { register, formState, handleSubmit, setValue } = form;
	const { errors } = formState;

	useEffect(() => {
		dispatch(setProject({ ...data }));
	}, [data]);

	const onSubmit = async ({ projectName }) => {
		try {
			const response = await updateProject({
				ownerId,
				projectId,
				name: projectName,
			}).unwrap();
			setUpdateNameToggle(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleGroupToggle = () => {
		setGroupToggle(!groupToggle);
	};

	const handleCardToggle = () => {
		setCardToggle(!cardToggle);
	};

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
				<button
					className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
					onClick={handleGroupToggle}
				>
					Create Group
				</button>
				{groupToggle && (
					<Modal action={handleGroupToggle}>
						<CreateGroupModal handleGroupToggle={handleGroupToggle} />
					</Modal>
				)}
				<button
					className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
					onClick={handleCardToggle}
				>
					Create Card
				</button>
				{cardToggle && (
					<Modal action={handleCardToggle}>
						<CreateCardModal handleCardToggle={handleCardToggle} />
					</Modal>
				)}
			</div>
		</div>
	);
};

export default ProjectHeader;
