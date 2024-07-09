import React from "react";
import profile from "../../../assets/images/profile.png";
import Pen from "../../../assets/images/edit-pen.png";
function Profile({ setPage }) {
  return (
    <div>
      <div className="flex justify-between items-center container px-[15px] mx-auto">
        <ul className="flex items-center">
          <li>
            <img src={profile} alt="" className="w-[92px] h-[67px]" />
          </li>
          <li>
            <a
              className=" text-[28px] font-[700] leading-[24px] text-left text-white py-[6px] px-[15px]  rounded-[8px] block "
              href=""
            >
              Juhan Sonin
            </a>
          </li>
          <li>
            <img
              src={Pen}
              alt=""
              className="w-[16px] h-[16px] cursor-pointer"
              onClick={() => setPage("edit")}
            />
          </li>
          <li>
            {/* <AddProject /> */}
          </li>
        </ul>
        <ul className="flex items-center"></ul>
      </div>
    </div>
  );
}

export default Profile;
