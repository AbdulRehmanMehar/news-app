import Author from "@/types/Author";
import Source from "@/types/Source";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    CheckboxGroup,
    Checkbox,
    VStack,
    Skeleton,
    Flex,
    Text,
    useCheckboxGroup,
    Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";

export interface FilterProps {
    isDrawerOpen: boolean;
    onCloseDrawer: () => void;
    authorFetchResp: SWRResponse<Author[], any, any>;
    sourceFetchResp: SWRResponse<Source[], any, any>;
}

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

interface DynamicMultipleSelectionProps {
    headline: string;
    resp: SWRResponse<Author[] | Source[], any, any>;
    selectionProps: (props?: Record<string, any> | undefined) => {
        [x: string]: any;
        onChange: (eventOrValue: any) => void;
    };
}

function DynamicMultipleSelection(props: DynamicMultipleSelectionProps) {
    const { headline, resp, selectionProps: sourcesCheckboxProps } = props;
    const { data: sources, error: sourceError } = resp;
    return (
        <VStack my={"5"} align={"left"} title={headline}>
            <Text as="b">{headline}</Text>
            <Skeleton isLoaded={!!sources || !!sourceError}>
                {sourceError ? (
                    <>
                        <Text size="xl">
                            {"Couldn't"} load {headline}.
                        </Text>
                        <Text size="md">Please try again later.</Text>
                    </>
                ) : null}
                {(sources || []).length ? (
                    <Box position="relative">
                        <CheckboxGroup colorScheme="green">
                            {sources?.map(({ name, id }) => (
                                <Checkbox
                                    key={id}
                                    m="1"
                                    {...sourcesCheckboxProps({
                                        value: `${id}`,
                                    })}
                                >
                                    {name.length > 20
                                        ? name.slice(0, 20)
                                        : name}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </Box>
                ) : null}
            </Skeleton>
        </VStack>
    );
}

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchInput(props: SearchInputProps) {
    const { value, onChange } = props;
    return (
        <VStack my={"5"} align={"left"} title="Search by a keyword">
            <Text as="b">Search by a keyword</Text>
            <Input
                placeholder="Type here..."
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </VStack>
    );
}

export default function Filter(props: FilterProps) {
    const { onClose } = useDisclosure();
    const { isDrawerOpen, onCloseDrawer, authorFetchResp, sourceFetchResp } =
        props;
    const [isOpen, setIsOpen] = useState<boolean>(isDrawerOpen);
    const [searchValue, setSearchValue] = useState<string>("");
    const {
        value: sourcesCheckboxValue,
        getCheckboxProps: sourcesCheckboxProps,
    } = useCheckboxGroup();

    const {
        value: authorsCheckboxValue,
        getCheckboxProps: authorsCheckboxProps,
    } = useCheckboxGroup();

    const closeDrawer = () => {
        onClose();
        setIsOpen(false);
        onCloseDrawer();
    };

    useEffect(() => {
        setIsOpen(isDrawerOpen);
    }, [isDrawerOpen]);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={closeDrawer}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Filter the feed</DrawerHeader>

                <DrawerBody>
                    <SearchInput
                        value={searchValue}
                        onChange={(value) => setSearchValue(value)}
                    />
                    <DynamicMultipleSelection
                        headline="Source / Category"
                        resp={sourceFetchResp}
                        selectionProps={sourcesCheckboxProps}
                    />

                    <DynamicMultipleSelection
                        headline="Author(s)"
                        resp={authorFetchResp}
                        selectionProps={authorsCheckboxProps}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={closeDrawer}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={() => {
                            console.log({
                                authorsCheckboxValue,
                                sourcesCheckboxValue,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
