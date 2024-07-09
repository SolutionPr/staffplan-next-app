import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import arc from "../../../assets/images/archieve.png";
import { FiPlus } from "react-icons/fi";
import AddProject from "../../modal/AddProject";
const StaffPlan = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [defModal, setDefaultModal] = React.useState("newProject");
  const handleOpen = () => setOpen(true);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const weeks = ["W1", "W2", "W3", "W4"];
  const monthsToShow = 4;

  const [data, setData] = useState([
    {
      client: "Ipsos",
      projects: [
        {
          name: "Flow Phase 2",
          signed: new Array(months.length * weeks.length).fill(""),
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 210,
          rightField2: 218,
        },
        {
          name: "Facto Phase 2",
          signed: new Array(months.length * weeks.length).fill(""),
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 50,
          rightField2: 13,
        },
      ],
    },
    {
      client: "GoInvo",
      projects: [
        {
          name: "Hiring",
          signed: new Array(months.length * weeks.length).fill(""),
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 2040,
          rightField2: 962,
        },
        {
          name: "Marketing",
          signed: new Array(months.length * weeks.length).fill(""),
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 724,
          rightField2: 13,
        },
      ],
    },
    {
      client: "State of MA",
      projects: [
        {
          name: "DUA Employee UI Phase I",
          signed: new Array(months.length * weeks.length).fill(""),
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 320,
          rightField2: 0,
        },
        {
          name: "DUA Employee UI Phase II",
          signed: new Array(months.length * weeks.length).fill(""),
          actual: new Array(months.length * weeks.length).fill(""),
          rightField1: 60,
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

  const handleSignedChange = (clientIndex, projectIndex, weekIndex, event) => {
    const newValue = event.target.value;
    setData((prevData) => {
      const newData = [...prevData];
      newData[clientIndex].projects[projectIndex].signed[weekIndex] = newValue;
      return newData;
    });
  };

  const handleActualChange = (clientIndex, projectIndex, weekIndex, event) => {
    const newValue = event.target.value;
    setData((prevData) => {
      const newData = [...prevData];
      newData[clientIndex].projects[projectIndex].actual[weekIndex] = newValue;
      return newData;
    });
  };

  return (
    <div className="bg-[#E9EAF2] py-[10px]">
      <AddProject open={open} setOpen={setOpen} setDefaultModal={setDefaultModal} defModal={defModal} />
      <div className="container mx-auto px-[15px]">
        <div className="overflow-x-auto flex justify-center">
          <table>
            <thead className="">
              <tr>
                <th className="text-left align-top w-[100px] max-w-[100px] max-w-[100px]  border-b border-[#d5d5d5] px-[15px] py-[15px] min-w-[90px]">
                  <span className="text-[14px] font-[400] leading-[17px] text-left text-[#23324C] cursor-pointer">
                    <div style={{ display: "flex", alignItems: "center" }} onClick={handleOpen}>
                      <span>
                        <FiPlus />
                      </span>
                      <span> Client</span>
                    </div>
                  </span>
                </th>
                <th className="text-left align-top w-[100px] max-w-[100px] max-w-[100px] px-[15px] py-[15px]">
                  <span className="text-[14px] font-[400] leading-[17px] text-left text-[#23324C]">Project </span>
                </th>
                <th className="align-top px-[15px] py-[15px]  w-[100px] max-w-[100px] max-w-[100px]">
                  {" "}
                  <button onClick={handlePrevMonth} className="p-2 bg-[none] rounded-full">
                    <MdKeyboardArrowLeft size={22} />
                  </button>
                </th>
                {months.slice(currentMonthIndex, currentMonthIndex + monthsToShow).flatMap((month, monthIndex) =>
                  weeks.map((week, weekIndex) => (
                    <th key={`${month}-${week}`} className="text-[14px] font-[400] leading-[17px] text-center text-[#23324C] align-center">
                      {week} <br />
                      {week == "W1" ? month : ""}
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
                            className="align-top cursor-pointer w-[100px] max-w-[100px] max-w-[100px] border-t border-[#d5d5d5] px-[15px] py-[15px] text-[14px] font-[400] leading-[17px] text-left text-[#23324C] align-top px-[15px] py-[15px]"
                          >
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <span>
                                <FiPlus />
                              </span>
                              <span> {client.client}</span>
                            </div>
                          </td>
                        )}
                        <td className="text-[14px] font-[700] w-[100px] max-w-[100px] max-w-[100px] leading-[17px] text-left text-[#23324C] align-top px-[15px] py-[15px] ">
                          {project.name}
                        </td>
                        <td className="text-[14px] font-[400] w-[100px] max-w-[100px] max-w-[100px] leading-[17px] text-left text-[#23324C] align-top px-[15px] py-[15px]">
                          <div className="flex flex-col items-center">
                            <span className="mt-[4px]">Signed</span>
                            <br />
                            <span>Actual</span>
                          </div>
                        </td>
                        {months.slice(currentMonthIndex, currentMonthIndex + monthsToShow).flatMap((month, monthIndex) =>
                          weeks.map((week, weekIndex) => (
                            <React.Fragment key={`${month}-${weekIndex}`}>
                              <td className="align-top px-[15px] py-[15px] w-[40px] max-w-[40px] max-w-[40px]">
                                <div className="flex flex-col items-center">
                                  <input
                                    style={{
                                      boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset",
                                    }}
                                    type="text"
                                    value={project.signed[monthIndex * weeks.length + weekIndex]}
                                    onChange={(event) => handleSignedChange(clientIndex, projectIndex, monthIndex * weeks.length + weekIndex, event)}
                                    className="w-10 p-1 text-center border border-gray-300 rounded mb-[10px] text-xs rounded-[3px] text-[#23324C] text-left font-[400] text-[14px] leading-[17px] h-[25px] w-[34px] px-[15px] outline-[#27B5B0] focus:outline"
                                  />
                                  <input
                                    style={{
                                      boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px inset",
                                    }}
                                    type="text"
                                    value={project.actual[monthIndex * weeks.length + weekIndex]}
                                    onChange={(event) => handleActualChange(clientIndex, projectIndex, monthIndex * weeks.length + weekIndex, event)}
                                    className="w-10 p-1 text-center border border-gray-300 rounded text-xs rounded-[3px] text-[#23324C] text-left font-[400] text-[14px] leading-[17px] h-[25px] w-[34px] px-[15px] outline-[#27B5B0] focus:outline"
                                  />
                                </div>
                              </td>
                            </React.Fragment>
                          ))
                        )}
                        <td className="text-[14px] font-[400] w-[100px] max-w-[100px] max-w-[100px] leading-[17px] text-left text-[#23324C] align-top px-[15px] py-[15px]">
                          <div className="flex flex-col items-center">
                            <span className="mt-[4px]"> {project.rightField1}</span>
                            <br />
                            <span> {project.rightField2}</span>
                          </div>
                        </td>
                        <td className="align-top text-right w-[100px] max-w-[100px] max-w-[100px] px-[15px] py-[15px] text-[14px] font-[400] leading-[17px] text-left text-[#23324C] align-top px-[15px] py-[15px]">
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
