import ActivityModel from "@/context/data/model/ActivityModel";
import { Dispatch, SetStateAction } from "react";

export default interface ItemProps {
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
  item: {
    title: string;
    checked: number;
    created: number;
  };
}
