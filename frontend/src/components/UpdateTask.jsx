import React , { useState } from "react";
import { useDispatch } from "react-redux";
import { setuser } from "../slices/UserSlice";
import { toast } from "react-toastify";

const UpdateTask = ({ visibility, data }) => {
    const [initialData, updateInitialData] = useState(data);

    const [startDate, setStartDate] = useState(data.start_date);
    const [endDate, setEndDate] = useState(data.end_date);
    const [taskName, setTaskName] = useState(data.task_name);
    const [status, setStatus] = useState(data.status);
    const [details, setDetails] = useState(data.details)

    const dispatch = useDispatch();

    const [ errors, setErrors ] = useState({
        taskName:  '',
        startDate: '',
        endDate: '',
        status: '',
        details: ''
    })
   

    const handleUpdateTask = (e) => {
        e.preventDefault();

        const taskName = e.target.taskName.value;
        const startDate = e.target.startDate.value;
        const endDate = e.target.endDate.value;
        const status = e.target.status.value;
        const details = e.target.details.value;

        if(taskName == '' || startDate == '' || endDate =='' || status == '' || details == ''){
            setErrors({
                taskName: taskName == ''? 'Task Name should not be empty' : '',
                startDate: startDate == '' ? 'Start Date should not be empty' : '',
                endDate: endDate =='' ? 'End Date should not be empty' : '',
                status: status == '' ? 'Status should not be empty' : '',
                details: details == '' ? 'Details should not be empty' : ''
            })
        }else{
            const datas = fetch(`${process.env.REACT_APP_API_URL}tasks/${ data.id }`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json' 
                },
                body: JSON.stringify({
                  id: data.id,
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
                  visibility();
                  toast.success("Task updated successfully !");
                })
                .catch((e) => {
                  console.error('Error:', e);
                })
        }

    }
    return(
        <div class="bg-gray-100 flex items-center justify-center h-screen fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
            <div class="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
                
                <p class="text-xl text-gray-600 mb-4">Update Task</p>
                <form onSubmit={ handleUpdateTask } className="space-y-4">
                    <div>
                        <label for="taskname" className="text-base font-medium text-gray-700 block mb-2">Task Name</label>
                        <input type="text" value={ taskName } onChange={ (e) => setTaskName(e.target.value)} name="taskName" className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" />
                        {/* <p className="text-sm text-red-400">{ errors.taskName }</p> */}
                    </div>
                    <div>
                        <label for="startdate" className="text-base font-medium text-gray-700 block mb-2">Start Date</label>
                        <input type="date" value={ startDate } onChange={ (e) => setStartDate(e.target.value)} name="startDate" className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" />
                        {/* <p className="text-sm text-red-400">{ errors.startDate }</p> */}
                    </div>
                    <div>
                        <label for="enddate" className="text-base font-medium text-gray-700 block mb-2">End Date</label>
                        <input type="date" value={ endDate } onChange={ (e) => setEndDate(e.target.value)} name="endDate" className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" />
                        {/* <p className="text-sm text-red-400">{ errors.endDate }</p> */}
                    </div>
                    <div>
                        <label for="details" className="text-base font-medium text-gray-700 block mb-2">End Date</label>
                        <input type="textarea" value={ details } onChange={ (e) => setDetails(e.target.value)} name="details" className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" />
                        {/* <p className="text-sm text-red-400">{ errors.endDate }</p> */}
                    </div>
                    <div>
                        <label for="taskname" class="text-base font-medium text-gray-700 block mb-2">Status</label>
                        <select name="status" value={ status } onChange={ (e) => setStatus(e.target.value)} className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2" >
                            <option value='In Progress'>In Progress</option>
                            <option value='completed'>Completed</option>
                            <option value='due'>Due</option>
                            <option value='past due'>Past Due</option>
                        </select>
                        {/* <p className="text-sm text-red-400">{ errors.status }</p> */}
                    </div>
                    <div className="flex justify-between">
                        <button onClick={ visibility} type="button" variant="secondary" className="px-4 bg-gray-200 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-grey-500 focus:outline-none focus:ring focus:border-blue-300">Close</button>
                        <button type="submit" variant="primary" className="px-4 bg-teal-500 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-teal-300 focus:outline-none focus:ring focus:border-blue-300">Submit</button>
                    </div>
                </form>
            </div>  
        </div>
    )
}

export default UpdateTask;