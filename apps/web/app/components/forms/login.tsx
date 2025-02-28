import { Alert, Button, CloseButton, Field, Fieldset, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormValues>();

  // const onSubmit = handleSubmit(async () => {
  //   setLoading(true);
  //   const { email, password } = getValues();
  //   const res = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email: email, password: password }),
  //   });
  //
  //   const data = await res.json();
  //   console.log(data);
  //   setMessage(data.error || data.message);
  //   setLoading(false);
  // });
  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    setMessage(null);
    const { email, password } = getValues();
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) {
      setMessage(res.error);
      setLoading(false);
    }
    if (res?.ok) {
      setLoading(false);
      return router.push('/');
    }
  })
  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root size="lg" maxW="md" height={420}>
        <Stack>
          <Fieldset.Legend>Sign In</Fieldset.Legend>
          <Fieldset.HelperText>
            Provide your credentials for login.
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
          Login
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

export { LoginForm };