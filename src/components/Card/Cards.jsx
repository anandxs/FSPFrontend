import { useNavigate, useParams } from "react-router-dom";
import { useGetCardsForProjectQuery } from "../../features/card/cardApiSlice";
import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";
import CardFilter from "./CardFilter";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentFilters } from "../../features/filter/filterSlice";

const Cards = () => {
	const { projectId } = useParams();
	const { data: cards, isSuccess } = useGetCardsForProjectQuery({ projectId });

	const navigate = useNavigate();

	const goToCard = ({ cardId }) => {
		navigate(`/projects/${projectId}/cards/${cardId}`, {
			state: { projectId, cardId: cardId },
		});
	};

	const columns = [
		{
			name: "Title",
			selector: (row) => row.title,
			sortable: true,
		},
		{
			name: "Group",
			selector: (row) => row.group,
			sortable: true,
		},
		{
			name: "Description",
			selector: (row) => row.description,
			sortable: true,
		},
		{
			name: "Due Date",
			selector: (row) => row.dueDate,
			sortable: true,
			cell: (row) => {
				const date =
					row.dueDate !== null ? new Date(row.dueDate).toDateString() : "- -";
				return (
					<p
						className={`${
							row.dueDate !== null && new Date(row.dueDate) < Date.now()
								? "bg-red-600 px-2 py-1 text-white rounded"
								: ""
						}`}
					>
						{date}
					</p>
				);
			},
		},
	];

	const { groups } = useSelector(selectCurrentFilters);

	let data;
	if (isSuccess) {
		data = cards
			.filter((c) => {
				if (groups.length === 0) return c;
				if (groups.includes(c?.group?.groupId)) return c;
			})
			.map((c) => ({
				cardId: c.cardId,
				title: c.title,
				group: c.group.name,
				description:
					c.description === null ? "- -" : c.description.substring(0, 30),
				dueDate: c.dueDate,
			}));
	}

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<div className="flex justify-between mb-3">
				<h1 className="text-xl font-bold hover:underline">Cards</h1>
				<CardFilter />
			</div>
			<DataTable
				customStyles={customStyles}
				pagination
				onRowClicked={goToCard}
				columns={columns}
				data={data}
			/>
		</div>
	);
};

export default Cards;
