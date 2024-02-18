const Table = ({ data, columns, deleteAction, editAction }) => {
	return (
		<table className="table-fixed w-10/12 mt-3 border border-black">
			<thead className="table-header-group bg-blue-600 text-white">
				<tr>
					{columns?.map((column) => (
						<th
							className="text-left px-2 py-1 border border-black"
							key={column.key}
						>
							{column?.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data?.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{columns.map((column, colIndex) => (
							<td
								className={`px-2 py-1 text-sm border border-black ${
									colIndex === columns.length - 1 && "flex gap-4"
								}`}
								key={column.key}
							>
								{colIndex !== columns.length - 1 ? (
									row[column.key]
								) : (
									<>
										{editAction(row[column.key])}
										{deleteAction(row[column.key])}
									</>
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
