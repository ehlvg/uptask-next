"use client";

import { Dialog, TextField } from "@radix-ui/themes";
import { TaskList } from "../types/taskList";
import { useState } from "react";
import { supabase } from "@/utils/supabase";

interface TaskListEditProps {
  taskList: TaskList;
  onClose: () => void;
}

export default function EditListPopup({
  taskList,
  onClose,
}: TaskListEditProps) {
  const [name, setName] = useState(taskList.name);
  const [emoji, setEmoji] = useState(taskList.emoji);

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>Edit Task List</Dialog.Title>
        <Dialog.Description>
          Edit the task list name and emoji
        </Dialog.Description>

        <TextField.Root
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField.Root>
        <TextField.Root
          placeholder="Emoji"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        ></TextField.Root>

        <Dialog.Close>Cancel</Dialog.Close>
        <Dialog.Close
          onClick={async () => {
            await supabase
              .from("task_lists")
              .update({ name, emoji })
              .eq("id", taskList.id);
            onClose();
          }}
        >
          Save
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
