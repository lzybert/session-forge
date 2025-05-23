import {
  Alert,
  Button,
  CloseButton,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Stack,
} from '@chakra-ui/react';
import { Types } from 'mongoose';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateCampaignFormValues {
  gm: Types.ObjectId;
  title: string;
  system: string;
  createdAt: Date;
  description?: string;
  players?: Types.ObjectId[];
  sessions?: Types.ObjectId[];
  generalNotes?: string;
}
const systemOptions = [
  { option: 'D&D', value: 'D&D' },
  { option: 'Call of Cthulhu', value: 'Call of Cthulhu' },
  { option: 'Pulp Cthulhu', value: 'Pulp Cthulhu' },
  { option: 'Achtung! Cthulhu', value: 'Achtung! Cthulhu' },
];

const CreateCampaignForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const { data } = useSession();
  const user = data?.user;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateCampaignFormValues>();

  const onSubmit = handleSubmit(async () => {
    setLoading(true);

    if (!user) {
      setMessage('You need to sign in');
      setLoading(false);
      return;
    }

    const { title, system, description } = getValues();
    const formValues = {
      gm: user.id,
      title,
      system,
      description,
      createdAt: new Date(),
    };

    const res = await fetch('/api/campaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();
    console.log(formValues);
    setMessage(data.error || data.message);
    setLoading(false);
  });
  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root size="lg" maxW="md" height={420}>
        <Fieldset.Content py="8">
          <Field.Root invalid={!!errors.title}>
            <Field.Label>
              Title <Field.RequiredIndicator />
            </Field.Label>
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
            <Input
              {...register('title', {
                required: 'Campaign title is required',
              })}
              placeholder="me@example.com"
              type="input"
              name="title"
              px="2"
            />
          </Field.Root>

          <Field.Root invalid={!!errors.system}>
            <Field.Label>
              System <Field.RequiredIndicator />
            </Field.Label>
            <Field.ErrorText>{errors.system?.message}</Field.ErrorText>
            <NativeSelect.Root size="md">
              <NativeSelect.Field
                placeholder="Select system"
                {...register('system', {
                  required: 'Game system is required',
                })}>
                {systemOptions.map((currentValue) => {
                  return (
                    <option
                      value={currentValue.value}
                      key={currentValue.option}>
                      {currentValue.option}
                    </option>
                  );
                })}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Field.Root>

          <Field.Root invalid={!!errors.description}>
            <Field.Label>Description</Field.Label>
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
            <Input
              {...register('description')}
              placeholder="Campaign description"
              type="text"
              name="description"
              px="2"
            />
          </Field.Root>
        </Fieldset.Content>

        <Button
          type="submit"
          w="md"
          variant="outline"
          textStyle="link"
          borderColor="cthulhu-green-100/50"
          bg="cthulhu-green-700/90"
          px="16"
          disabled={loading}
          loading={loading}>
          Create
        </Button>
        {message && (
          <Alert.Root status="info" variant="surface" my={8} py={4} px={4}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{message}</Alert.Title>
            </Alert.Content>
            <CloseButton
              pos="absolute"
              top="1"
              insetEnd="0"
              onClick={() => setMessage(null)}
            />
          </Alert.Root>
        )}
      </Fieldset.Root>
    </form>
  );
};

export { CreateCampaignForm };
