import { supabase } from "@/supabaseClient";
import { type ProfileInfo } from "@/types";
import type { UserInfo } from "@/User.context";
import { Button, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import { NameForm } from "./NameForm";
import { ChangePassword } from "./ChangePassword";

interface ProfilePageProps {
  user: UserInfo;
  profile: ProfileInfo;
  getProfileInfo: () => Promise<void>;
}

export const ProfilePage = ({
  user,
  profile,
  getProfileInfo,
}: ProfilePageProps) => {
  return (
    <Stack gap={6} maxW="600px" mx="auto">
      <Heading>{profile.name ? `Hi, ${profile.name}!` : "Profile"}</Heading>
      <Text>
        <strong>Email:</strong> {user.email}
      </Text>
      <NameForm profile={profile} getProfileInfo={getProfileInfo} />
      <Separator />
      <ChangePassword />
      <Separator />
      <Button
        onClick={() => supabase.auth.signOut()}
        colorPalette="orange"
        variant="subtle"
      >
        Log out
      </Button>
    </Stack>
  );
};
