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
    Link,
    useCheckboxGroup,
    Box,
} from "@chakra-ui/react";
import {
    Dispatch,
    Fragment,
    LegacyRef,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import useSWR, { SWRResponse } from "swr";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import Meta from "@/types/Meta";

interface FilterOptions {
    sources?: (string | number)[] | undefined;
    authors?: (string | number)[] | undefined;
    minDate?: Date;
    maxDate?: Date;
    search?: string;
}
export interface FilterProps {
    isDrawerOpen: boolean;
    onCloseDrawer: () => void;
    metaData?: Meta;
    applyFilters?: (filters: FilterOptions) => void;
    defaultSelected?: FilterOptions;
    onClearFilters?: () => void;
    isFiltersApplied: boolean;
}

interface DynamicMultipleSelectionProps {
    headline: string;
    resp?: Author[] | Source[];
    selectionProps: (props?: Record<string, any> | undefined) => {
        [x: string]: any;
        onChange: (eventOrValue: any) => void;
    };
    defaultSelected: any[];
}

function DynamicMultipleSelection(props: DynamicMultipleSelectionProps) {
    const {
        headline,
        resp: sources,
        selectionProps: sourcesCheckboxProps,
        defaultSelected,
    } = props;

    console.log({ defaultSelected });

    return (
        <VStack my={"5"} align={"left"} title={headline}>
            <Text as="b">{headline}</Text>
            <Skeleton isLoaded={!!sources}>
                {(sources || []).length ? (
                    <Box position="relative">
                        <Fragment key={defaultSelected.join("") || "default"}>
                            <CheckboxGroup
                                colorScheme="green"
                                defaultValue={defaultSelected}
                            >
                                {sources?.map(({ name, id }) => (
                                    <Checkbox
                                        isChecked={
                                            defaultSelected.indexOf(`${id}`) !==
                                            -1
                                        }
                                        key={`${name}-${id}`}
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
                        </Fragment>
                    </Box>
                ) : null}
            </Skeleton>
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
    const {
        isDrawerOpen,
        onCloseDrawer,
        metaData,
        applyFilters,
        onClearFilters,
        defaultSelected,
        isFiltersApplied,
    } = props;
    const { authors, sources, publishedAt } = metaData || {};
    const [isOpen, setIsOpen] = useState<boolean>(isDrawerOpen);
    const [selectedDates, setSelectedDates] = useState<any[]>([null, null]);
    const [defaultCheckboxSelection, setDefaultCheckboxSelection] =
        useState<any>();
    const {
        value: sourcesCheckboxValue,
        getCheckboxProps: sourcesCheckboxProps,
    } = useCheckboxGroup();
    const searchInputRef: LegacyRef<HTMLInputElement> =
        useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        defaultSelected?.minDate &&
            defaultSelected?.maxDate &&
            setSelectedDates([
                Date.parse(defaultSelected.minDate as any),
                Date.parse(defaultSelected.maxDate as any),
            ]);
        setDefaultCheckboxSelection({
            authors: defaultSelected?.authors
                ? JSON.parse(
                      decodeURIComponent(defaultSelected?.authors as any)
                  )
                : [],
            sources: defaultSelected?.sources
                ? JSON.parse(
                      decodeURIComponent(defaultSelected?.sources as any)
                  )
                : [],
        });
    }, [defaultSelected]);
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={closeDrawer}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Text>Filter the feed</Text>
                </DrawerHeader>

                <DrawerBody>
                    <VStack my={"5"} align={"left"} title="Search by a keyword">
                        <Text as="b">Search a keyword</Text>
                        <Input
                            defaultValue={defaultSelected?.search}
                            ref={searchInputRef}
                            placeholder="Type here..."
                        />
                    </VStack>

                    <DateSelection
                        minDate={publishedAt?.min}
                        maxDate={publishedAt?.max}
                        selectedDates={selectedDates}
                        setSelectedDates={setSelectedDates}
                    />
                    <DynamicMultipleSelection
                        defaultSelected={
                            (defaultCheckboxSelection || {})["sources"] || []
                        }
                        headline="Source / Category"
                        resp={sources as any}
                        selectionProps={sourcesCheckboxProps}
                    />

                    <DynamicMultipleSelection
                        defaultSelected={
                            (defaultCheckboxSelection || {})["authors"] || []
                        }
                        headline="Author(s)"
                        resp={authors as any}
                        selectionProps={authorsCheckboxProps}
                    />
                </DrawerBody>

                <DrawerFooter>
                    {isFiltersApplied ? (
                        <Text size={"sm"} mr="3">
                            <Link
                                color="teal.500"
                                onClick={() => {
                                    onClearFilters && onClearFilters();
                                    closeDrawer();
                                }}
                            >
                                Clear Filters
                            </Link>
                        </Text>
                    ) : null}
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
                            const [minDate, maxDate] = selectedDates;

                            let obj: any = {
                                search: searchInputRef.current
                                    ? searchInputRef.current.value
                                    : null,
                                authors: authorsCheckboxValue.length
                                    ? encodeURIComponent(
                                          JSON.stringify(authorsCheckboxValue)
                                      )
                                    : null,
                                sources: sourcesCheckboxValue.length
                                    ? encodeURIComponent(
                                          JSON.stringify(sourcesCheckboxValue)
                                      )
                                    : null,
                            };

                            if (minDate && maxDate) {
                                obj = {
                                    ...obj,
                                    minDate: new Date(minDate).toISOString(),
                                    maxDate: new Date(maxDate).toISOString(),
                                };
                            }

                            const filters = Object.fromEntries(
                                Object.entries(obj).filter(
                                    ([_, v]) => v != null && v != ""
                                )
                            );
                            applyFilters && applyFilters(filters);
                            closeDrawer();
                        }}
                    >
                        {"Apply Filter(s)"}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
