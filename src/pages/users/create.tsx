import {
  Flex,
  Box,
  Heading,
  Divider,
  HStack,
  VStack,
  Button,
  SimpleGrid,
} from '@chakra-ui/react'
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
  name: yup.string().required(),
  password: yup.string().required().min(6, 'Minimun 6 characters'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password'),
  ], 'Passwords should match'),
});

export default function UserList() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size="lg" fontWeight="normal">Create user</Heading>
          <Divider my="6" borderColor="gray.700"></Divider>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input id="name" name="name" label="Name" {...register('name')} error={errors.name} />
              <Input id="email" name="email" type="email" label="Email" {...register('email')} error={errors.email} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input id="password" name="password" type="password" label="Password" {...register('password')} error={errors.password} />
              <Input id="password-confirmation" type="password" name="password_confirmation" label="Confirm password" {...register('password_confirmation')} error={errors.password_confirmation}/>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancel</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Save</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
