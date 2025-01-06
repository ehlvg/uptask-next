import { supabase } from "@/utils/supabase";
import { Flex } from "@radix-ui/themes";
import { list } from "postcss";

export default async function TaskList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get TaskList tasks from the database using the id

  const tasks = await getTasksByListId((await params).id);
  console.log(tasks);
  async function getTasksByListId(listId: string) {
    const { data, error } = await supabase
      .from("user_tasks")
      .select("*")
      .eq("task_list_id", listId);

    if (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }

    return data;
  }

  return (
    <Flex
      gap={"2"}
      direction={"column"}
      maxWidth={"500px"}
      mx={"auto"}
      my={"3"}
      justify={"center"}
    ></Flex>
  );
}
