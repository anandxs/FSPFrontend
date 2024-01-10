const Confirmation = ({ message, isLoading, success, cancel }) => {
	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h2 className="text-2xl font-bold text-center">Are you sure?</h2>
			<p className="text-sm m-3 mt-2">{message}</p>
			<div className="flex justify-around gap-2">
				<button
					type="button"
					className="disabled:opacity-50 block w-full p-3 text-center rounded-sm text-gray-50 bg-indigo-950"
					onClick={success}
					disabled={isLoading}
				>
					{isLoading ? "Loading..." : "Yes"}
				</button>
				<button
					type="button"
					className="block w-full p-3 text-center rounded-sm text-gray-50 bg-red-600"
					onClick={cancel}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default Confirmation;
