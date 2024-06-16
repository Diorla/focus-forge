import { initialUser } from "@/context/user/initialUser";
import { loadDB } from "../database";
import getUser from "./getUser";
import getActivityList from "./getActivityList";
import UserModel from "@/context/user/UserModel";
import ActivityModel from "@/context/data/model/ActivityModel";
import { initialActivity } from "@/context/data/initialActivity";
import upload from "../database/uploadDB/upload";
import saveUser from "./saveUser";
import storeActivityList from "./storeActivityList";
import mergeObj from "./mergeDB";

export default async function sync(userId: string) {
  // fetch DB data
  const db = await loadDB(userId);
  const json: { user: UserModel; activityList: ActivityModel[] } = db
    ? JSON.parse(db)
    : { user: initialUser, activityList: [] };
  const user = await getUser();
  const activityList = await getActivityList();
  const { user: remoteUser, activityList: remoteActivityList } = json;
  const mergedUser = { ...mergeObj(user, remoteUser), id: userId };
  const mergedActivityKeys = Array.from(
    new Set([
      ...activityList.map((a) => a.id),
      ...remoteActivityList.map((a) => a.id),
    ])
  );

  const mergedActivityList: ActivityModel[] = mergedActivityKeys.map((key) =>
    mergeObj<ActivityModel>(
      activityList.find((a) => a.id === key) || initialActivity,
      remoteActivityList.find((a) => a.id === key) || initialActivity
    )
  );
  const stringifiedData = JSON.stringify({
    user: mergedUser,
    activityList: mergedActivityList,
  });
  await upload({ uri: stringifiedData, userId });
  await saveUser(mergedUser);
  await storeActivityList(mergedActivityList);
  return { user: mergedUser, activityList: mergedActivityList };
}
