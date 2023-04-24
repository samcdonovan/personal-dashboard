import { useState } from 'react';
import Task from "../components/Task";

/* To-do list page functional component; displays current tasks for the user,
allows them to tick them if they are completem and add more tasks */
function Tasks() {

    /* list of tasks, will update with database funcitonality later */
    const [taskList, setTaskList] = useState(Array<any>);

    /**
     * Adds a task to the 'taskList' state which is displayed on the page
     */
    function addTask() {
        setTaskList(taskList.concat(<Task id={taskList.length + 1} />));
    }

    return (
        <div>
            <h1>Tasks</h1>
            {taskList}
            <button onClick={addTask}>+</button>
        </div>
    );
}

export default Tasks;