const Confirmation = ({ message, isLoading, success, cancel }) => {
	return (
		<div
			className="bg-accent p-3 w-screen sm:w-1/3"
			onClick={(e) => e.stopPropagation()}
		>
			<h2 className="text-center text-2xl font-bold py-1 text-black">
				Are you sure?
			</h2>
			<p className="text-sm m-3 mt-2">{message}</p>
			<div className="flex justify-around">
				<button
					type="button"
					className="w-2/5 bg-primary text-white text-sm text-bold px-3 py-1 rounded disabled:opacity-50"
					onClick={success}
					disabled={isLoading}
				>
					{isLoading ? "Loading..." : "Yes"}
				</button>
				<button
					type="button"
					className="w-2/5 bg-orange-600 text-white text-sm text-bold px-3 py-1 rounded"
					onClick={cancel}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default Confirmation;
