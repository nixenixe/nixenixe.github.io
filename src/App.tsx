import { Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import { Menu } from "./components/Menu";
import { Box, Spinner } from "@chakra-ui/react";
import { VacationPage } from "./scenes/Vacation/VacationPage";

import { useEffect, useState } from "react";

import { UserProvider, type UserInfo } from "./User.context";
import { supabase } from "./supabaseClient";
import { ProfilePage } from "./scenes/Profile/ProfilePage";
import { LoginPage } from "./scenes/Login/LoginPage";
import { TodoPage } from "./scenes/Todo/TodoPage";

function App() {
  const [user, setUser] = useState<UserInfo | null | "ERROR">(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function getInitialUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user ? { id: user.id, email: user.email ?? "" } : null);
      setAuthLoading(false);
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

  const getContent = () => {
    if (authLoading) {
      return <Spinner size="xl" />;
    }

    if (user === "ERROR") {
      return <div>Error loading user</div>;
    }

    if (!user) {
      return <LoginPage />;
    }

    return (
      <UserProvider user={user} setUser={setUser}>
        <Routes>
          <Route path={routes.PROFILE} element={<ProfilePage />} />
          <Route path={routes.HOME} element={<TodoPage />} />
          <Route path={routes.VACATION} element={<VacationPage />} />
        </Routes>
      </UserProvider>
    );
  };

  return (
    <>
      <Menu isLoggedIn={!!user} />
      <Box padding={{ base: "4", md: "6" }}>{getContent()}</Box>
    </>
  );
}

export default App;
