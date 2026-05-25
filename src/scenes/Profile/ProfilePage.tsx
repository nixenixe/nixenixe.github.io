import { supabase } from "@/supabaseClient";
import { type ProfileInfo } from "@/types";
import type { UserInfo } from "@/User.context";
import { Button, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import { NameForm } from "./NameForm";
import { ChangePassword } from "./ChangePassword";
import { ChangeEmail } from "./ChangeEmail";

interface ProfilePageProps {
  user: UserInfo;
  profile: ProfileInfo;
  getProfileInfo: () => Promise<void>;
  getUserInfo: () => Promise<void>;
}

export const ProfilePage = ({
  user,
  profile,
  getProfileInfo,
  getUserInfo,
}: ProfilePageProps) => {
  return (
    <Stack gap={6} maxW="600px" mx="auto">
      <Heading>{profile.name ? `Hi, ${profile.name}!` : "Profile"}</Heading>
      <Text>
        <strong>Email:</strong> {user.email}
      </Text>
      <ChangeEmail getUserInfo={getUserInfo} />
      <Separator marginY={4} />
      <NameForm profile={profile} getProfileInfo={getProfileInfo} />
      <Separator marginY={4} />
      <ChangePassword />
      <Separator marginY={4} />
      <Button onClick={() => supabase.auth.signOut()} variant="subtle" marginBottom={16}>
        Log out
      </Button>
    </Stack>
  );
};
