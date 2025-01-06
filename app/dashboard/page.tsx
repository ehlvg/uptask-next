"use client";

import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Inset,
  ScrollArea,
  Separator,
  Text,
} from "@radix-ui/themes";
import {
  DotsHorizontalIcon,
  ExitIcon,
  PersonIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { TaskList } from "@/app/types/taskList";
import NewTaskList from "../list/new/page";
import ListCard from "../components/ListCard";
import EditListPopup from "../components/EditListPopup";

export default function Dashboard() {
  const [editingList, setEditingList] = useState<TaskList | null>(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddList, setShowAddList] = useState(false);
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchTaskLists = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("task_lists")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error.message);
    } else {
      setTaskLists(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  return (
    <Flex
      gap={"2"}
      direction={"column"}
      justify={"between"}
      minWidth={{ initial: "95%" }}
    >
      <Inset
        side={"top"}
        className="popup-animate"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "var(--color-background)",
          zIndex: 1000,
        }}
      >
        <Flex justify={"start"} align={"center"} p="2" gap="2">
          <Heading size={"5"} mr={"auto"}>
            Dashboard
          </Heading>
          <IconButton
            variant="ghost"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
          >
            <ExitIcon />
          </IconButton>

          <IconButton variant="ghost" onClick={() => {}}>
            <PersonIcon />
          </IconButton>
        </Flex>

        <Separator
          mb="auto"
          orientation={"horizontal"}
          className={"separator"}
        />
      </Inset>

      {loading ? (
        <Text>Loading task lists...</Text>
      ) : taskLists.length === 0 ? (
        <Text>No task lists yet!</Text>
      ) : (
        <Flex direction={"column"} gap={"2"} m={"2"} mt={"9"}>
          <Heading size="6">Task lists</Heading>
          <ScrollArea scrollbars="vertical" style={{ height: "65vh" }}>
            <div className="card-grid">
              {taskLists.map((taskList) => (
                <ListCard
                  key={taskList.id}
                  taskList={taskList}
                  onEdit={() => {
                    setEditingList(taskList);
                    setShowEditPopup(true);
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </Flex>
      )}
      <Button
        onClick={() => setShowAddList(!showAddList)}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          padding: 0,
          fontSize: "24px",
          zIndex: 1000,
        }}
      >
        +
      </Button>
      {showAddList && <NewTaskList onClose={() => setShowAddList(false)} />}
    </Flex>
  );
}
