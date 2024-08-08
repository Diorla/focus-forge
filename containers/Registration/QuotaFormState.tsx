import { DailyQuota } from "@/context/user/UserModel";

export default interface QuotaFormState {
  weeklyQuota: number;
  dailyQuota: DailyQuota;
  useWeeklyQuota: boolean;
  name: string;
}
