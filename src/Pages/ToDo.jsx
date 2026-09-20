import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BsTrash } from 'react-icons/bs'
import { CiFilter, CiTrash } from 'react-icons/ci'
import { FaBell, FaCalendar, FaClock, FaFilter, FaPen, FaPlus, FaRegBell, FaRegClock, FaSearch, FaTag, FaTasks, FaTimes, FaTrash } from 'react-icons/fa'
import { GoPencil, GoPlus } from 'react-icons/go'
import { IoFlagSharp } from 'react-icons/io5'
import { MdOutlineModeEdit, MdOutlinePendingActions, MdOutlineTaskAlt, MdTaskAlt } from 'react-icons/md'
import { SiGoogletasks } from 'react-icons/si'
import { SlCalender, SlClock } from 'react-icons/sl'
import { BiTask } from 'react-icons/bi';
import { GiProgression } from 'react-icons/gi';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { SearchTask, TaskAdding, TaskDelete } from '../Redux/TodoSlice';
import Swal from 'sweetalert2';
import UpdateList from '../Components/UpdateList';







const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth:600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  my:2
};
const label = { slotProps: { input: { 'aria-label': 'Switch demo' } } };


function ToDo() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Get From Redux
    const GetElement=useSelector((state)=>state.ToDoList.TodoList)
    console.log(GetElement);
    const[selectedList,setSelectedList]=React.useState()
    
    const[EditBtn,setEditBtn]=React.useState(false)

    const [Tasks,setTasks]=React.useState({
        title:"",
        desc:"",
        priority:"",
        category:"",
        status:"pending",
        tags:"",
        date:"",
        time:"",
        id:Date.now()
    })
    const[search,setSearch]=React.useState("")
    const dispatch=useDispatch()

    const AddTask=()=>{
        handleOpen()
    }

    const [Today,setToday]=React.useState("")
    const [TodayTime,setTodayTime]=React.useState("")
    
    const TodayDateSet=()=>{
        const DaySet=new Date()
        setToday(DaySet.toLocaleDateString())
        setTodayTime(DaySet.getHours("en-GB"))
    }
    React.useEffect(()=>{
        TodayDateSet()
    },[])

    //Add Task
    const TaskStoring=()=>{
        const {title,desc,priority,category,status,date,time}=Tasks
        console.log(title,desc,priority,category,status,date,time);
        if(title && desc && priority && category && status && date && time){
            dispatch(TaskAdding(Tasks))
            handleClose()
            setTasks({
                title:"",
                desc:"",
                priority:"",
                category:"",
                status:"",
                tags:"",
                time:"",
                date:""
            })
            Swal.fire({
                title: "Successfully Added to Todo List-'Warriors does't have an excuse😮‍💨'",
                icon: "success",
                draggable: true
                });
        }else{
            handleClose()
            Swal.fire({
                title: "Champion,Fill the form Completely",
                icon: "error",
                draggable: true
                });
        }
    }
    //Delete Task
    const DeleteTask=(id)=>{
        dispatch(TaskDelete(id))
    }

    //For searching
    const FilterSearch=GetElement?.filter(item=>item.title.toLowerCase().includes(search.toLowerCase()))

    //Update Status
    const UpdateStatus=(item)=>{
        setEditBtn(!EditBtn)
        setSelectedList(item)
    }

  return (
    <div className='pb-20'>
        <div className='flex justify-between px-5 shadow py-2 mb-2'>
            <div className='flex items-center gap-2'>
                <SiGoogletasks className='text-4xl text-purple-500'/>
                <div>
                    <p className='text-2xl font-medium'>Taskly</p>
                    <p className='text-sm font-medium text-gray-500'>Plan Today Build Tomorrow</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <p className='text-gray-500 text-sm font-medium'>{Today}</p>
                <span className='flex items-center'><FaRegBell className='text-gray-700 text-xl'/>
                <p className='text-xs bg-red-600 rounded-full text-white w-4 h-4 text-center mb-4'>{GetElement.length}</p>
                </span>
                
            </div>
        </div>
        <div className='px-5 my-4 flex justify-between items-center'>
            <div>
                <p className='text-3xl font-medium'>{TodayTime<12 ? "Good Morning" : TodayTime<17 ? "Good Afternoon" : "Good Evening" }, Champion👋</p>
                <p className='text-gray-500 font-medium'>Stay consistent,progress adds up!</p>
            </div>
            <div className='shadow rounded py-3 w-fit px-10 text-purple-700'>
                <p className='font-medium'>"Discipline turns <br />goals into reality."</p>
            </div>
        </div>
        <div className='md:grid grid-cols-4 px-5 gap-5 flex justify-between flex-wrap'>
            <div className='shadow bg-purple-200 p-3 rounded flex items-center gap-2'>
                <div className='p-2 w-fit bg-purple-300 rounded'>
                    <FaTasks className='text-purple-800 text-2xl'/>
                </div>
                <div>
                    <p className='text-2xl font-semibold'>{GetElement.length}</p>
                    <p className='text-sm text-gray-500 font-medium'>Total Task</p>
                </div>
            </div>

            <div className='shadow bg-green-200 p-3 py-4 rounded flex items-center gap-2'>
                <div className='p-2 w-fit bg-green-300 rounded'>
                    <MdOutlineTaskAlt className='text-green-800 text-2xl'/>
                </div>
                <div>
                    <p className='text-2xl font-semibold'>{GetElement.filter(item=>item.status=="completed").length}</p>
                    <p className='text-sm text-gray-500 font-medium'>Completed</p>
                </div>
            </div>

             <div className='shadow bg-yellow-200 p-3 py-4 rounded flex items-center gap-2'>
                <div className='p-2 w-fit bg-yellow-300 rounded'>
                    <FaRegClock className='text-yellow-800 text-2xl'/>
                </div>
                <div>
                    <p className='text-2xl font-semibold'>{GetElement.filter(item=>item.status=="progress").length}</p>
                    <p className='text-sm text-gray-500 font-medium'>In Progress</p>
                </div>
            </div>

            <div className='shadow bg-red-100 p-3 py-4 rounded flex items-center gap-2'>
                <div className='p-2 w-fit bg-red-300 rounded'>
                    <IoFlagSharp  className='text-red-800 text-2xl'/>
                </div>
                <div>
                    <p className='text-2xl font-semibold'>{GetElement.filter(item=>item.priority=="high").length}</p>
                    <p className='text-sm text-gray-500 font-medium'>High Priority</p>
                </div>
            </div>


        </div>

        <div className='my-5 px-5 flex justify-between items-center flex-wrap gap-2'>
        <div className='flex items-center'>
            <FaSearch className='text-gray-600 ml-2'/>
            <input onChange={(e)=>setSearch(e.target.value)} className='border border-gray-400 w-100 px-8 py-1.5 rounded -ml-6' type="text" placeholder='Search tasks...' />
        </div>
        {/* Category */}
        {/* <div className='flex items-center'>
            <CiFilter className='text-2xl'/>
            <select name="" id="" className='border border-gray-500 px-8 py-1.5 rounded -ml-6'>
                <option hidden value="">All Categories</option>
            </select>
        </div> */}
        {/* Button */}
        <div className=''>
            <button onClick={AddTask} className='bg-purple-600 flex items-center px-3 py-1.5 rounded text-white font-medium cursor-pointer'><GoPlus className='text-white text-2xl'/>Add Task</button>
        </div>
        </div>
        <div className='md:px-5 flex md:gap-5 px-0.5 py-1 gap-1 sm:justify-between md:justify-start'>
            <p className='md:px-5 px-2 py-1 w-fit rounded-2xl bg-gray-100 text-sm text-gray-800 font-medium'>All({GetElement.length})</p>
            <p className='md:px-5 px-2 py-1 w-fit rounded-2xl bg-gray-100 text-sm text-gray-800 font-medium'>In Progress({GetElement.filter(item=>item.status=="progress").length})</p>
            <p className='md:px-5 px-2 py-1 w-fit rounded-2xl bg-gray-100 text-sm text-gray-800 font-medium'>Completed({GetElement.filter(item=>item.status=="completed").length})</p>
            <p className='md:px-5 px-2 py-1 w-fit rounded-2xl bg-gray-100 text-sm text-gray-800 font-medium'>High priority({GetElement.filter(item=>item.priority=="high").length})</p>
        </div>
        <div className='my-4 px-5'>
            {/* Duplication */}
            
                {
                    FilterSearch ?.map(item=>(
                        <div className='shadow rounded my-2 hover:shadow-purple-300 transition-colors duration-300'>
                <div className='px-2 py-3 flex  justify-between items-center'>
                    {/* Progress */}
                    <div className='px-3 py-1.5  rounded'>
                        {
                            item.status =="completed" &&
                            <MdTaskAlt className='text-2xl text-green-700'/>
                        }
                        {
                            item.status=="pending" &&
                            <MdOutlinePendingActions className='text-2xl text-red-700'/>
                        }
                        {
                            item.status =="progress" &&
                            <GiProgression className='text-2xl text-blue-700'/>
                        }
                    </div>
                    {/* Task */}
                    <div className='w-70 text-center'>
                        <p className='font-semibold'>{item?.title}</p>
                        <p className='text-sm text-gray-500'>{item?.desc}</p>
                    </div>
                    {/* Date and Time */}
                    <div className='text-gray-500 text-sm flex items-center gap-3 justify-center'>
                        <SlCalender className=''/>
                        <p>{item.date},{item?.time}</p>
                    </div>
                    {/* Priority */}
                    <div className='w-20 flex justify-center'>
                        <p className={item.priority== "high" ? "py-0.5 font-medium w-fit px-3  rounded bg-red-200 text-red-800 text-xs" : item.priority=="medium" ? "py-0.5 font-medium w-fit px-3  rounded bg-blue-200 text-blue-800 text-xs" : "py-0.5 font-medium w-fit px-3  rounded bg-green-200 text-green-800 text-xs"}>{item?.priority}</p>
                    </div>
                    {/* Actions */}
                    <div className='text-2xl flex items-center gap-3'>
                        <button onClick={()=>UpdateStatus(item)}><MdOutlineModeEdit  className='text-gray-700'/></button>
                        <button onClick={()=>DeleteTask(item.id)}><BsTrash className='text-red-700'/></button>
                    </div>
                </div>
                </div>
                    ))
                    
                }
            

            
            
            
        </div>

        {/* Modal */}
    <div className=''>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <div className='flex items-center gap-3'>
                    <div className='p-2 w-fit rounded bg-purple-100'>
                        <BiTask className='text-2xl text-purple-600' />
                    </div>
                   
                    <div>
                        <p className='text-xl font-semibold'>Add New Task</p>
                        <p className='text-gray-600 text-sm'>Turn your plans into progress!</p>
                    </div>
                </div>
                <div>
                    <div className='my-3'>
                        <p className='text-sm mb-1 '>Task Titles <span className='text-red-700'>*</span></p>
                        <input onChange={(e)=>setTasks({...Tasks,title:e.target.value})} className='border px-3 py-1 w-full rounded border-gray-600 text-sm' type="text" placeholder='Enter task title...'/>
                    </div>
                    <div className='my-3'>
                        <p className='text-sm mb-1 '>Description <span className='text-red-700'>*</span></p>
                        <input onChange={(e)=>setTasks({...Tasks,desc:e.target.value})} className='border px-3 py-1 w-full rounded border-gray-600 text-sm h-20' type="text" placeholder='Add More Details...'/>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <div className='my-3 w-full'>
                            <p className='text-sm mb-1 '>Priority <span className='text-red-700'>*</span></p>
                            <select onChange={(e)=>setTasks({...Tasks,priority:e.target.value})} className='border px-3 py-1 rounded w-full' name="" id="">
                                <option value=""hidden>Select Priority</option>
                                <option value="" hidden>Select</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className='my-3 w-full'>
                            <p className='text-sm mb-1 '>Category <span className='text-red-700'>*</span></p>
                            <select onChange={(e)=>setTasks({...Tasks,category:e.target.value})} className='border px-3 py-1 rounded w-full' name="" id="">
                                <option value=""hidden>Category</option>
                                <option value="study">Study</option>
                                <option value="workout">Workout</option>
                                <option value="exam">Exam</option>
                                <option value="food">Food</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    {/* Status */}
                    <div>
                        <p className='text-sm mb-1 '>Status <span className='text-red-700'>*</span></p>
                        <div className='grid grid-cols-3 gap-3'>
                            <div onClick={()=>setTasks({...Tasks,status:"pending"})} className={Tasks.status=="pending" ? "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer bg-purple-700 text-white font-medium" : "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer text-gray-500"}>
                                <SlClock className='text-xl '/>
                                <p className=' font-medium'>Pending</p>
                            </div>
                                
                            <div onClick={()=>setTasks({...Tasks,status:"progress"})} className={Tasks.status=="progress" ? "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer bg-purple-700 text-white font-medium" : "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer text-gray-500"}>
                                <GiProgression className='text-xl '/>
                                <p className=' font-medium'>In Progress</p>
                            </div>

                            <div onClick={()=>setTasks({...Tasks,status:"completed"})} className={Tasks.status=="completed" ? "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer bg-purple-700 text-white font-medium" : "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer text-gray-500"}>
                                <MdTaskAlt className='text-xl '/>
                                <p className=' font-medium'>Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className='my-5'>
                        
                        <div className='flex justify-between gap-5'>
                            <div className='w-full'>
                                <p className='text-sm mb-1 font-medium'>Due Date <span className='text-red-700'>*</span></p>
                                <input onChange={(e)=>setTasks({...Tasks,date:e.target.value})} className='border px-3 py-1 rounded border-gray-500 w-full' type="date" />
                            </div>
                            <div className='w-full'>
                                <p className='text-sm mb-1 font-medium'>Due Time <span className='text-red-700'>*</span></p>
                                <input onChange={(e)=>setTasks({...Tasks,time:e.target.value})} className='border px-3 py-1 rounded border-gray-500 w-full' type="time" />
                            </div>
                        </div>
                    </div>
                    {/* Add Tags */}
                    <div className='mt-5'>
                        <p className='text-sm mb-1 font-medium'>Add Tags </p>
                        <div className='flex items-center'>
                            <FaTag className='text-gray-500 ml-2'/>
                            <input onChange={(e)=>setTasks({...Tasks,tags:e.target.value})} className='border px-8 py-1.5 w-full rounded border-gray-600 text-sm -ml-6' type="text" placeholder='Exam,Personal,etc.'/>
                        </div>
                    </div>
                    {/* SetReminder */}
                    <div className='my-5 flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <FaBell className='text-gray-800'/>
                            <p className='text-gray-800 font-medium'>Set Reminder</p>
                        </div>
                        <div>
                            <Switch {...label} defaultChecked />
                        </div>
                    </div>
                    {/* Button */}
                    <div className='md:flex items-center gap-2'>
                        <button onClick={handleClose} className='cursor-pointer px-15 py-3 w-full rounded bg-gray-200 text-black font-medium my-2'>Cancel</button>
                        <button onClick={TaskStoring} className='px-15 py-3 w-full rounded bg-purple-700 text-white font-medium flex justify-center my-2 items-center gap-1 md:gap-2 cursor-pointer'><FaPlus/>AddTask</button>
                    </div>
                </div>
            </Box>
      </Modal>
    </div>
    {/* Update Status Modal */}
    {
        EditBtn &&
        <UpdateList task={selectedList}/>
    }
        

    </div>
  )
}

export default ToDo