import { Flex, Stack, Button } from '@chakra-ui/react';
import { Input } from '../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  password: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required(),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <Flex w="100vw" height="100vh" align="center" justify="center">
      <Flex
        as="form"
        bg="gray.800"
        p={8}
        borderRadius={8}
        w="100%"
        maxW={420}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4} w="100%">
          <Input id="email" name="email" type="email" label="Email" {...register("email")} error={errors.email}/>
          <Input id="password" name="password" type="password" label="Password" {...register("password")} error={errors.password} />
          <Button
            type="submit"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Sign in
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}
