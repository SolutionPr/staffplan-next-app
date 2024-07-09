import React, { useState } from "react";
import SingleVerticalBarGraph from "../../chart/SingleVerticalBarGraph";

function Header() {
  const [page, setPage] = useState("profile");
  const signed = [55, 70, 75, 20, 85, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];

  return (
    <div>
      <div className="bg-[#23324C] relative">
        <div className={`relative ${page === "profile" ? "pt-[20px]" : "pt-[60px]"} bottom-[-1px] container px-[15px] mx-auto`}>
          <div className="absolute bottom-[15px] left-[15px] z-[99]">
            <a className="text-[28px] font-[700] leading-[24px] text-left text-white py-[30px] px-[15px] rounded-[8px] block" href="">
              People
            </a>
          </div>
          <div className="flex justify-center">
            <table>
              <tbody>
                <tr className="">
                  <td className="align-top cursor-pointer w-[100px] px-[15px] text-[14px] font-[400] leading-[17px] text-left text-[#23324C]"></td>
                  <td className="text-[14px] font-[700] leading-[17px] w-[100px] text-left text-[#23324C] px-[15px]"></td>
                  <td className="text-[14px] font-[400] leading-[17px] w-[100px] text-left text-[#23324C] px-[15px]"></td>
                  {signed.map((value, index) => (
                    <td key={index} className="align-top w-[40px] max-w-[40px]">
                      <div className="flex flex-col items-center">
                        <SingleVerticalBarGraph
                          value={value}
                          maxValue={100}
                          width="50px"
                          height="200px"
                          barColor={index % 2 === 0 ? "#E9EAF2" : "#27b5b0"}
                        />
                      </div>
                    </td>
                  ))}
                  <td className="text-[14px] font-[400] leading-[17px] w-[100px] max-w-[100px] text-left text-[#23324C] py-[15px]"></td>
                  <td className="align-top text-right px-[15px] w-[100px] max-w-[100px] text-[14px] font-[400] leading-[17px] text-left text-[#23324C] px-[15px] py-[15px]"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
