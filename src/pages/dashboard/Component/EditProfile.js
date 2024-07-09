import React from 'react'
import save from "../../../assets/images/save.png";
import Rectangle from "../../../assets/images/box.png";
function EditProfile({setPage}) {
  return (
    <div>
        <div className="flex justify-between items-center px-[15px] container mx-auto">
          <ul className="flex ">
            <li>
              <img src={Rectangle} alt="" className="w-[92px] h-[67px]" />
            </li>
            <li>
              <div className="px-[15px]">
                <input style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
                  className=" text-[18px] font-[600] w-[193px] h-[43px] leading-[24px] text-left text-black py-[6px] px-[15px] mb-[5px]  rounded-[3px] block"
                  value={"Juhan"}
                />
                <input style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
                  className=" text-[14px] w-[193px] h-[25px] font-[600] leading-[24px] text-left text-black py-[2px] px-[15px]  mb-[5px]  rounded-[3px] block"
                  value={"Sonin"}
                />
                <input style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
                  className=" text-[14  px]  w-[193px] h-[25px]font-[600] leading-[4px] text-left text-black py-[2px] px-[15px]  mb-[5px]  rounded-[3px] block"
                  value={"juhan@goinvo.com"}
                />
                <input style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  className='w-[17px] h-[17px] relative top-[3px] mr-[4px]'
                />
                <label for="admin" className="font-[400] text-[14] leading-[17px] text-white ">Admin</label>
              </div>
            </li>
            <li>
              <img src={save} alt="" className="w-[18px] h-[18px] cursor-pointer" onClick={()=>{setPage("profile")}}/>
            </li>
          </ul>
          <ul className="flex items-center"></ul>
        </div>
    </div>
  )
}

export default EditProfile
