import React from "react";
import type { joinEventType } from "../../../feature/students/type";

type eventProps = {
  // open:boolean,
  // setOpenChange: () => void,
  events: joinEventType[];
  loading: boolean;
};

export default function EventPresentList({ events, loading }: eventProps) {
  return <div>EventPresentList</div>;
}
