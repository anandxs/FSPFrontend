import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiSlice } from "../../../app/api/apiSlice";

const AddAttachmentModal = ({ handleToggle }) => {
	const { projectId, taskId } = useParams();

	const [file, setFile] = useState();
	const [error, setError] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!file) {
			setError("File is requried.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);
		fetch(
			`${
				import.meta.env.VITE_BASE_URL
			}/api/projects/${projectId}/tasks/${taskId}/attachments`,
			{
				method: "POST",
				body: formData,
				credentials: "include",
			}
		)
			.then((response) => {
				if (response.status == 204) {
					handleToggle();
					apiSlice.util.invalidateTags(["Attachments"]);
				} else if (response.status == 400) {
					setError("Duplicate name. Rename and try again.");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateFile = (e) => {
		setFile(e.target.files[0]);
		setError(null);
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Add Attachment</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="mb-3">
					<input type="file" onChange={updateFile} />
					<p className="text-red-600">{error && error}</p>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-md font-bold px-3 py-0.5 rounded w-full"
				>
					Upload
				</button>
			</form>
		</div>
	);
};

export default AddAttachmentModal;
