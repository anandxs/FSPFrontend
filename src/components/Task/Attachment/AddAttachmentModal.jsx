import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiSlice } from "../../../app/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";

const AddAttachmentModal = ({ handleToggle }) => {
	const { projectId, taskId } = useParams();
	const [file, setFile] = useState();
	const [error, setError] = useState();
	const { accessToken } = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

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
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
			.then((response) => {
				if (response.status == 204) {
					handleToggle();
					toast.success("Successfully uploaded file.");
					dispatch(apiSlice.util.invalidateTags(["Attachments"]));
				} else if (response.status == 400) {
					setError("Duplicate name. Rename and try again.");
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const updateFile = (e) => {
		setFile(e.target.files[0]);
		setError(null);
	};

	return (
		<div
			className="bg-accent p-2 max-w-screen-sm"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-lg font-semibold mb-2">Add Attachment</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="">
					<input
						type="file"
						onChange={updateFile}
						className="text-xs"
						disabled={isLoading}
					/>
					<p className="text-xs text-red-600">{error && error}</p>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="bg-primary text-white text-xs p-1 disabled:opacity-50"
				>
					{isLoading ? "Uploading..." : "Upload"}
				</button>
			</form>
		</div>
	);
};

export default AddAttachmentModal;
