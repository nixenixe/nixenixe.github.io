import { toaster } from "@/components/ui/toaster";
import { Group, Field, Input, Button } from "@chakra-ui/react";
import { type ProfileInfo } from "@/types";
import { useForm } from "react-hook-form";
import { updateProfileName } from "./server";

type ProfileForm = {
  name: string;
};

interface NameFormProps {
  profile: ProfileInfo;
  getProfileInfo: () => Promise<void>;
}

export const NameForm = ({ profile, getProfileInfo }: NameFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileForm>({ defaultValues: { name: profile.name ?? "" } });

  const onSubmit = (data: ProfileForm) => {
    return new Promise<void>((resolve) => {
      updateProfileName(data.name).then((res) => {
        if (res === "ERROR") {
          toaster.create({
            title: "Couldn't change name. Please try again later.",
            type: "error",
          });
          resolve();
          return;
        }

        toaster.create({
          title: "Name changed successfully.",
          type: "success",
        });
        resolve();
        getProfileInfo();
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group attached w="full" alignItems="end">
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Name</Field.Label>
          <Input {...register("name", { required: true })} />
          <Field.ErrorText width="full">
            <Field.ErrorIcon />
            This field is required
          </Field.ErrorText>
        </Field.Root>
        <Button
          type="submit"
          marginTop="4"
          loading={isSubmitting}
          disabled={!isDirty}
        >
          Save
        </Button>
      </Group>
    </form>
  );
};
