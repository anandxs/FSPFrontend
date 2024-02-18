import { useState } from "react";
import Modal from "../Modal/Modal";
import EditTypeModal from "./EditTypeModal";

const EditType = () => {
	const [toggleEdit, setToggleEdit] = useState(false);

	const handleToggle = () => {
		setToggleEdit(!toggleEdit);
	};

	return (
		<>
			<button
				className="inline-block rounded bg-blue-600 px-3 py-1 text-xs font-medium text-gray-50 transition hover:shadow-xl focus:outline-none focus:ring active:bg-blue-500 disabled:opacity-50"
				onClick={handleToggle}
			>
				<span className="hidden sm:block text-xs p-0.5 font-semibold">
					Edit
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-3 h-3 sm:hidden"
				>
					<path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
				</svg>
			</button>
			{toggleEdit && (
				<Modal action={handleToggle}>
					<EditTypeModal handleToggle={handleToggle} />
				</Modal>
			)}
		</>
	);
};

export default EditType;
