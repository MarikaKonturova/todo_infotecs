import React, { useContext, useState } from "react";
import { Context, statusType, taskType } from "../context/Context";
import { deleteTask, updateTask } from "../context/Actions";
import s from "./Todotask.module.css";

type TodoTaskType = {
  task: taskType | null;
  onTaskChange: (task?: taskType) => void;
};

export function TodoTask({ task, onTaskChange }: TodoTaskType) {
  const [updateMode, setUpdateMode] = useState(false);
  const { dispatch } = useContext(Context);
  const onTdtDelete = (id: string) => {
    dispatch(deleteTask(id));
    onTaskChange();
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (task) {
      const target = e.target as typeof e.target & {
        title: { value: string };
        desc: { value: string };
        status: { value: statusType };
      };
      const title = target.title.value;
      const desc = target.desc.value;
      const id = task.id;
      const status = target.status.value;
      let newTask: taskType = { id, title, desc, status };
      dispatch(updateTask(newTask));
      onTaskChange(newTask);
      setUpdateMode(false);
      console.log(newTask);
    }
  };
  if (!task) {
    return (
      <div className={s.container}>
        <p style={{ color: "rgb(117, 117, 117)", alignSelf: "center" }}>
          Choose task or create one...
        </p>
      </div>
    );
  }

  if (updateMode) {
    return (
      <div className={s.scroll}>
        <form
          onSubmit={handleSubmit}
          className={`${s.container} ${s.update_container}`}
        >
          <textarea
            name={"title"}
            defaultValue={task.title}
            id={"textInput"}
            className={s.textarea}
            autoFocus
          />

          <select
            name={"status"}
            defaultValue={task.status}
            className={s.button}
          >
            <option>pending</option>
            <option>started</option>
            <option>done</option>
          </select>
          <textarea
            name={"desc"}
            defaultValue={task.desc}
            className={s.textarea}
          />
          <button className={`${s.button} ${s.update_button}`}>Update</button>
        </form>
      </div>
    );
  }
  return (
    <section className={s.container}>
      <div className={s.scroll}>
        <h1 className={s.h1}>{task.title}</h1>
        <p
          className={
            (task.status === "pending" && `${s.pending}`) ||
            (task.status === "started" && `${s.started}`) ||
            `${s.done}`
          }
        >
          status: {task.status}
        </p>
        <div className={s.buttons}>
          <button className={s.button} onClick={() => setUpdateMode(true)}>
            Update
          </button>
          <button className={s.button} onClick={() => onTdtDelete(task.id)}>
            Delete
          </button>
        </div>
        <p className={s.desc}>{task.desc}</p>
      </div>
    </section>
  );
}
