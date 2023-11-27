const Confirmation = ({ success, cancel }) => {
	return (
		<div
			className="bg-accent min-w-max w-1/3 p-3"
			onClick={(e) => e.stopPropagation()}
		>
			<h2 className="text-center text-2xl font-bold py-1">Are you sure?</h2>
			<div className="flex justify-around">
				<button
					type="button"
					className="w-2/5 bg-primary text-white text-sm text-bold px-3 py-1 rounded"
					onClick={success}
				>
					Yes
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
