import { useState } from "react";
import updateUser from "@/services/database/updateUser";
import { logError } from "@/services/database";
import useUser from "@/context/user/useUser";
import { useToast } from "react-native-toast-notifications";
import DailyQuotaForm from "./Registration/DailyQuotaForm";
import QuotaFormState from "./Registration/QuotaFormState";
import WeeklyQuotaForm from "./Registration/WeeklyQuotaForm";

export function Profile() {
  const { user } = useUser();
  const toast = useToast();

  const [quota, setQuota] = useState<QuotaFormState>({
    weeklyQuota: user.weeklyQuota,
    dailyQuota: user.dailyQuota,
    useWeeklyQuota: user.useWeeklyQuota,
    name: user.name,
  });

  const saveQuota = () => {
    const { weeklyQuota, dailyQuota, useWeeklyQuota, name } = quota;
    try {
      updateUser({
        name,
        weeklyQuota,
        dailyQuota,
        useWeeklyQuota,
        id: user.id,
        updatedAt: Date.now(),
        startTime: 0,
        createdAt: Date.now(),
      }).then(() => toast.show("Updated"));
    } catch (error) {
      logError("Quotaform", "create user", error as Error);
    }
  };

  if (!quota.useWeeklyQuota)
    return (
      <DailyQuotaForm quota={quota} setQuota={setQuota} saveQuota={saveQuota} />
    );

  return (
    <WeeklyQuotaForm quota={quota} setQuota={setQuota} saveQuota={saveQuota} />
  );
}
