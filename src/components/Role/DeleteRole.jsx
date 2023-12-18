import { useContext, useState } from "react";
import { useDeleteRoleMutation } from "../../features/role/roleApiSlice";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";
import { RoleContext } from "./Roles";

const DeleteStage = () => {
	const [toggleDelete, setToggleDelete] = useState(false);

	const { projectId, roleId } = useContext(RoleContext);

	const [deleteRoleAsync] = useDeleteRoleMutation();

	const handleDelete = () => {
		deleteRoleAsync({
			projectId,
			roleId,
		})
			.unwrap()
			.then(() => {
				// success logic
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleToggle = () => {
		setToggleDelete(!toggleDelete);
	};

	return (
		<>
			<button
				className="bg-orange-500 text-white px-3 py-0.5 text-sm rounded-sm"
				onClick={handleToggle}
			>
				Delete
			</button>
			{toggleDelete && (
				<Modal action={handleToggle}>
					<Confirmation success={handleDelete} cancel={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default DeleteStage;
