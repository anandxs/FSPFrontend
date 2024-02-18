import { useSelector } from "react-redux";
import ProfilePicAlternative from "./ProfilePicAlternative";
import { selectCurrentUser } from "../../features/auth/authSlice";

const ProfileCard = () => {
	const user = useSelector(selectCurrentUser);
	return (
		<div className="flex items-center gap-5 w-10/12 md:w-3/4 mt-8 mx-auto">
			<div
				className={`bg-${user.color}-600 p-2 rounded-full h-12 w-12 sm:h-16 sm:w-16 flex justify-center items-center`}
			>
				<div className="text-gray-50 font-bold text-xl">
					<ProfilePicAlternative />
				</div>
			</div>
			<div className="">
				<h1 className="text-lg font-bold">{user?.name}</h1>
				<h2 className="">{user?.email}</h2>
			</div>
		</div>
	);
};

export default ProfileCard;
