import React from 'react'

function NewPersom() {
  return (
    <div>
    <div className="mb-[20px]">
           <label className="mb-[4px] w-[100%] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
             First Name
           </label>
           <input
             style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
             className="rounded-[3px]  text-[#12324c] text-left font-[700] text-[28px] leading-[24px] h-[43px] w-[100%] px-[15px]"
             type="text"
             value={"Steven"}
           />
         </div>
         <div className="mb-[20px]">
           <label className="mb-[4px] w-[100%] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
             Last Name
           </label>
           <input
             style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
             className="rounded-[3px]  text-[#12324c] text-left font-[700] text-[28px] leading-[24px] h-[43px] w-[100%] px-[15px]"
             type="text"
             value={"Maverick"}
           />
         </div>
         <div className="mb-[20px]">
           <label className="mb-[4px] w-[100%] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
             Email
           </label>
           <input
             style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
             className="rounded-[3px] shadow-[0px 1px 1px 0px #00000040 inset] text-[#12324c] text-left font-[400] text-[14px] leading-[17px] h-[25px] w-[100%] px-[15px]"
             type="text"
             value={"test@gmail.com"}
           />
         </div>
         <div className="mb-[20px]">  <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <label for="admin" className=" text-black text-[14px] font-[400] w-[17px] h-[17px]"> Admin</label></div>
        
 </div>
  )
}

export default NewPersom
