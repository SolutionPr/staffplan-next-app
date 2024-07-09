import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NewProject from "./NewProject";
import NewPersom from "./NewPersom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "460px",
  width: "100%",
  bgcolor: "#E9EAF2",
  boxShadow: 24,
  borderRadius: "18px",
  p: 4,
};

export default function AddProject({setOpen,defModal,setDefaultModal,open}) {

  const handleClose = () => setOpen(false);

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal__new__project">
            <ul className="flex justify-between items-center flex-wrap mb-[20px]">
              <li className="w-[48%]">
                <button className={`text-[#23324C] rounded-[3px] text-[14px] font-[700] leading-[41px] text-center h-[41px] px-[15px] w-[100%] ${defModal=="newProject"? "bg-[#DDDEEB]" :""} border-solid border-[1px] border-[#DDDEEB]`} onClick={()=>setDefaultModal("newProject")}>
                  New Project
                </button>
              </li>
              <li className="w-[48%]">
                <button className={`text-[#23324C] rounded-[3px] text-[14px] font-[400] leading-[41px] text-center h-[41px] ${defModal=="newPerson"? "bg-[#DDDEEB]" :""} px-[15px] w-[100%] border-solid border-[1px] border-[#DDDEEB]`} onClick={()=>setDefaultModal("newPerson")}>
                  New Person
                </button>
              </li>
            </ul>
       { defModal=="newProject"?   <NewProject/>
          : <NewPersom/>}
            <div className="mb-[20px]">
              <button className="w-[100%] h-[41px] rounded-[3px] bg-[#27B5B0] text-[14px] font-[700] leading-[17px] text-center text-[#fff]">
                Save
              </button>
            </div>
            <div className="mb-[0px]">
              <button className="w-[100%] h-[41px] rounded-[3px] bg-[#AEB3C0] text-[14px] font-[700] leading-[17px] text-center text-[#fff]" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
