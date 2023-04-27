import { useState, useEffect } from 'react';
import Task from "../components/Task";
import styles from "../styles/tasks.module.css";
import { Link } from "react-router-dom";

/**
 * To-do list page functional component; displays current tasks for the user,
 * allows them to tick them if they are completem and add more tasks 
 * @returns React component
 */
function Tasks() {

    /* list of tasks, will update with database funcitonality later */
    const [taskList, setTaskList] = useState(Array<any>);

    /**
     * Adds a task to the 'taskList' state which is displayed on the page
     */
    function addTask() {
        let id = taskList.length + 1;

        let currentTasks = JSON.parse(localStorage.getItem('tasks') || '{}');

        currentTasks[id - 1] = {};
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
        setTaskList(taskList.concat(<Task id={id - 1} value={""} isChecked={false} />));
    }

    /* form the current task list array to display on frontend */
    useEffect(() => {
        let currentList: Array<any> = [];
        let tasksJson = JSON.parse(localStorage.getItem("tasks") || '{}');

        for (let idx = 0; idx < Object.keys(tasksJson).length; idx++) {
            currentList.push(<Task key={idx} id={idx} value={tasksJson[idx]['task']} isChecked={tasksJson[idx]['isChecked']} />);
        }

        setTaskList(currentList);
    }, [])

    return (
        <div>
            <Link to="/dashboard">
                <button className="link-btn">Go to dashboard</button>
            </Link>
            <h1 className="page-title">Tasks</h1>
            <div className={"content " + styles["tasks-page-container"]}>
                <div>
                    {taskList}
                    <button className={styles["add-task"]} onClick={addTask}>
                        <span className={styles["plus-icon"]}>+</span>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Tasks;