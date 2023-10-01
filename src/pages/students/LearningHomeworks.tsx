import { useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropDownBoxProp {
    titleName: string
    homeworkName: string
    deadlineDayOfWeek: string
    deadlineTime: string
}

function DropDownBox(props: DropDownBoxProp) {
    return (
        <div className=" flex flex-row w-full h-full shadow-xl relative mt-[1%]">
            <div className="flex flex-col ml-[3%] absolute w-full whitespace-nowrap items-start">
                <div className=" space-y-[2%]">
                    <p className=" font-bold text-2xl ml-[2%]">{props.homeworkName}</p>
                </div>
                <div className=" mt-[1%] ml-[1%]">
                    <div>{props.titleName}</div>
                </div>
            </div>

            <div className=" flex flex-row-reverse absolute w-full whitespace-nowrap mt-[5%]">
                <div className=" absolute text-lg mr-[3%]">ถึงวัน{props.deadlineDayOfWeek} {props.deadlineTime} น.</div>
            </div>
        </div>
    );
}

function LearningHomeworks() {
    const [click_assign, assign] = useState(true);
    const [click_late, late] = useState(false);
    const [click_finish, finish] = useState(false);

    const toggleDivAssign = document.getElementById("toggleDivAssign");
    const toggleDivLate = document.getElementById("toggleDivLate");
    const toggleDivFinish = document.getElementById("toggleDivFinish");

    const mockList = [{titleName:"Principal Redstone Designs", homeworkName:"What is Redstone", deadlineDayOfWeek:"ศุกร์", deadlineTime:"12:00"}, 
                    {titleName:"Principal Greenstone Designs", homeworkName:"What is Greenstone", deadlineDayOfWeek:"เสาร์", deadlineTime:"9:00"}]

    function handleClickAssign() {
        assign(true)
        late(false)
        finish(false)

        toggleDivAssign.classList.remove("hidden")
        toggleDivLate.classList.add("hidden")
        toggleDivFinish.classList.add("hidden")
    }

    function handleClickLate() {
        assign(false)
        late(true)
        finish(false)

        toggleDivAssign.classList.add("hidden")
        toggleDivLate.classList.remove("hidden")
        toggleDivFinish.classList.add("hidden")
    }

    function handleClickFinish() {
        assign(false)
        late(false)
        finish(true)
    
        toggleDivAssign.classList.add("hidden")
        toggleDivLate.classList.add("hidden")
        toggleDivFinish.classList.remove("hidden")
    }

    function handleClickDropdownAllClass() {
        const toggleDivDropdownAllClass = document.getElementById("dropDownAllClass")
        const toggleIconAllClass = document.getElementById("iconAllClass")

        toggleDivDropdownAllClass.classList.toggle("hidden")
        toggleIconAllClass.classList.toggle("scale-y-[-1]")
    }

    function handleClickDropdownAssignNoDueDate() {
        const toggleDivDropdownAssignNoDueDate = document.getElementById("dropDownAssignNoDueDate")
        const toggleIconAssignNoDueDate = document.getElementById("iconAssignNoDueDate")

        toggleDivDropdownAssignNoDueDate.classList.toggle("hidden")
        toggleIconAssignNoDueDate.classList.toggle("scale-y-[-1]")
    }
    
    function handleClickDropdownAssignThisWeek() {
        const toggleDivDropdownAssignThisWeek = document.getElementById("dropDownAssignThisWeek")
        const toggleIconAssignThisWeek = document.getElementById("iconAssignThisWeek")

        toggleDivDropdownAssignThisWeek.classList.toggle("hidden")
        toggleIconAssignThisWeek.classList.toggle("scale-y-[-1]")
    }

    function handleClickDropdownAssignNextWeek() {
        const toggleDivDropdownAssignNextWeek = document.getElementById("dropDownAssignNextWeek")
        const toggleIconAssignNextWeek = document.getElementById("iconAssignNextWeek")

        toggleDivDropdownAssignNextWeek.classList.toggle("hidden")
        toggleIconAssignNextWeek.classList.toggle("scale-y-[-1]")
    }
    
    function handleClickDropdownAssignAfter() {
        const toggleDivDropdownAssignAfter = document.getElementById("dropDownAssignAfter")
        const toggleIconAssignAfter = document.getElementById("iconAssignAfter")

        toggleDivDropdownAssignAfter.classList.toggle("hidden")
        toggleIconAssignAfter.classList.toggle("scale-y-[-1]")
    }

    function handleClickDropdownLateThisWeek() {
        const toggleDivDropdownLateThisWeek = document.getElementById("dropDownLateThisWeek")
        const toggleIconLateThisWeek = document.getElementById("iconLateThisWeek")

        toggleDivDropdownLateThisWeek.classList.toggle("hidden")
        toggleIconLateThisWeek.classList.toggle("scale-y-[-1]")
    }

    function handleClickDropdownLatePrevWeek() {
        const toggleDivDropdownLatePrevWeek = document.getElementById("dropDownLatePrevWeek")
        const toggleIconLatePrevWeek = document.getElementById("iconLatePrevWeek")

        toggleDivDropdownLatePrevWeek.classList.toggle("hidden")
        toggleIconLatePrevWeek.classList.toggle("scale-y-[-1]")
    }

    function handleClickDropdownLateBefore() {
        const toggleDivDropdownLateBefore = document.getElementById("dropDownLateBefore")
        const toggleIconLateBefore = document.getElementById("iconLateBefore")

        toggleDivDropdownLateBefore.classList.toggle("hidden")
        toggleIconLateBefore.classList.toggle("scale-y-[-1]")
    }

    function handleClickDropdownFinishThisWeek() {
        const toggleDivDropdownFinishThisWeek = document.getElementById("dropDownFinishThisWeek")
        const toggleIconFinishThisWeek = document.getElementById("iconFinishThisWeek")

        toggleDivDropdownFinishThisWeek.classList.toggle("hidden")
        toggleIconFinishThisWeek.classList.toggle("scale-y-[-1]")
    }

    function handleClickDropdownFinishPrevWeek() {
        const toggleDivDropdownFinishPrevWeek = document.getElementById("dropDownFinishPrevWeek")
        const toggleIconFinishPrevWeek = document.getElementById("iconFinishPrevWeek")

        toggleDivDropdownFinishPrevWeek.classList.toggle("hidden")
        toggleIconFinishPrevWeek.classList.toggle("scale-y-[-1]")
    }

    function handleClickDropdownFinishBefore() {
        const toggleDivDropdownFinishBefore = document.getElementById("dropDownFinishBefore")
        const toggleIconFinishBefore = document.getElementById("iconFinishBefore")

        toggleDivDropdownFinishBefore.classList.toggle("hidden")
        toggleIconFinishBefore.classList.toggle("scale-y-[-1]")
    }


    return (
        <div>
            <div className=" flex space-x-[5%] font-extrabold text-2xl ml-[3%]">
                <button id="toggleAssign" className= {click_assign ? "underline underline-offset-[6px] decoration-[#18334E] decoration-8": ""} onClick={() => handleClickAssign()}>
                    มอบหมายเเล้ว
                </button>
                <button id="toggleLate" className= {click_late ? "underline underline-offset-[6px] decoration-[#18334E] decoration-8": ""} onClick={() => handleClickLate()}>
                    เลยกำหนด
                </button>
                <button id="toggleFinish" className= {click_finish ? "underline underline-offset-[6px] decoration-[#18334E] decoration-8": ""} onClick={() => handleClickFinish()}>
                    เสร็จสิ้น
                </button>
            </div>
            <hr className=" bg-[#E0E0E0] w-full h-[2px] mt-[6px]" />

            <div className=" ml-[20%]">
                <div className=" box-border h-[50px] w-[450px] border border-black mt-10 relative flex items-center">
                    <button onClick={handleClickDropdownAllClass} className=" absolute right-4 gr">
                        <FontAwesomeIcon id="iconAllClass" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                    </button>
                    <div className=" absolute left-3 text-xl font-bold">
                        คลาสเรียนทั้งหมด
                    </div>
                </div>
                <button id="dropDownAllClass" className=" hidden absolute z-40">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[70px] w-[450px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                </button>
  

                <div id="toggleDivAssign" className=" z-0">
                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-10 relative flex items-center">
                        <button onClick={handleClickDropdownAssignNoDueDate} className=" absolute right-4">
                            <FontAwesomeIcon id="iconAssignNoDueDate" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ไม่ได้กำหนดวันส่ง
                        </div>
                    </div>
                    <button id="dropDownAssignNoDueDate" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>

                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-4 relative flex items-center">
                        <button onClick={handleClickDropdownAssignThisWeek} className=" absolute right-4">
                            <FontAwesomeIcon id="iconAssignThisWeek" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ส่งภายในสัปดาห์นี้
                        </div>
                    </div>
                    <button id="dropDownAssignThisWeek" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>

                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-4 relative flex items-center">
                        <button onClick={handleClickDropdownAssignNextWeek} className=" absolute right-4">
                            <FontAwesomeIcon id="iconAssignNextWeek" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ส่งภายในสัปดาห์หน้า
                        </div>
                    </div>
                    <button id="dropDownAssignNextWeek" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>

                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-4 relative flex items-center">
                        <button onClick={handleClickDropdownAssignAfter} className=" absolute right-4">
                            <FontAwesomeIcon id="iconAssignAfter" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ส่งหลังจากนี้
                        </div>
                    </div>
                    <button id="dropDownAssignAfter" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>
                </div>


                <div id="toggleDivLate" className=" hidden z-0">
                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-10 relative flex items-center">
                        <button onClick={handleClickDropdownLateThisWeek} className=" absolute right-4">
                            <FontAwesomeIcon id="iconLateThisWeek" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ในสัปดาห์นี้
                        </div>
                    </div>
                    <button id="dropDownLateThisWeek" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>

                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-4 relative flex items-center">
                        <button onClick={handleClickDropdownLatePrevWeek} className=" absolute right-4">
                            <FontAwesomeIcon id="iconLatePrevWeek" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ในสัปดาห์ที่เเล้ว
                        </div>
                    </div>
                    <button id="dropDownLatePrevWeek" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>

                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-4 relative flex items-center">
                        <button onClick={handleClickDropdownLateBefore} className=" absolute right-4">
                            <FontAwesomeIcon id="iconLateBefore" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ก่อนหน้านี้
                        </div>
                    </div>
                    <button id="dropDownLateBefore" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>
                </div>


                <div id="toggleDivFinish" className=" hidden z-0">
                <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-10 relative flex items-center">
                        <button onClick={handleClickDropdownFinishThisWeek} className=" absolute right-4">
                            <FontAwesomeIcon id="iconFinishThisWeek" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ในสัปดาห์นี้
                        </div>
                    </div>
                    <button id="dropDownFinishThisWeek" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>

                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-4 relative flex items-center">
                        <button onClick={handleClickDropdownFinishPrevWeek} className=" absolute right-4">
                            <FontAwesomeIcon id="iconFinishPrevWeek" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ในสัปดาห์ที่เเล้ว
                        </div>
                    </div>
                    <button id="dropDownFinishPrevWeek" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>

                    <div className=" box-border h-[70px] w-[800px] border border-black bg-[#D9D9D9] mt-4 relative flex items-center">
                        <button onClick={handleClickDropdownFinishBefore} className=" absolute right-4">
                            <FontAwesomeIcon id="iconFinishBefore" icon={faCaretDown} size="2xl"></FontAwesomeIcon>
                        </button>
                        <div className=" absolute left-3 text-xl font-bold">
                            ก่อนหน้านี้
                        </div>
                    </div>
                    <button id="dropDownFinishBefore" className=" hidden">
                        {mockList.map((item) => (
                            <div className=" relative box-border h-[90px] w-[800px] border border-black bg-white flex flex-cols group hover:shadow-xl">
                                <div className=" absolute h-full w-[2%] group-hover:bg-black">   
                                </div>
                                <div className=" absolute w-full flex">
                                    <DropDownBox titleName={item["titleName"]} homeworkName={item["homeworkName"]} deadlineDayOfWeek={item["deadlineDayOfWeek"]} deadlineTime={item["deadlineTime"]}></DropDownBox>
                                </div>
                            </div>
                        ))
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LearningHomeworks