import { useRoute } from "@react-navigation/native";
import { Typography } from "../../components";

export default function ActivityScreen() {
  const { params } = useRoute();
  console.log("params", params);
  return <Typography>This is activity</Typography>;
}
