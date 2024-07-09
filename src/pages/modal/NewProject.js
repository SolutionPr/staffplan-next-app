import React from 'react'

function NewProject() {
  return (
    <div>
       <div className="mb-[20px]">
              <label className="mb-[4px] w-[100%] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
                Project Name
              </label>
              <input
                style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
                className="rounded-[3px]  text-[#12324c] text-left font-[700] text-[28px] leading-[24px] h-[43px] w-[100%] px-[15px]"
                type="text"
                value={"Flow Phase II"}
              />
            </div>
            <div className="mb-[20px]">
              <label className="mb-[4px] w-[100%] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
                Client
              </label>
              <input
                style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
                className="rounded-[3px] shadow-[0px 1px 1px 0px #00000040 inset] text-[#12324c] text-left font-[400] text-[14px] leading-[17px] h-[25px] w-[100%] px-[15px]"
                type="text"
                value={"Ipsos"}
              />
            </div>
            <div className="mb-[20px]">
              <label className="mb-[4px] w-[100%] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
                Budget (optional)
              </label>
              <input
                style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
                className="rounded-[3px] shadow-[0px 1px 1px 0px #00000040 inset] text-[#12324c] text-left font-[400] text-[14px] leading-[17px] h-[25px] w-[100%] px-[15px]"
                type="text"
                value={"$240,000"}
              />
            </div>
            <div className="mb-[20px]">
              <div className="flex justify-between items-center flex-wrap">
                <label className="mb-[4px] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
                  Budget (optional)
                </label>
                <p className="mb-[4px] block text-[#23324C] text-left font-[400] text-[14px] leading-[17px]">
                  $240,000 / $190/h = 3,200h
                </p>
              </div>
              <input
                style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset" }}
                className="rounded-[3px] shadow-[0px 1px 1px 0px #00000040 inset] text-[#12324c] text-left font-[400] text-[14px] leading-[17px] h-[25px] w-[100%] px-[15px]"
                type="text"
                value={"$240,000"}
              />
            </div>
            <div className="mb-[20px]">
              <ul className="flex justify-between items-center flex-wrap mb-[20px]">
                <li className="w-[48%]">
                  <label className="mb-[4px] w-[100%] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
                    Start Date (optional)
                  </label>
                  <input
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset",
                    }}
                    className="rounded-[3px] shadow-[0px 1px 1px 0px #00000040 inset] text-[#12324c] text-left font-[400] text-[14px] leading-[17px] h-[25px] w-[100%] px-[15px]"
                    type="text"
                    value={"20.Jan.2024"}
                  />
                </li>
                <li className="w-[48%]">
                  <label className="mb-[4px] w-[100%] block text-[#12324c] text-left font-[400] text-[14px] leading-[17px]">
                    End Date (optional)
                  </label>
                  <input
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset",
                    }}
                    className="rounded-[3px] shadow-[0px 1px 1px 0px #00000040 inset] text-[#12324c] text-left font-[400] text-[14px] leading-[17px] h-[25px] w-[100%] px-[15px]"
                    type="text"
                    value={"30.Jun.2024"}
                  />
                </li>
              </ul>
            </div>
    </div>
  )
}

export default NewProject
