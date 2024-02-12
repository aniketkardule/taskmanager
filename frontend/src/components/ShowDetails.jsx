import React, { useState } from "react";



const ShowDetails = ({ visible, task }) => {

    return(
            
        <div className="bg-gray-100 flex items-center justify-center h-screen fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
                
                <p className="text-xl text-gray-600 mb-4">Details of task {task.id}</p>
                <form className="space-y-4">
                    <div>
                        <label for="taskname" className="text-base font-medium text-gray-700 block mb-2">Task Name</label>
                        <p className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2">{task.task_name}</p>
                    </div>
                    
                    <div>
                        <label for="startdate" className="text-base font-medium text-gray-700 block mb-2">Details</label>
                        <p className="h-9 form-input block w-full border border-gray-300 rounded-md shadow-sm pl-2"> {task.details}</p>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={ visible } variant="secondary" className="px-4 bg-gray-200 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-grey-500 focus:outline-none focus:ring focus:border-blue-300">Close</button>
                    </div>
                </form>
            </div>  
        </div>
    );
}

export default ShowDetails;