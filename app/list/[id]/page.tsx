import BackButton from "@/app/components/BackButton";
import SignOutButton from "@/app/components/SignOutButton";
import { supabase } from "@/utils/supabase";
import { ArrowLeftIcon, ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Heading,
  IconButton,
  Inset,
  Separator,
  Text,
} from "@radix-ui/themes";

export default async function ListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log((await params).id);
  const { data: tasks } = await supabase
    .from("user_tasks")
    .select()
    .eq("task_list_id", (await params).id);

  return (
    <Flex direction="column" gap="3">
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
          <BackButton />
          <Heading size={"5"} mr={"auto"}>
            Dashboard
          </Heading>
          <SignOutButton />

          <IconButton variant="ghost">
            <PersonIcon />
          </IconButton>
        </Flex>

        <Separator
          mb="auto"
          orientation={"horizontal"}
          className={"separator"}
        />
      </Inset>
    </Flex>
  );
}
