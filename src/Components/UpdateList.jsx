import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BiTask } from 'react-icons/bi';
import { SlClock } from 'react-icons/sl';
import { GiProgression } from 'react-icons/gi';
import { MdTaskAlt } from 'react-icons/md';
import { FaBell, FaPen, FaPlus, FaTag } from 'react-icons/fa';
import { UpdateTask } from '../Redux/TodoSlice';
import { useDispatch } from 'react-redux';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function UpdateList({task}) {

    // const[Update,setUpdate]=React.useState({})
    // console.log(Update);
    const dispatch=useDispatch()

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [SelItem,setSelItem]=React.useState(task)
    console.log(SelItem);

    // UpdateBtn
    const UpdateBtnTrigg=()=>{
        console.log(SelItem.id);
        dispatch(UpdateTask(SelItem))
        handleClose()
    }
    
  return (
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
                        <p className='text-xl font-semibold'>Edit Task</p>
                        <p className='text-gray-600 text-sm'>Loosers have Plan B!</p>
                    </div>
                </div>
                <div>
                    <div className='my-3'>
                        <p className='text-sm mb-1 '>Task Titles <span className='text-red-700'>*</span></p>
                        <input onChange={(e)=>setSelItem({...SelItem,title:e.target.value})} value={SelItem?.title}  className='border px-3 py-1 w-full rounded border-gray-600 text-sm' type="text" placeholder='Enter task title...'/>
                    </div>
                    <div className='my-3'>
                        <p className='text-sm mb-1 '>Description <span className='text-red-700'>*</span></p>
                        <input onChange={(e)=>setSelItem({...SelItem,desc:e.target.value})} value={SelItem?.desc}  className='border px-3 py-1 w-full rounded border-gray-600 text-sm h-20' type="text" placeholder='Add More Details...'/>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <div className='my-3 w-full'>
                            <p className='text-sm mb-1 '>Priority <span className='text-red-700'>*</span></p>
                            <select onChange={(e)=>setSelItem({...SelItem,priority:e.target.value})} value={SelItem?.priority} className='border px-3 py-1 rounded w-full' name="" id="">
                                
                                <option value="" hidden>Select</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className='my-3 w-full'>
                            <p className='text-sm mb-1 '>Category <span className='text-red-700'>*</span></p>
                            <select onChange={(e)=>setSelItem({...SelItem,category:e.target.value})} value={SelItem?.category} className='border px-3 py-1 rounded w-full' name="" id="">
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
                            <div onClick={()=>setSelItem({...SelItem,status:"pending"})} className={SelItem.status=="pending" ? "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer bg-purple-700 text-white font-medium" : "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer text-gray-500"}>
                                <SlClock className='text-xl '/>
                                <p className=' font-medium'>Pending</p>
                            </div>
                                
                            <div onClick={()=>setSelItem({...SelItem,status:"progress"})} className={SelItem.status=="progress" ? "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer bg-purple-700 text-white font-medium" : "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer text-gray-500"} >
                                <GiProgression className='text-xl '/>
                                <p className=' font-medium'>In Progress</p>
                            </div>

                            <div onClick={()=>setSelItem({...SelItem,status:"complete"})} className={SelItem.status=="complete" ? "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer bg-purple-700 text-white font-medium" : "shadow rounded p-2 flex items-center justify-center gap-2 cursor-pointer text-gray-500"} >
                                <MdTaskAlt className='text-xl '/>
                                <p className=' font-medium'>Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className='my-5'>
                        
                        <div className='flex justify-between gap-5'>
                            <div className='w-full'>
                                <p className='text-sm mb-1 font-medium'>Due Date <span className='text-red-700'>*</span></p>
                                <input onChange={(e)=>setSelItem({...SelItem,date:e.target.value})} value={SelItem?.date}  className='border px-3 py-1 rounded border-gray-500 w-full' type="date" />
                            </div>
                            <div className='w-full'>
                                <p className='text-sm mb-1 font-medium'>Due Time <span className='text-red-700'>*</span></p>
                                <input onChange={(e)=>setSelItem({...SelItem,time:e.target.value})} value={SelItem?.time} className='border px-3 py-1 rounded border-gray-500 w-full' type="time" />
                            </div>
                        </div>
                    </div>
                    {/* Add Tags */}
                    <div className='mt-5'>
                        <p className='text-sm mb-1 font-medium'>Add Tags (Optional)</p>
                        <div className='flex items-center'>
                            <FaTag className='text-gray-500 ml-2'/>
                            <input onChange={(e)=>setSelItem({...SelItem,tags:e.target.value})} value={SelItem?.tags} className='border px-8 py-1.5 w-full rounded border-gray-600 text-sm -ml-6' type="text" placeholder='Exam,Personal,etc.'/>
                        </div>
                    </div>
                    {/* SetReminder */}
                    <div className='my-5 flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <FaBell className='text-gray-800'/>
                            <p className='text-gray-800 font-medium'>Set Reminder</p>
                        </div>
                        {/* <div>
                            <Switch {...label} defaultChecked />
                        </div> */}
                    </div>
                    {/* Button */}
                    <div className='flex items-center gap-2'>
                        <button  className='cursor-pointer px-15 py-3 w-full rounded bg-gray-200 text-black font-medium '>Cancel</button>
                        <button onClick={UpdateBtnTrigg}  className='px-15 py-3 w-full rounded bg-purple-700 text-white font-medium flex justify-center items-center gap-2 cursor-pointer'><FaPen/>Update</button>
                    </div>
                </div>
            </Box>
      </Modal>
  )
}

export default UpdateList