import { Flex, Square, Tooltip } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onChange: (currentPage: number) => void;
}

export default function Pagination(props: PaginationProps) {
    let { currentPage } = props;
    const { totalPages, onChange } = props;

    if (currentPage <= 0) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    return (
        <Flex border="1px" borderColor="#e2e8f0" borderRadius="5px">
            <Tooltip hasArrow label="Previous" bg="gray.300" color="black">
                <Square
                    as="button"
                    p="2"
                    borderRight="1px"
                    borderColor="#e2e8f0"
                    onClick={() =>
                        currentPage - 1 > 0 && onChange(currentPage - 1)
                    }
                    cursor={currentPage - 1 <= 0 ? "not-allowed" : "pointer"}
                >
                    <ArrowLeftIcon />
                </Square>
            </Tooltip>

            {currentPage > 2
                ? [...Array.from(Array(2).keys())]
                      .map((val) => currentPage - (val + 1))
                      .sort()
                      .map((val) => (
                          <Tooltip
                              key={val}
                              hasArrow
                              label={`Page ${val}`}
                              bg="gray.300"
                              color="black"
                          >
                              <Square
                                  borderRight="1px"
                                  borderColor="#e2e8f0"
                                  as="button"
                                  p="2"
                                  minWidth={"10"}
                                  background={
                                      val === currentPage
                                          ? "teal.500"
                                          : "default"
                                  }
                                  color={
                                      val === currentPage ? "#fff" : "default"
                                  }
                                  onClick={() => onChange(val)}
                                  cursor={
                                      val > totalPages
                                          ? "not-allowed"
                                          : "pointer"
                                  }
                              >
                                  {val}
                              </Square>
                          </Tooltip>
                      ))
                : null}

            {[...Array.from(Array(currentPage > 2 ? 3 : 5).keys())]
                .map((val) => (currentPage > 2 ? val + currentPage : val + 1))
                .map((val) => (
                    <Tooltip
                        key={val}
                        hasArrow
                        label={`Page ${val}`}
                        bg="gray.300"
                        color="black"
                    >
                        <Square
                            borderRight="1px"
                            borderColor="#e2e8f0"
                            as="button"
                            p="2"
                            minWidth={"10"}
                            background={
                                val === currentPage ? "teal.500" : "default"
                            }
                            color={val === currentPage ? "#fff" : "default"}
                            onClick={() => val < totalPages && onChange(val)}
                            cursor={
                                val > totalPages ? "not-allowed" : "pointer"
                            }
                        >
                            {val}
                        </Square>
                    </Tooltip>
                ))}

            <Tooltip hasArrow label="Next" bg="gray.300" color="black">
                <Square
                    as="button"
                    p="2"
                    onClick={() =>
                        currentPage + 1 < totalPages &&
                        onChange(currentPage + 1)
                    }
                    cursor={
                        currentPage + 1 > totalPages ? "not-allowed" : "pointer"
                    }
                >
                    <ArrowRightIcon />
                </Square>
            </Tooltip>
        </Flex>
    );
}
