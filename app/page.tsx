"use client"
import {Button, Flex, Heading, Text, TextField} from "@radix-ui/themes";
import "./globals.css";
import {EnvelopeClosedIcon, LockClosedIcon} from "@radix-ui/react-icons";
import {supabase} from "@/utils/supabase";
import {useState} from "react";

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Login successful!');
            window.location.href = '/dashboard';
        }
    };
  return (
      <>
          <Flex direction="column" gap="2" maxWidth={{initial: "300px", md: "500px"}} mx={{initial: "auto"}}>
              <Heading size="9" className="title">uptask<span className="text-orange-500">.</span></Heading>
              <Heading size="7" className="subtitle">welcome</Heading>
              <TextField.Root value={email}
                              onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email">
                  <TextField.Slot>
                      <EnvelopeClosedIcon/>
                  </TextField.Slot>
              </TextField.Root>
              <TextField.Root placeholder="pass1234" type="password" value={password}
                              onChange={(e) => setPassword(e.target.value)}>
                  <TextField.Slot>
                      <LockClosedIcon/>
                  </TextField.Slot>
              </TextField.Root>

              <Button onClick={handleLogin}>Sign up</Button>
              <Text color="red">{message}</Text>
          </Flex>
      </>
  );
}
