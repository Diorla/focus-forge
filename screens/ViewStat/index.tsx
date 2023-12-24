import { useRoute } from "@react-navigation/native";
import { Typography } from "../../components";

export default function ViewStatScreen() {
  const { params } = useRoute();
  console.log("params", params);
  return <Typography>View stat</Typography>;
}
