import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isActive?: boolean;
  page: number;
  onClick: (page: number) => void;
}

export const PaginationItem = ({ isActive, page, onClick }: PaginationItemProps) => {

  return (
    ( isActive
      ?
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default',
        }}
      >
        {page}
      </Button>
      :
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        bg="gray.700"
        _hover={{
          bg: 'gray.500',
        }}
        onClick={() => onClick(Number(page))}
      >
        {page}
      </Button>
    )
  );
};
