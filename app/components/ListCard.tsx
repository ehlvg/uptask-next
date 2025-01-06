import { Flex, Text, IconButton, Card } from "@radix-ui/themes";
import { TaskList } from "../types/taskList";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import EditListPopup from "./EditListPopup";

// export default function ListCard(taskList: TaskList) {
//   return (
//     <Card
//       className="popup-animate card"
//       key={taskList.id}
//       size={"1"}
//       onClick={() => {
//         window.location.href = `/list/${taskList.id}`;
//       }}
//       variant={"classic"}
//       style={{ height: "100%" }}
//     >
//       <Flex justify={"start"} gap={"3"} align={"center"}>
//         <Flex p={"2"} height={"32px"} className="icon">
//           <Text size={"3"}>{taskList.emoji}</Text>
//         </Flex>
//         <Text size={"3"}>{taskList.name}</Text>
//         <IconButton onClick={() => {}} ml={"auto"}>
//           <DotsHorizontalIcon />
//         </IconButton>

//         <IconButton>
//           <TrashIcon />
//         </IconButton>
//       </Flex>
//     </Card>
//   );
// }

interface ListCardProps {
  taskList: TaskList;
  onEdit: () => void;
}

export default function ListCard({ taskList, onEdit }: ListCardProps) {
  return (
    <Flex
      direction={"row"}
      gap="2"
      key={taskList.id}
      className="items-center shadow-md rounded-lg p-2 bg-white cursor-pointer border border-grey-100 hover:border-grey-200 hover:bg-gray-100"
    >
      <Flex
        p={"2"}
        height={"32px"}
        className="icon"
        onClick={() => {
          window.location.href = `/list/${taskList.id}`;
        }}
      >
        <Text size={"3"}>{taskList.emoji}</Text>
      </Flex>
      <Text mr={"auto"}>{taskList.name}</Text>
      <IconButton variant="ghost" onClick={onEdit} ml={"auto"}>
        <DotsHorizontalIcon />
      </IconButton>
    </Flex>
  );
}
