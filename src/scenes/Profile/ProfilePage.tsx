import { supabase } from "@/supabaseClient";
import { Button, VStack } from "@chakra-ui/react";

export const ProfilePage = () => {
  return (
    <VStack gap={6} align="start">
      <Button onClick={() => supabase.auth.signOut()}>Log out</Button>
    </VStack>
  );
};
