import { Flex } from "@radix-ui/themes";

export default async function TaskList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Flex
      gap={"2"}
      direction={"column"}
      maxWidth={"500px"}
      mx={"auto"}
      my={"3"}
      justify={"center"}
    >
      <h1>Task List: {(await params).id}</h1>
    </Flex>
  );
}
