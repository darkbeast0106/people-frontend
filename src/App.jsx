import Nav from "./components/Nav";
import PeopleList from "./components/PeopleList";
import PeopleForm from "./components/PeopleForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";

function App() {
  const [people, setPeople] = useState([]);
  const [modositandoId, setModositandoId] = useState(0);

  const emberekListazasa = () => {
    fetch(`${process.env.REACT_APP_API_LINK}`, {
      headers: {
        Accept: "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();
      if (response.status === 200) {
        setPeople(data);
      } else if (response.status === "404") {
        // TODO: 404 hiba
      } else {
        // TODO: egyéb hiba kezelése
        console.log(data.message);
      }
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PeopleList onMount={emberekListazasa} people={people} modositClick={(id) => setModositandoId(id)}/>} />
          <Route path="create" element={<PeopleForm onSuccess={emberekListazasa} modositandoId={modositandoId} resetModositando={() => setModositandoId(0)} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  /*
  return (
    <>
      <Nav navItems={navList} />
      <main className="container">
        <PeopleList onMount={emberekListazasa} people={people} modositClick={(id) => setModositandoId(id)}/>
        <PeopleForm onSuccess={emberekListazasa} modositandoId={modositandoId} resetModositando={() => setModositandoId(0)} />
      </main>
    </>
  );
  */
}

export default App;
