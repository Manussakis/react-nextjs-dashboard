import {
  Flex,
  Text,
  Box,
  Avatar,
} from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box
          mr="4"
          textAlign="right"
        >
          <Text>Gabriel Manussakis</Text>
          <Text color="gray.300" fontSize="small">gabrielmanussakis@gmail.com</Text>
        </Box>
      )}
      <Avatar size="md" name="Gabriel Manussakis" src="https://github.com/manussakis.png" />
    </Flex>
  );
};
