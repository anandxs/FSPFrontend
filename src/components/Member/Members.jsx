import { useParams } from "react-router-dom";
import { useGetProjectMembersQuery } from "../../features/member/memberApiSlice";
import AddMember from "./AddMember";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Member from "./Member";

const Members = () => {
	const { ownerId, projectId } = useParams();

	const [toggle, setToggle] = useState(false);
	const [mId, setMId] = useState();

	const handleToggle = (m) => {
		setMId(m?.id);
		setToggle(!toggle);
	};

	const { data, isLoading, isSuccess, isError, error } =
		useGetProjectMembersQuery({
			ownerId,
			projectId,
		});

	let content = "";
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = (
			<table className="table-fixed w-10/12 mt-3 border border-black">
				<thead className="table-header-group bg-primary text-white">
					<tr>
						<th className="text-left text-sm px-2 py-1 border border-black">
							Name
						</th>
						<th className="text-left text-sm px-2 py-1 border border-black">
							Email
						</th>
						<th className="text-left text-sm px-2 py-1 border border-black">
							Role
						</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((m) => (
						<tr key={m?.id}>
							<td
								className="px-2 py-1 text-sm border border-black hover:underline"
								onClick={() => handleToggle(m)}
							>
								{`${m?.user?.firstName} ${m?.user?.lastName}`}
								{toggle && mId === m?.id && (
									<Modal action={handleToggle}>
										<Member
											params={{ ownerId, projectId, memberId: m?.user?.id }}
											member={{ ...m }}
											handleToggle={handleToggle}
										/>
									</Modal>
								)}
							</td>
							<td className="px-2 py-1 text-sm border border-black">
								{m?.user?.email}
							</td>
							<td className="px-2 py-1 text-sm border border-black">
								{m?.projectRole?.name}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	} else if (isError) {
		console.log(error);
	}

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<h1 className="text-xl font-bold hover:underline">Members</h1>
			<AddMember />
			{content}
		</div>
	);
};

export default Members;
