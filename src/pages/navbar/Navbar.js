import React from "react";
import plusImage from "../../assets/images/plus.png";
import searchImage from "../../assets/images/search.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation()
  return (
    <div className="bg-[#121F35] py-[10px]">
      <div className="flex justify-between items-center container mx-auto flex-wrap px-[15px]">
        <ul className="flex items-center flex-wrap">
          <li>
         <Link to="/">   <a className={`font-sans text-[16px] font-[400] leading-[24px] text-left text-white py-[6px] px-[15px] mr-[15px] rounded-[8px] block ${location.pathname === '/' ? 'bg-[#31425F]' : 'hover:bg-[#31425F]'} `} href="">
              My StaffPlan
            </a></Link>
          </li>
          <li>
            <Link to="/people">
              {" "}
              <a className={`font-sans text-[16px] font-[400] leading-[24px] text-left text-white py-[6px] px-[15px] mr-[15px] rounded-[8px] block ${location.pathname === '/people' ? 'bg-[#31425F]' : 'hover:bg-[#31425F]'} `}>People</a>
            </Link>
          </li>
          <li>
          <Link to="/project">
            <a className="font-sans text-[16px] font-[400] leading-[24px] text-left text-white py-[6px] px-[15px] mr-[15px] rounded-[8px] block hover:bg-[#31425F]" href="">
              Projects
            </a>
            </Link>
          </li>
          <li>
            <a className="font-sans text-[16px] font-[400] leading-[24px] text-left text-white py-[6px] px-[15px] mr-[15px] rounded-[8px] block" href="">
              <img src={plusImage} alt="" className="w-[28px] h-[26px]" />
            </a>
          </li>
        </ul>
        <ul className="flex items-center flex-wrap">
          <li>
            <div className="relative">
              <input className="bg-[#31425F;] h-[34px] w-[225px] pl-[40px] pr-[15px] rounded-[90px]" type="search" />
              <img className="w-[16px] h-[16px] absolute top-[11px] left-[15px]" src={searchImage} alt="" />
            </div>
          </li>
          <li>
            <a className="font-sans text-[16px] font-[400] leading-[24px] text-left text-white py-[6px] px-[15px] ml-[15px] rounded-[8px] block hover:bg-[#31425F]" href="">
              Open Source
            </a>
          </li>
          <li>
            <a className="font-sans text-[16px] font-[400] leading-[24px] text-left text-white py-[6px] px-[15px] ml-[15px] rounded-[8px] block hover:bg-[#31425F]" href="">
              Feedback
            </a>
          </li>
          <li>
            <a className="font-sans text-[16px] font-[400] leading-[24px] text-left text-white py-[6px] px-[15px] ml-[15px] rounded-[8px] block hover:bg-[#31425F]" href="">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
