import {
  Flex,
  Input,
  Icon,
} from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

export const SearchBox = () => {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={400}
      alignSelf="center"
      color="gray.200"
      bg="gray.700"
      position="relative"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Search"
        _placeholder={{
          color: 'gray.50'
        }}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
};
