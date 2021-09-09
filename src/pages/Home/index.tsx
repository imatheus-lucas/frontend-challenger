import { Box, Flex, Container,Spinner } from "@chakra-ui/react";
import Header from "../../components/Header";
import Search from "../../components/Search";
import ListUsers from "../../components/ListUsers";
import { useDataContext } from "../../contexts/DataContext";

const Home = () => {
  const { loading } = useDataContext();
  return (
    <Container maxW="container.lg">
      <Header />
      <Container maxW="container.md">
        <Flex align="center" justify="center">
          <Search />
        </Flex>
        <Box maxHeight="calc(100vh - 12rem)" overflowY="scroll">
          {loading ? (
            <Flex align="center" justify="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <ListUsers />
          )}
        </Box>
      </Container>
    </Container>
  );
};

export default Home;
