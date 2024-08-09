import React from "react";
import { MdOutlineAddBox } from "react-icons/md";

const NewButton = ({ modalId, onClick, title, btnSize = "btn-xs", icon = <MdOutlineAddBox className="text-lg " /> }) => {
	return (
		<label
			htmlFor={`${modalId}`}
			onClick={onClick ? () => onClick() : null}
			className={`btn ${btnSize} gap-x-2 modal-button  bg-[#E87722] border-[#E87722] text-white hover:bg-[#d76611] hover:border-[#d76611]`}>
			{icon}
			{title ? title : "crear"}
		</label>
	);
};

export default NewButton;
