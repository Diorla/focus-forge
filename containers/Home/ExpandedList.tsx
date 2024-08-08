import Schedule from "@/context/schedule/Schedule";
import ProjectCard from "@/components/ProjectCard";

export default function ExpandedList({
  expanded,
  scheduleList,
}: {
  expanded: boolean;
  scheduleList: Schedule[];
}) {
  if (expanded)
    return (
      <>
        {scheduleList
          .sort((a, b) => {
            if (b.timerStart) return 1;
            if (a.timerStart) return -1;
            return 0;
          })
          .map((item) => (
            <ProjectCard item={item} type="today" key={item.id} />
          ))}
      </>
    );
  return null;
}
