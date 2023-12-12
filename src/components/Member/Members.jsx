import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectMembersQuery } from "../../features/member/memberApiSlice";
import AddMember from "./AddMember";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tableStyle";
import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../../features/user/userSlice";

const Members = () => {
	const { projectId } = useParams();
	const { data, isSuccess } = useGetProjectMembersQuery({
		projectId,
	});

	const columns = [
		{
			name: "Name",
			selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.user.email,
			sortable: true,
		},
		{
			name: "Role",
			selector: (row) => row.role,
			sortable: true,
		},
	];

	const [filter, setFilter] = useState("");
	let members;
	if (isSuccess) {
		members = data
			.filter((m) => {
				switch (filter) {
					case "ADMIN":
						if (m.role === "ADMIN") {
							return m;
						}
						break;
					case "MEMBER":
						if (m.role === "MEMBER") {
							return m;
						}
						break;
					case "OBSERVER":
						if (m.role === "OBSERVER") {
							return m;
						}
						break;
					default:
						return m;
				}
			})
			.map((m) => m);
	}

	const navigate = useNavigate();

	const goToMember = (member) => {
		navigate(`${member.user.id}`);
	};

	const { role } = useSelector(selectCurrentProjectRole);

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<div className="mb-2 flex justify-between">
				<div className="flex gap-2">
					<h1 className="text-xl font-bold hover:underline">Members</h1>
					{role !== "OBSERVER" && <AddMember />}
				</div>
				<ul className="flex p-0 text-xs">
					<li
						onClick={() => setFilter("ADMIN")}
						className={`border border-black py-1.5 px-1 w-20 text-center ${
							filter === "ADMIN" ? "bg-primary text-white" : "text-black"
						} font-bold`}
					>
						ADMIN
					</li>
					<li
						onClick={() => setFilter("MEMBER")}
						className={`border border-black py-1.5 px-1 w-20 text-center ${
							filter === "MEMBER" ? "bg-primary text-white" : "text-black"
						} font-bold`}
					>
						MEMBER
					</li>
					<li
						onClick={() => setFilter("OBSERVER")}
						className={`border border-black py-1.5 px-1 w-20 text-center ${
							filter === "OBSERVER" ? "bg-primary text-white" : "text-black"
						} font-bold`}
					>
						OBSERVER
					</li>
					<li
						onClick={() => setFilter("")}
						className={`border border-black py-1.5 px-1 w-20 text-center ${
							filter === "" ? "bg-primary text-white" : "text-black"
						} font-bold`}
					>
						ALL
					</li>
				</ul>
			</div>
			<DataTable
				customStyles={customStyles}
				onRowClicked={goToMember}
				pagination
				columns={columns}
				data={members}
			/>
		</div>
	);
};

export default Members;
