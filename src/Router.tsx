import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { Profile } from "./scenes/Profile";
import { EmailConfirmationPage } from "./scenes/EmailConfirmation/EmailConfirmationPage";
import { SignupPage } from "./scenes/Signup/Signup";
import { Todo } from "./scenes/Todo";
import { VacationPage } from "./scenes/Vacation/VacationPage";
import { PrivateRoute } from "./PrivateRoute";
import { LoginPage } from "./scenes/Login/LoginPage";
import { SignupSuccess } from "./scenes/Signup/SignupSuccess";
import { ForgotPasswordPage } from "./scenes/ResetPassword/ForgotPasswordPage";
import { ResetPasswordPage } from "./scenes/ResetPassword/ResetPasswordPage";

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<LoginPage />} />
      <Route path={routes.SIGNUP} element={<SignupPage />} />
      <Route path={routes.SIGNUP_SUCCESS} element={<SignupSuccess />} />
      <Route path={routes.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={routes.RESET_PASSWORD} element={<ResetPasswordPage />} />
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
      <Route path="*" element={<Navigate to={routes.HOME} replace />} />
    </Routes>
  );
};
