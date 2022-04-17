import { Stack, Box, Text } from "@chakra-ui/react";
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  total: number;
  currentPage?: number;
  registersPerPage?: number;
  onChangePage: (page: number) => void;
}

const siblingsCount = 1;

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from )]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
};

export const Pagination = ({ total, currentPage = 1, registersPerPage = 10, onChangePage }: PaginationProps) => {
  const lastPage = Math.ceil(total / registersPerPage);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];
   const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : [];

  return (
    <Stack direction={["column", "row"]} mt="4" justify="space-between" spacing="6" align="center">
      <Box>
        <strong>{ currentPage * registersPerPage }</strong> - <strong>{ (currentPage + 1 ) * registersPerPage }</strong> out of { total }
      </Box>
      <Stack direction="row" spacing="2">

        { currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem page={1} onClick={onChangePage} />
            { currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width={8} textAlign="center">...</Text>
            )}
          </>
        )}

        { previousPages.length > 0 && previousPages.map((page) => (
          <PaginationItem key={page} page={page} onClick={onChangePage} />
        ))}

        <PaginationItem page={currentPage} isActive onClick={onChangePage} />

        { nextPages.length > 0 && nextPages.map((page) => (
          <PaginationItem key={page} page={page} onClick={onChangePage} />
        ))}

        { (currentPage + siblingsCount) < lastPage && (
          <>
            { (currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" width={8} textAlign="center">...</Text>
            )}
            <PaginationItem page={lastPage} onClick={onChangePage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
