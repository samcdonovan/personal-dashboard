import React from 'react';

/* Simple props interface for Task component */
interface TaskProps {
    id: number
}

/* Task component; allows user to type a task and press the checkbox next to it
to confirm that it is completed */
function Task(props: TaskProps) {
    return (

        <div>
            <input
                type="text"
                placeholder={"Task " + props.id}
            />
            <input type="checkbox" defaultChecked={false} />

        </div>
    );
}

export default Task;