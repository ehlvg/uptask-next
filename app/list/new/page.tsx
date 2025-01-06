"use client";

import { user } from "@/utils/getCurrentUser";
import { supabase } from "@/utils/supabase";
import {
  Button,
  Dialog,
  Flex,
  Heading,
  TextField,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";

interface NewTaskListProps {
  onClose: () => void;
}

export default function NewTaskList({ onClose }: NewTaskListProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📝");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter a task list name");
      return;
    }

    const { data, error: supabaseError } = await supabase
      .from("task_lists")
      .insert([
        {
          name: name.trim(),
          emoji: emoji,
          user_id: user!.id,
        },
      ])
      .select();

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }

    // Redirect to the dashboard after successful creation
    window.location.href = "/dashboard";
  };

  return (
    <Dialog.Root defaultOpen>
      <Dialog.Content maxWidth={{ initial: "200px", md: "250px" }}>
        <Dialog.Title>Create New Task List</Dialog.Title>
        <Flex direction="column" gap="3">
          <Flex gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Emoji
              </Text>
              <TextField.Root
                className="emoji-input"
                maxLength={2}
                required
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                List Name
              </Text>
              <TextField.Root
                maxLength={24}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter list name"
              />
            </label>
          </Flex>
          {error && (
            <Text color="red" size="2">
              {error}
            </Text>
          )}
          <Flex gap="3" mt="4" justify="center">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button onClick={handleSubmit}>Create List</Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
