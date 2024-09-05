import ActivityModel from "@/context/data/model/ActivityModel";
import { baseErrorMSG } from "./baseErrorMSG";

export default function handleError(form: ActivityModel) {
  if (!form.name) {
    return {
      ...baseErrorMSG,
      name: "Please provide a name",
    };
  }
  if (form.isOccurrence) {
    if (form.occurrence <= 0) {
      return {
        ...baseErrorMSG,
        occurrence: "Please provide a valid number",
      };
    }
  } else {
    if (!form.weeklyTarget) {
      return {
        ...baseErrorMSG,
        weeklyTarget: "Please provide a weekly target",
      };
    }
    if (!form.dailyLimit) {
      return {
        ...baseErrorMSG,
        dailyLimit: "Please provide a daily limit",
      };
    }
  }
  return null;
}
