import { useState } from "react";
import { useDeleteRoleMutation } from "../../features/defaultRole/defaultRoleApiSlice";
import Modal from "../Modal/Modal";
import Confirmation from "../Confirmation";

const DeleteRole = ({ params }) => {
	const [toggleDelete, setToggleDelete] = useState(false);

	const [deleteRole] = useDeleteRoleMutation();

	const handleDelete = () => {
		const { roleId } = params;
		deleteRole({
			roleId,
		})
			.unwrap()
			.then(() => {
				console.log("success");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDeleteToggle = () => {
		setToggleDelete(!toggleDelete);
	};

	return (
		<>
			<button
				className="bg-orange-500 text-white px-3 py-0.5 text-sm rounded-sm"
				onClick={handleDeleteToggle}
			>
				Delete
			</button>
			{toggleDelete && (
				<Modal action={handleDeleteToggle}>
					<Confirmation success={handleDelete} cancel={handleDeleteToggle} />
				</Modal>
			)}
		</>
	);
};

export default DeleteRole;
