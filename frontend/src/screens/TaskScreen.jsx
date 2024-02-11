import React, { useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskTable from "../components/TaskTable";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

const TaskScreen = () => {

    const { user } = useSelector(state => state.user);
    const [createTaskVisible, setCreateTaskVisible] = useState(false);
    const [filterValue, setFilterValue] = useState('');


    const setCreateTask = () => {
        setCreateTaskVisible(false);
    }

    return(
        <>
        <div className="tasks-container">
            
            <div class="relative overflow-x-auto my-5 w-full lg:w-1/2 md:w-3/4 mx-auto">
                <div className="flex width-full justify-between">
                    <input onChange={ e => setFilterValue(e.target.value)} type="text" aria-describedby="helper-text-explanation" className="h-10 w-1/2 my-5 bg-gray-50 float-left border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  light:bg-gray-700 light:border-gray-600 dark:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" placeholder="Search Task" />
                    <button onClick={ () => setCreateTaskVisible(true) } className="h-10 float-left bg-teal-500 text-white px-4 my-5 mr-7 rounded">Add Task</button>
                </div>
                
                <TaskTable filter={ filterValue} tasks={ user.tasks } />
            </div>

        </div>
        { createTaskVisible && <AddTaskForm visible={setCreateTask} /> }
        </>
    )
}

export default TaskScreen;