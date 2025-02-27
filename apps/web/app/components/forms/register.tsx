import { Alert, Button, CloseButton, Field, Fieldset, Input, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface RegisterFormValues {
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    const { email, password } = getValues();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await res.json();
    console.log(data);
    setMessage(data.error || data.message);
    setLoading(false);
  });
  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root size="lg" maxW="md" height={420}>
        <Stack>
          <Fieldset.Legend>Sign up</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your email and password.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content py="8">
          <Field.Root
            invalid={!!errors.email}>
            <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            <Input
              {...register('email', {
                required: 'Valid email address is required',
              })}
              placeholder="me@example.com"
              type="email"
              name="email"
              px="2"
            />
          </Field.Root>

          <Field.Root
            invalid={!!errors.password}>
            <Field.Label>Password <Field.RequiredIndicator /></Field.Label>
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            <Input
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
                  message: 'Password must contain at least 8 characters, 1 of them must be an uppercase letter, 1 number and 1 special character.'
                }
              })}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              type="password"
              name="password"
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
          loading={loading}
        >
          Submit
        </Button>
        {message && <Alert.Root status="info" variant="surface" my={8} py={4} px={4}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{message}</Alert.Title>
          </Alert.Content>
          <CloseButton pos="absolute" top="1" insetEnd="0" onClick={()=> setMessage(null)}/>
        </Alert.Root>}
      </Fieldset.Root>
    </form>
  );
};

export { RegisterForm };