import ActivityModel from "@/context/data/model/ActivityModel";
import { Dispatch, SetStateAction } from "react";

export default interface FormProps {
  activity: ActivityModel;
  taskList: {
    title: string;
    checked: number;
    created: number;
  }[];
  setTaskList: Dispatch<
    SetStateAction<
      {
        title: string;
        checked: number;
        created: number;
      }[]
    >
  >;
  setShowAddNewTask: Dispatch<SetStateAction<boolean>>;
  showAddNewTask: boolean;
}
