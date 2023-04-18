import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Heading,
    Text,
    Container,
    Link,
    Image,
    Tooltip,
    Badge,
    Flex,
    Center,
    Icon,
    Square,
    HStack,
    Tag,
    TagLabel,
    TagLeftIcon,
} from "@chakra-ui/react";
import { ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
import Article from "@/types/Article";
import { AiOutlineUser } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineSource } from "react-icons/md";

export default function NewsArticle(props: Article) {
    const {
        externalLink,
        title,
        description,
        publishedAt,
        imageURL,
        authors,
        sources,
    } = props;

    return (
        <Container maxW="full">
            <Card
                direction={{ base: "column", md: "row", sm: "row" }}
                overflow="hidden"
                variant="outline"
                marginY="5"
                position="relative"
            >
                <Tooltip
                    hasArrow
                    label="Publish date"
                    bg="gray.300"
                    color="black"
                >
                    <Tag size={"sm"} position="absolute" top={0} right={0}>
                        <TagLeftIcon boxSize="12px" as={BsCalendarDate} />
                        <TagLabel>{publishedAt}</TagLabel>
                    </Tag>
                </Tooltip>

                <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "250px" }}
                    src={imageURL}
                    alt={title}
                />

                <Stack>
                    <CardBody py="6">
                        <Heading size="md">{title}</Heading>

                        {authors.length ? (
                            <Container px="0" mx="0" my="2" textAlign={"left"}>
                                {authors.map(({ name }) =>
                                    name.trim() ? (
                                        <Square
                                            display={"inline-block"}
                                            marginX={1}
                                            key={name}
                                        >
                                            <Tooltip
                                                hasArrow
                                                label="Author"
                                                bg="gray.300"
                                                color="black"
                                            >
                                                <Badge>
                                                    <Icon as={AiOutlineUser} />{" "}
                                                    {name}
                                                </Badge>
                                            </Tooltip>
                                        </Square>
                                    ) : null
                                )}
                            </Container>
                        ) : null}

                        <Text py="2">{description}</Text>
                    </CardBody>

                    <CardFooter>
                        <Tooltip
                            hasArrow
                            label="Source website"
                            bg="gray.300"
                            color="black"
                        >
                            <Link
                                color="teal.500"
                                href={externalLink}
                                isExternal
                            >
                                <ExternalLinkIcon mx="2px" /> Read More
                            </Link>
                        </Tooltip>
                    </CardFooter>
                </Stack>

                {sources.length ? (
                    <HStack
                        position="absolute"
                        right="0"
                        bottom="0"
                        spacing="2"
                    >
                        {sources.map(({ name }) => (
                            <Center key={name}>
                                <Tooltip
                                    hasArrow
                                    label="Source / Category"
                                    bg="gray.300"
                                    color="black"
                                >
                                    <Tag size={"sm"}>
                                        <TagLeftIcon
                                            boxSize="12px"
                                            as={MdOutlineSource}
                                        />
                                        <TagLabel>{name}</TagLabel>
                                    </Tag>
                                </Tooltip>
                            </Center>
                        ))}
                    </HStack>
                ) : null}
            </Card>
        </Container>
    );
}
