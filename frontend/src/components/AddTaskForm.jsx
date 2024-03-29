import React, { useState } from "react";
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { setuser } from "../slices/UserSlice";
import { toast } from "react-toastify";

const AddTaskForm = ({ visible }) => {

    const dispatch = useDispatch();
    const [isWaiting, setIsWaiting] = useState(false);

    //state managemet
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    //generate errors
    const [ errors, setErrors ] = useState({
        taskName:  '',
        startDate: '',
        endDate: '',
        status: '',
        details: ''
    })
   
    //create new task
    const submitTask = (e) => {
        e.preventDefault();

        const taskName = e.target.taskName.value;
        const startDate = e.target.startDate.value;
        const endDate = e.target.endDate.value;
        const status = e.target.status.value;
        const details = e.target.details.value;

        if(taskName == '' || startDate == '' || endDate =='' || status == ''){
            setErrors({
                taskName: taskName == ''? 'Task Name should not be empty' : '',
                startDate: startDate == '' ? 'Start Date should not be empty' : '',
                endDate: endDate =='' ? 'End Date should not be empty' : '',
                status: status == '' ? 'Status should not be empty' : '',
                details: details == '' ? 'Details should not be empty': ''
            })
        }else{
            setIsWaiting(true);
            const datas = fetch(`${process.env.REACT_APP_API_URL}tasks`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json' 
                },
                body: JSON.stringify({
                  task_name:taskName,
                  start_date:startDate,
                  end_date:endDate,
                  status:status,
                  details: details
                }), 
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(response);
                  }
                  return response.json();
                })
                .then((data) => {
                  
                  dispatch(setuser(data));
                  visible()
                  toast.success("Task Created");
                  setIsWaiting(false);
                })
                .catch((error) => {
                  console.error('Error:', error);
                })
        }



    }

    return(
            
        <div className="bg-gray-100 flex items-center justify-center h-screen fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
                
                <p className="text-xl text-gray-600 mb-4">Add New Task</p>
                <form onSubmit={ submitTask } className="space-y-4">
                    <div>
                        <label for="taskname" className="text-base font-medium text-gray-700 block mb-2">Task Name</label>
                        <input type="text" name="taskName" className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" />
                        <p className="text-sm text-red-400">{ errors.taskName }</p>
                    </div>
                    <div>
                        <label for="startdate" className="text-base font-medium text-gray-700 block mb-2">Start Date</label>
                        <input type="date" name="startDate" onChange={ e => setStartDate(e.target.value)} value={ startDate } max={ endDate } className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" />
                        <p className="text-sm text-red-400">{ errors.startDate }</p>
                    </div>
                    <div>
                        <label for="startdate" className="text-base font-medium text-gray-700 block mb-2">End Date</label>
                        <input type="date" name="endDate" value={ endDate} onChange={e => setEndDate(e.target.value)} min={startDate} className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" />
                        <p className="text-sm text-red-400">{ errors.endDate }</p>
                    </div>
                    <div>
                        <label for="startdate" className="text-base font-medium text-gray-700 block mb-2">Details</label>
                        <input type="textarea" name="details" className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" />
                        <p className="text-sm text-red-400">{ errors.details }</p>
                    </div>
                    <div>
                        <label for="taskname" className="text-base font-medium text-gray-700 block mb-2">Status</label>
                        <select name="status" value='In Progress' className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" >
                            <option value='In Progress'>In Progress</option>
                            <option value='completed'>Completed</option>
                            <option value='due'>Due</option>
                            <option value='past due'>Past Due</option>
                        </select>
                        <p className="text-sm text-red-400">{ errors.status }</p>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={ visible } variant="secondary" className="px-4 bg-gray-200 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-grey-500 focus:outline-none focus:ring focus:border-blue-300">Close</button>
                        <button type="submit" variant="primary" className="px-4 bg-teal-500 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-teal-300 focus:outline-none focus:ring focus:border-blue-300"> { isWaiting ? <FaSpinner className="spinner" /> : 'Submit' }</button>
                    </div>
                </form>
            </div>  
        </div>
    );
}

export default AddTaskForm;