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
      <nav>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
