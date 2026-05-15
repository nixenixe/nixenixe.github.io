import { Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import { TodoPage } from "./scenes/todo/TodoPage";
import { Menu } from "./components/Menu";
import { Box } from "@chakra-ui/react";

function Projects() {
  return <h1>Projects</h1>;
}

function App() {
  return (
    <>
      <Menu />
      <Box padding={{base: "5", md: "8"}}>
        <Routes>
          <Route path={routes.home} element={<TodoPage />} />
          <Route path={routes.projects} element={<Projects />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
