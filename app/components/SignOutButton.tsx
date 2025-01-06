"use client";
import { supabase } from "@/utils/supabase";
import { ExitIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

export default function SignOutButton() {
  return (
    <IconButton
      variant="ghost"
      onClick={async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
      }}
    >
      <ExitIcon />
    </IconButton>
  );
}
