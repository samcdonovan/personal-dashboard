import React, { useState, useEffect } from 'react';
import styles from "../styles/tasks.module.css";

/* Simple props interface for Task component */
interface TaskProps {
    id: number,
    value: string,
    isChecked: boolean
}

/* Task component; allows user to type a task and press the checkbox next to it
to confirm that it is completed */
function Task(props: TaskProps) {
    const [task, setTask] = useState(props.value);
    const [isChecked, setIsChecked] = useState(props.isChecked);

    useEffect(() => {
        console.log(props.id)
        let tasksJson = JSON.parse(localStorage.getItem("tasks") || '{}');
        tasksJson[props.id]['task'] = task;

        localStorage.setItem("tasks", JSON.stringify(tasksJson));

    }, [task])

    useEffect(() => {

        let tasksJson = JSON.parse(localStorage.getItem("tasks") || '{}');
        tasksJson[props.id]['isChecked'] = isChecked;

        localStorage.setItem("tasks", JSON.stringify(tasksJson));

    }, [isChecked])

    return (

        <div className={styles["task"]}>
            <input
                type="text"
                placeholder={"Task " + (props.id + 1)}
                value={task}
                onChange={(event: any) => { setTask(event.target.value) }}
            />
            <input type="checkbox" defaultChecked={isChecked}
                onChange={(event: any) => { setIsChecked(event.target.checked) }} />

        </div>
    );
}

export default Task;