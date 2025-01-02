"use client";

import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import {
  Card,
  Flex,
  Heading,
  IconButton,
  Inset,
  Separator,
  Text,
} from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";
import { TaskList } from "@/app/types/taskList";

export default function Dashboard() {
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
      maxWidth={"500px"}
      mx={"auto"}
      my={"3"}
      justify={"center"}
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
          {taskLists.map((taskList) => (
            <Card
              key={taskList.id}
              size={"1"}
              onClick={() => {
                window.location.href = `/list/${taskList.id}`;
              }}
              variant={"classic"}
            >
              <Flex justify={"start"} gap={"2"}>
                <Text size={"3"}>{taskList.emoji}</Text>
                <Text size={"3"}>{taskList.name}</Text>
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
