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

import { ICampaign } from '../../../models/Campaign';

interface CreateSessionFormValues {
  campaignId: Types.ObjectId;
  gm: Types.ObjectId;
  name: string;
  date: Date;
  summary: string;
  attendees?: Types.ObjectId[];
  notes?: Types.ObjectId[];
  events?: string[];
}

interface CreateSessionFormProps {
  campaigns?: ICampaign[];
}

const CreateSessionForm = ({ campaigns }: CreateSessionFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const { data } = useSession();
  const user = data?.user;
  const campaignOptions =
    campaigns?.map((campaign) => ({
      value: (campaign._id as string).toString(), // Convert ObjectId to string for the <option> value
      option: campaign.title, // Assuming ICampaign has a 'title' property
    })) ?? [];

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreateSessionFormValues>();

  const onSubmit = handleSubmit(async () => {
    setLoading(true);

    if (!user) {
      setMessage('You need to sign in');
      setLoading(false);
      return;
    }

    const { name, summary, campaignId, date } = getValues();
    console.log(getValues());
    const formValues = {
      gm: user.id,
      campaignId,
      name,
      summary,
      date: new Date(date),
    };

    const res = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();
    console.log(formValues);
    setMessage(data.error || data.message);
    if (res.ok) {
      reset();
    }
    reset();
    setLoading(false);
  });
  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root size="lg" maxW="md" height={420}>
        <Fieldset.Content py="8">
          <Field.Root invalid={!!errors.name}>
            <Field.Label>
              Title <Field.RequiredIndicator />
            </Field.Label>
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            <Input
              {...register('name', {
                required: 'Session name is required',
              })}
              placeholder="Session name"
              type="input"
              name="name"
              px="2"
            />
          </Field.Root>

          <Field.Root invalid={!!errors.campaignId}>
            <Field.Label>Campaign</Field.Label>
            <Field.ErrorText>{errors.campaignId?.message}</Field.ErrorText>
            <NativeSelect.Root size="md">
              <NativeSelect.Field
                placeholder="Assign to campaign"
                {...register('campaignId')}>
                {campaignOptions.map((currentValue) => {
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

          <Field.Root invalid={!!errors.summary}>
            <Field.Label>Description</Field.Label>
            <Field.ErrorText>{errors.summary?.message}</Field.ErrorText>
            <Input
              {...register('summary')}
              placeholder="Session summary"
              type="text"
              name="summary"
              px="2"
            />
          </Field.Root>

          <Field.Root invalid={!!errors.date}>
            <Field.Label>
              Date <Field.RequiredIndicator />
            </Field.Label>
            <Field.ErrorText>{errors.date?.message}</Field.ErrorText>
            <Input
              {...register('date', {
                required: 'Session date is required',
              })}
              placeholder="Session date"
              type="datetime-local"
              name="date"
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

export { CreateSessionForm };
