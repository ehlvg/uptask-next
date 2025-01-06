"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/verify-email");
      }
    } catch (error) {
      setError("An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="2" mx={{ initial: "auto" }}>
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md">
        <Heading size="9" className="title">
          uptask<span className="text-orange-500">.</span>
        </Heading>
        <Heading size="7" className="subtitle">
          welcome
        </Heading>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          {error && (
            <div className="rounded-full bg-red-50 p-4 text-red-500">
              {error}
            </div>
          )}
          <div className="space-y-4 rounded-full shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <TextField.Root
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              >
                <TextField.Slot>
                  <EnvelopeClosedIcon />
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <TextField.Root
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="pass1234"
              >
                <TextField.Slot>
                  <LockClosedIcon />
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <TextField.Root
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="pass1234"
              >
                <TextField.Slot>
                  <LockClosedIcon />
                </TextField.Slot>
              </TextField.Root>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="relative block w-full"
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </Flex>
  );
}
