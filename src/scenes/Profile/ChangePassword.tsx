import { toaster } from "@/components/ui/toaster";
import { updatePassword } from "./server";
import {
  ChangePasswordForm,
  type ChangePasswordFormType,
} from "@/components/ChangePassword/ChangePasswordForm";

export const ChangePassword = () => {
  const onSubmit = (data: ChangePasswordFormType, reset: () => void) => {
    return new Promise<void>((resolve) => {
      updatePassword(data.newPassword).then((res) => {
        reset();
        if (res.type === "ERROR") {
          toaster.create({
            title: res.message || "Couldn't change password. Please try again later.",
            type: "error",
          });
          resolve();
          return;
        }
        toaster.create({
          title: "Password changed successfully.",
          type: "success",
        });
        resolve();
      });
    });
  };

  return <ChangePasswordForm updatePassword={onSubmit} />;
};
