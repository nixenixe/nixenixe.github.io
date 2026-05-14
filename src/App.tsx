import { Box, HStack } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function Projects() {
  return <h1>Projects</h1>;
}

function App() {
  return (
    <>
      <Box as="nav" w="100%" bg="green.500" p={4}>
        <HStack gap="6">
          <Link to="/">
            <img src="../public/nixe_favicon.svg" alt="Home" width={50} />
          </Link>
          <Link to="/projects">Projects</Link>
        </HStack>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
