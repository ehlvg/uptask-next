"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

export default function BackButton() {
  return (
    <IconButton
      variant="ghost"
      onClick={() => {
        window.history.back();
      }}
    >
      <ArrowLeftIcon />
    </IconButton>
  );
}
