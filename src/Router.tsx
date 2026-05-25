import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Profile } from "./scenes/Profile";
import { EmailConfirmationPage } from "./scenes/Profile/EmailConfirmationPage";
import { SignupPage } from "./scenes/Signup/Signup";
import { Todo } from "./scenes/Todo";
import { VacationPage } from "./scenes/Vacation/VacationPage";
import { PrivateRoute } from "./PrivateRoute";
import { LoginPage } from "./scenes/Login/LoginPage";

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<LoginPage />} />
      <Route path={routes.SIGNUP} element={<SignupPage />} />
      <Route
        path={routes.EMAIL_CONFIRMATION}
        element={<EmailConfirmationPage />}
      />
      <Route
        path={routes.HOME}
        element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.PROFILE}
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.VACATION}
        element={
          <PrivateRoute>
            <VacationPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
