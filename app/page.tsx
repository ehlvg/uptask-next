"use client";
import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import "./globals.css";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  // If user is authenticated, redirect to dashboard
  // supabase.auth.onAuthStateChange((event, session) => {
  //   if (session) {
  //     window.location.href = "/dashboard";
  //   }
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");
      window.location.href = "/dashboard";
    }
  };
  return (
    <>
      <Flex direction="column" gap="2" mx={{ initial: "auto" }}>
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md">
          <Heading size="9" className="title">
            uptask<span className="text-orange-500">.</span>
          </Heading>
          <Heading size="7" className="subtitle">
            welcome back
          </Heading>
          <div className="space-y-4 rounded-full shadow-sm">
            <TextField.Root
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              type="email"
            >
              <TextField.Slot>
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root
              placeholder="pass1234"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>
            <Button onClick={handleLogin} className="block relative w-full">
              Sign in
            </Button>
          </div>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Sign up
            </Link>
          </div>
          <Text color="red">{message}</Text>
        </div>
      </Flex>
    </>
  );
}
