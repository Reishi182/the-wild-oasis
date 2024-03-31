import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const { updateUser, isLoading } = useUpdateUser();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { fullName: currentFullName },
  });

  function onSubmit(data) {
    if (!data) return;
    const avatarImg = data.avatar ? data.avatar[0] : null;
    if (data.fullName !== currentFullName || data.avatar)
      updateUser(
        { fullName: data.fullName, avatar: avatarImg },
        { onSuccess: reset({ avatar: null }) }
      );
  }

  function handleCancel() {
    reset({ fullName: currentFullName, avatar: null });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input disabled value={email} />
      </FormRow>
      <FormRow label="Full name">
        <Input type="text" {...register("fullName")} id="fullName" />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" {...register("avatar")} />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} type="button" variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
