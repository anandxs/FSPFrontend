import React from "react";
import ProfilePicAlternative from "./ProfilePicAlternative";

const ProfileCard = () => {
	return (
		<div className="flex items-center gap-5 md:w-3/4 m-1 sm:mx-auto sm:mt-8">
			<div
				className={`bg-green-600 p-2 rounded-full h-16 w-16 flex justify-center items-center`}
			>
				<div className="text-white font-bold text-xl">
					<ProfilePicAlternative />
				</div>
			</div>
			<div className="">
				<h1 className="text-lg font-bold">Full Name</h1>
				<h2 className="">email@mail.com</h2>
			</div>
		</div>
	);
};

export default ProfileCard;
