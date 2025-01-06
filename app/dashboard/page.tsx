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
import { ExitIcon } from "@radix-ui/react-icons";
import { TaskList } from "@/app/types/taskList";
import NewTaskList from "../list/new/page";

export default function Dashboard() {
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
      <Inset side={"top"}>
        <Flex justify={"between"} align={"center"}>
          <Heading size={"5"} className={"title"}>
            Dashboard
          </Heading>
          <IconButton
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
          >
            <ExitIcon />
          </IconButton>
        </Flex>
      </Inset>

      <Separator orientation={"horizontal"} className={"separator"} />

      {loading ? (
        <Text>Loading task lists...</Text>
      ) : taskLists.length === 0 ? (
        <Text>No task lists yet!</Text>
      ) : (
        <Flex direction={"column"} gap={"2"} m={"2"}>
          <ScrollArea scrollbars="vertical" style={{ maxHeight: "70vh" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "16px",
                width: "100%",
              }}
            >
              {taskLists.map((taskList) => (
                <Card
                  key={taskList.id}
                  size={"1"}
                  onClick={() => {
                    window.location.href = `/list/${taskList.id}`;
                  }}
                  variant={"classic"}
                  style={{ height: "100%" }}
                >
                  <Flex justify={"start"} gap={"2"}>
                    <Text size={"3"}>{taskList.emoji}</Text>
                    <Text size={"3"}>{taskList.name}</Text>
                  </Flex>
                </Card>
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
