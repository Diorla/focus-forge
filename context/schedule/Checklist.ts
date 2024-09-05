import ActivityModel from "../data/model/ActivityModel";

interface Checklist extends ActivityModel {
  remaining: number;
  doneTimes: number;
}

export default Checklist;
