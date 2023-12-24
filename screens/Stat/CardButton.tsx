import { Card } from "@rneui/themed";
import * as React from "react";
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import useNavigate from "../../container/Nav/useNavigate";

export default function CardButton({
  title,
  type,
  source,
}: {
  title: string;
  type: "compare" | "daily" | "trends" | "general";
  source: ImageSourcePropType;
}) {
  const navigate = useNavigate();
  return (
    <TouchableOpacity onPress={() => navigate("ViewStat", { type })}>
      <Card
        containerStyle={{
          width: "40%",
          minWidth: 140,
          maxWidth: 180,
        }}
      >
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Card.Image source={source} />
      </Card>
    </TouchableOpacity>
  );
}
