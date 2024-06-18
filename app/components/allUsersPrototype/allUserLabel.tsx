import Image from "next/image";
import React from "react";
import { AllUserLabelProps } from "../../typeInterfaces";
import EllipsisPeopleMenu from "../ellipsisPeopleMenu";

export const AllUserLabel = ({ user, clickHandler }: AllUserLabelProps) => {
	return (
		<div className="hover:cursor-pointer z-1 w-64 absolute left-0">
			<div
				className="flex w-12 h-12 timeline-grid-bg rounded-full overflow-hidden"
				onClick={() => clickHandler(user)}
			>
				<Image
					src={`${user.avatarUrl}`}
					alt="client avatar"
					width={500}
					height={500}
				/>
			</div>
			<div className="text-sm">{user.name}</div>
			<div
				className="hover:cursor-pointer"
				onClick={() => clickHandler(user)}
			></div>
			<EllipsisPeopleMenu user={user} />
		</div>
	);
};
