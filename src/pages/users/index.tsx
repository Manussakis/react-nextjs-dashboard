import {
  Flex,
  Icon,
  Box,
  Text,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  useBreakpointValue,
  Spinner,
  Link,
} from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import NextLink from 'next/link';
import { useUsers } from '../../services/hooks/useUsers';
import { useEffect, useState } from 'react';
import { queryClient } from '../../services/react-query';
import { api } from '../../services/api';

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, error,} = useUsers(currentPage);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const onChangePage = (page) => {
    setCurrentPage(page);
  }

  const handlePrefetchUser = async (userId) => {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const { data } = await api.get(`users/${userId}`);

      return data;
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
              { !isLoading && isFetching && <Spinner color="gray.500" size="sm" ml="4" />}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Create new user
              </Button>
            </NextLink>
          </Flex>

          { isLoading ? (
            <Flex justify="center" align="center">
              <Spinner></Spinner>
            </Flex>
          ) : error ? (
            <div>Error</div>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6" ]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Users</Th>
                    { isWideVersion && <Th>Registered at</Th>}
                    { isWideVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  { data.users.map((user, i) => (
                    <Tr key={`user-${user.id}`}>
                      <Td px={["4", "4", "6" ]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td px={["4", "4", "6" ]}>
                        <Box>
                          <Link fontWeight="bold" onMouseEnter={() => handlePrefetchUser(user.id)}>{user.name}</Link>
                          <Text fontSize="sm" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                      { isWideVersion && <Td>{user.createdAt}</Td> }
                        {isWideVersion && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            >
                              Edit
                            </Button>
                          </Td>
                        )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination onChangePage={onChangePage} total={data.totalCount} currentPage={currentPage}/>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
