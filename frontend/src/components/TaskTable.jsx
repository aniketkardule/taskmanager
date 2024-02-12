import React, { useState } from "react";
import UpdateTask from "./UpdateTask";
import ShowDetails from "./ShowDetails";
import { useDispatch } from "react-redux";
import { setuser } from "../slices/UserSlice";
import { toast } from "react-toastify";

const TaskTable = ({ filter, tasks }) => {

    const dispatch = useDispatch();

    const [updateTask, setUpdateTask] = useState(false);
    const [detailsData, setDetailsData] = useState({
        task_name: '',
        start_date: '',
        end_date: '',
        status: ''
    })
    const [showDitailsVisibility, setShowDetailsVisibility] = useState(false);
    const [updateData, setupdateData] = useState({
        task_name: '',
        start_date: '',
        end_date: '',
        status: ''
    });
    const handleUpdateTask = (task) => {
        setUpdateTask(true);
        setupdateData(task)
    }
    const showDetails = (data) => {
        setShowDetailsVisibility(true);
        setDetailsData(data);
    }

    const closeForm = () => {
        setUpdateTask(false)
        setShowDetailsVisibility(false);
    }

    const handleDeleteTask = (taskid) => {

        const datas = fetch(`${process.env.REACT_APP_API_URL}tasks/${taskid}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
        dispatch(setuser(data));
        toast.success("Task deleted successfully !")
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    }
    return(
        <>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                        <tr>
                            <th>
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Task title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                End Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map(task => {
                                return( task.task_name.toLowerCase().includes(filter.toLowerCase()) &&

                                    <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700">
                                        <td>
                                            { task.id }
                                        </td>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                            { task.task_name }
                                        </th>
                                        <td className="px-6 py-4">
                                            { task.start_date }
                                        </td>
                                        <td className="px-6 py-4">
                                            { task.end_date }
                                        </td>
                                        <td className="px-6 py-4">
                                            { task.status }
                                        </td>
                                        <td className="flex">
                                            <svg onClick={()=> showDetails(task)} className="py-1 mt-2 mx-1 bg-yellow-500 h-8 w-8 text-white rounded cursor-pointer"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            <svg onClick={() => handleUpdateTask(task)} className="py-1 mt-2 mx-1 bg-teal-500 h-8 w-8 text-white rounded cursor-pointer"  width="18" height="18" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                                            <svg onClick={() =>  handleDeleteTask(task.id)} className="py-1 mt-2 mx-1 bg-red-800 h-8 w-8 text-white rounded cursor-pointer"  width="18" height="18" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                        </td>
                                    </tr> 
                                )
                            })
                        }
                    </tbody>
                </table>

                { updateTask && <UpdateTask visibility={ closeForm } data={updateData} /> }
                { showDitailsVisibility && <ShowDetails visible={closeForm} task={detailsData} />}
            </>
    )
}

export default TaskTable;