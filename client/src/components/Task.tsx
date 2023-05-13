import React, { useState, useEffect } from 'react';
import styles from "../styles/tasks.module.css";
import { parseLocalStorage, updateLocalStorage } from "../utils/LocalStorage";

/* Simple props interface for Task component */
interface TaskProps {
    id: number,
    value: string,
    isChecked: boolean
}

/**
 * Task component; allows user to type a task and press the checkbox next to it
 * to confirm that it is completed 
 * @param props Props for the Task component
 * @returns React component
 */
function Task(props: TaskProps) {
    const [task, setTask] = useState(props.value);
    const [isChecked, setIsChecked] = useState(props.isChecked);

    /* These useEffect hooks set the localStorage values for their corresponding states.
    Both hooks are functionally the same */
    useEffect(() => {
        updateLocalStorage("tasks", task, props.id, "task");
    }, [task])

    useEffect(() => {
        updateLocalStorage("tasks", isChecked, props.id, "isChecked");
    }, [isChecked])

    return (

        <div className={styles["task"]}>
            {/* if the values of the text field or chekbox change, 
            their corresponding states get updated */}
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