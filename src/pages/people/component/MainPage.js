import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import arc from "../../../assets/images/archieve.png";
import { FiPlus } from "react-icons/fi";
import SingleVerticalBarGraph from "../../chart/SingleVerticalBarGraph";
import { FaCircleUser } from "react-icons/fa6";

const StaffPlan = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [defModal, setDefaultModal] = useState("newProject");
  const handleOpen = () => setOpen(true);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const weeks = ["W1", "W2", "W3", "W4"];
  const monthsToShow = 4;

  const [data, setData] = useState([
    {
      client: "GoInvo",
      projects: [
        {
          name: "Flow Phase",
          signed: [75, 90, 15, 20, 75, 30, 95, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 210,
          rightField2: 218,
        },
      ],
    },
    {
      client: "GoInvo",
      projects: [
        {
          name: "Hiring",
          signed: [55, 66, 15, 20, 65, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 2040,
          rightField2: 962,
        },
      ],
    },
    {
      client: "GoInvo",
      projects: [
        {
          name: "DUA Employee UI Phase I",
          signed: [55, 70, 75, 20, 85, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 320,
          rightField2: 0,
        },
      ],
    },
  ]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => Math.min(prev + 1, months.length - monthsToShow));
  };

  return (
    <div className="bg-[#E9EAF2] py-[10px]">
      <div className="container mx-auto px-[15px]">
        <div className="overflow-x-auto flex justify-center">
          <table>
            <thead>
              <tr>
                <th className="text-left align-top w-[100px] max-w-[100px] border-b border-[#d5d5d5] px-[15px] py-[15px] min-w-[90px]">
                  <span className="text-[14px] font-[400] leading-[17px] text-left text-[#23324C] cursor-pointer">
                    <div style={{ display: "flex", alignItems: "center" }} onClick={handleOpen}>
                      <span>
                        <FiPlus />
                      </span>
                      <span> People</span>
                    </div>
                  </span>
                </th>
                <th className="text-left align-top w-[100px] max-w-[100px] px-[15px] py-[15px]"></th>
                <th className="align-top px-[15px] py-[15px] w-[100px] max-w-[100px]">
                  <button onClick={handlePrevMonth} className="p-2 bg-[none] rounded-full">
                    <MdKeyboardArrowLeft size={22} />
                  </button>
                </th>
                {months.slice(currentMonthIndex, currentMonthIndex + monthsToShow).flatMap((month, monthIndex) =>
                  weeks.map((week, weekIndex) => (
                    <th key={`${month}-${week}`} className="text-[14px] font-[400] leading-[17px] text-center text-[#23324C] align-center">
                      {week} <br />
                      {week === "W1" ? month : ""}
                    </th>
                  ))
                )}
                <th className="align-top text-left px-[15px] py-[15px]">
                  <button onClick={handleNextMonth} className="p-2 bg-[none] rounded-full">
                    <MdOutlineKeyboardArrowRight size={22} />
                  </button>
                </th>
                <th className="align-top "></th>
              </tr>
            </thead>
            <tbody>
              {data.map((client, clientIndex) => (
                <React.Fragment key={clientIndex}>
                  {client.projects.map((project, projectIndex) => (
                    <React.Fragment key={projectIndex}>
                      <tr className={projectIndex === 0 ? "border-t border-[#d5d5d5]" : ""}>
                        {projectIndex === 0 && (
                          <td
                            rowSpan={client.projects.length}
                            className="align-top cursor-pointer w-[100px] max-w-[100px] border-t border-[#d5d5d5] px-[15px] py-[15px] text-[14px] font-[700] leading-[17px] text-left text-[#23324C]"
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <span>
                                <FaCircleUser />
                              </span>
                              <span> {client.client}</span>
                            </div>
                          </td>
                        )}
                        <td className="text-[14px] font-[700] w-[100px] max-w-[100px] leading-[17px] text-left text-[#23324C] align-top px-[15px] py-[15px]">
                          {/* {project.name} */}
                        </td>
                        <td className="text-[14px] font-[400] w-[100px] max-w-[100px] leading-[17px] text-left text-[#23324C] align-top px-[15px] py-[15px]"></td>
                        {months.slice(currentMonthIndex, currentMonthIndex + monthsToShow).flatMap((month, monthIndex) =>
                          weeks.map((week, weekIndex) => (
                            <td key={`${month}-${weekIndex}`} className="align-top px-[15px] py-[15px] w-[40px] max-w-[40px]">
                              <div className="flex flex-col items-center">
                                <SingleVerticalBarGraph
                                  value={project.signed[monthIndex * weeks.length + weekIndex]}
                                  maxValue={110}
                                  width="50px"
                                  height="200px"
                                  barColor="#27b5b0"
                                  Color={"black"}
                                />
                              </div>
                            </td>
                          ))
                        )}
                        <td className="text-[14px] font-[400] w-[100px] max-w-[100px] leading-[17px] text-left text-[#23324C] align-top px-[15px] py-[15px]">
                          <div className="flex flex-col items-center">
                            <span className="mt-[4px]"></span>
                            <br />
                            <span></span>
                          </div>
                        </td>
                        <td className="align-top text-right w-[100px] max-w-[100px] px-[15px] py-[15px] text-[14px] font-[400] leading-[17px] text-left text-[#23324C]">
                          <img src={arc} alt="" className="w-[17px] h-[15px] cursor-pointer" />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffPlan;
