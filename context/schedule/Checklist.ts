import ActivityModel from "../data/model/ActivityModel";

interface Checklist extends ActivityModel {
  remaining: number;
}

export default Checklist;
