import { useState } from "react";
import Modal from "../Modal/Modal";
import ChangeDescriptionModal from "./ChangeDescriptionModal";

const TaskDescription = ({ description }) => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="col-span-12 mb-3">
			{description ? (
				<div>
					<div className="flex gap-2 items-center">
						<h2 className="underline font-semibold text-lg mb-1">
							Description
						</h2>
						<button
							onClick={handleToggle}
							className="bg-primary text-white p-1"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
						</button>
					</div>
					<p>{description}</p>
				</div>
			) : (
				<button
					onClick={handleToggle}
					className="bg-primary text-white text-sm px-2 py-1 rounded"
				>
					Add Description
				</button>
			)}
			{toggle && (
				<Modal action={handleToggle}>
					<ChangeDescriptionModal handleToggle={handleToggle} />
				</Modal>
			)}
		</div>
	);
};

export default TaskDescription;