import { supabase } from "@/supabaseClient";
import { Button, Field, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }
  }

  return (
    <VStack gap={6} align="stretch" maxW="md" mx="auto" mt={10} asChild>
      <form onSubmit={handleLogin}>
        <Heading>Log in</Heading>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            value={email}
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field.Root>

        {errorMessage && <p>{errorMessage}</p>}

        <Button type="submit" disabled={loading} loading={loading}>
          Log in
        </Button>
      </form>
    </VStack>
  );
};
