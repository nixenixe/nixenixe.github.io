import { Menu } from "./components/Menu/Menu";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserProvider, type UserInfo } from "./User.context";
import { supabase } from "./supabaseClient";
import { FullPageSpinner } from "./components/FullPageSpinner";
import { Message } from "./components/Message";
import { Toaster } from "./components/ui/toaster";
import type { FetchResult, ProfileInfo } from "./types";
import { getProfile } from "./server";
import { Router } from "./Router";

function App() {
  const [user, setUser] = useState<FetchResult<UserInfo> | null>(null);
  const [profile, setProfile] = useState<FetchResult<ProfileInfo> | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function getInitialUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user ? { id: user.id, email: user.email ?? "" } : null);
      setAuthLoading(false);

      if (user) {
        const profileResult = await getProfile();
        setProfile(profileResult);
      }
    }

    getInitialUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email ?? "" }
          : null,
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getProfileInfo = async () => {
    const profileResult = await getProfile();
    setProfile(profileResult);
  };

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user ? { id: user.id, email: user.email ?? "" } : null);
  };

  const getContent = () => {
    if (authLoading) {
      return <FullPageSpinner />;
    }

    if (user === "ERROR") {
      return <Message type="error">Could't get user information</Message>;
    }

    return <Router />;
  };

  return (
    <UserProvider
      user={user}
      profile={profile}
      getProfileInfo={getProfileInfo}
      getUserInfo={getUserInfo}
    >
      <Toaster />
      <Menu isLoggedIn={!!user} />
      <Box padding={{ base: "4", md: "6" }} maxW="1920px" mx="auto" w="full" height="100%" display="flex" flexDirection="column">
        {getContent()}
      </Box>
      <Box
        as="footer"
        textAlign="center"
        padding="2"
        color="gray.500"
        position="absolute"
        bottom={0}
        right={0}
        fontSize="sm"
      >
        &copy; {new Date().getFullYear()} Nixenixe. All rights reserved.
      </Box>
    </UserProvider>
  );
}

export default App;
