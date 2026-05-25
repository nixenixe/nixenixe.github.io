import { FullPageSpinner } from "@/components/FullPageSpinner";
import { Message } from "@/components/Message";
import { UserContext } from "@/types";
import { useContext } from "react";
import { ProfilePage } from "./ProfilePage";

export const Profile = () => {
  const userContext = useContext(UserContext);

  if (
    !userContext ||
    userContext.user === "ERROR" ||
    userContext.profile === "ERROR"
  ) {
    return (
      <Message type="error">
        Couldn't get user information. Please try again later.
      </Message>
    );
  }

  if (userContext.user === null || userContext.profile === null) {
    return <FullPageSpinner />;
  }

  return (
    <ProfilePage
      user={userContext.user}
      profile={userContext.profile}
      getProfileInfo={userContext.getProfileInfo}
      getUserInfo={userContext.getUserInfo}
    />
  );
};
