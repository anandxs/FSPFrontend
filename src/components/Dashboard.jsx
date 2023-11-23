import { useNavigate, useParams } from "react-router-dom";
import { useGetCardsForProjectQuery } from "../features/card/cardApiSlice";

const Dashboard = () => {
	const { ownerId, projectId } = useParams();
	const { data, isLoading, isSuccess, isError, errors } =
		useGetCardsForProjectQuery({ ownerId, projectId });

	const navigate = useNavigate();

	const goToCard = (card) => {
		const cardState = {
			cardId: card.cardId,
			title: card.title,
			description: card.description,
			group: {
				groupId: card.group.groupId,
				groupName: card.group.name,
			},
		};
		navigate(
			`/${ownerId}/projects/${projectId}/groups/${card.group.groupId}/cards/${card.cardId}`,
			{
				state: { ownerId, projectId, cardId: card.cardId },
			}
		);
	};

	let content = "";
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = (
			<table className="table-fixed w-10/12 mt-3 border border-black">
				<thead className="table-header-group bg-primary text-white">
					<tr>
						<th className="text-left text-sm px-2 py-1 border border-black">
							Title
						</th>
						<th className="text-left text-sm px-2 py-1 border border-black">
							Group
						</th>
						<th className="text-left text-sm px-2 py-1 border border-black">
							Description
						</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((c) => (
						<tr key={c.cardId}>
							<td
								className="px-2 py-1 text-sm border border-black hover:underline"
								onClick={() => goToCard(c)}
							>
								{c.title}
							</td>
							<td className="px-2 py-1 text-sm border border-black">
								{c.group?.name}
							</td>
							<td className="px-2 py-1 text-sm border border-black">
								{c.description ? c.description : "- -"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	} else if (isError) {
		console.log(errors);
	}

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<h1 className="text-xl font-bold hover:underline">Dashboard</h1>
			{content}
		</div>
	);
};

export default Dashboard;
