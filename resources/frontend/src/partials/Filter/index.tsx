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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import Meta from "@/types/Meta";

export interface FilterProps {
    isDrawerOpen: boolean;
    onCloseDrawer: () => void;
    metaData?: Meta;
}

interface DynamicMultipleSelectionProps {
    headline: string;
    resp?: Author[] | Source[];
    selectionProps: (props?: Record<string, any> | undefined) => {
        [x: string]: any;
        onChange: (eventOrValue: any) => void;
    };
}

function DynamicMultipleSelection(props: DynamicMultipleSelectionProps) {
    const {
        headline,
        resp: sources,
        selectionProps: sourcesCheckboxProps,
    } = props;

    return (
        <VStack my={"5"} align={"left"} title={headline}>
            <Text as="b">{headline}</Text>
            <Skeleton isLoaded={!!sources}>
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
            <Text as="b">Search a keyword</Text>
            <Input
                placeholder="Type here..."
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </VStack>
    );
}

interface DateSelectionProps {
    minDate?: string;
    maxDate?: string;

    selectedDates: Date[];
    setSelectedDates: Dispatch<SetStateAction<Date[]>>;
}

function DateSelection(props: DateSelectionProps) {
    const { selectedDates, setSelectedDates } = props;

    let { minDate, maxDate }: any = props;
    minDate = Date.parse(minDate);
    maxDate = Date.parse(maxDate);

    return (
        <VStack my={"5"} align={"left"} title="Search by a keyword">
            <Text as="b">Filter Publish Date</Text>
            <RangeDatepicker
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
                minDate={minDate}
                maxDate={maxDate}
                propsConfigs={{
                    dayOfMonthBtnProps: {
                        defaultBtnProps: {
                            _hover: {
                                background: "teal.500",
                                color: "white",
                            },
                        },
                        isInRangeBtnProps: {
                            background: "teal.200",
                            color: "white",
                        },
                        selectedBtnProps: {
                            background: "teal.500",
                            color: "white",
                        },
                        todayBtnProps: {
                            background: "teal.300",
                            color: "white",
                        },
                    },
                    inputProps: {
                        size: "sm",
                    },
                }}
            />
        </VStack>
    );
}

export default function Filter(props: FilterProps) {
    const { onClose } = useDisclosure();
    const { isDrawerOpen, onCloseDrawer, metaData } = props;
    const { authors, sources, publishedAt } = metaData || {};
    const [isOpen, setIsOpen] = useState<boolean>(isDrawerOpen);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedDates, setSelectedDates] = useState<Date[]>([
        new Date(),
        new Date(),
    ]);
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

                    <DateSelection
                        minDate={publishedAt?.min}
                        maxDate={publishedAt?.max}
                        selectedDates={selectedDates}
                        setSelectedDates={setSelectedDates}
                    />
                    <DynamicMultipleSelection
                        headline="Source / Category"
                        resp={sources as any}
                        selectionProps={sourcesCheckboxProps}
                    />

                    <DynamicMultipleSelection
                        headline="Author(s)"
                        resp={authors as any}
                        selectionProps={authorsCheckboxProps}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={closeDrawer}>
                        Cancel
                    </Button>
                    <Button
                        color="white"
                        background="teal.500"
                        _hover={{
                            background: "teal.800",
                        }}
                        onClick={() => {
                            console.log({
                                searchValue,
                                selectedDates,
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
