import Nav from "./components/Nav";
import PeopleList from "./components/PeopleList";
import PeopleForm from "./components/PeopleForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useState } from "react";

function App() {
  const [people, setPeople] = useState([]);
  const emberekListazasa = () => {
    fetch("http://localhost:8000/api/people", {
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
    <>
      <Nav navItems={[{ href: "#felvetel", displayText: "Ember felvétele" }]} />
      <main className="container">
        <PeopleList onMount={emberekListazasa} people={people} />
        <PeopleForm onSuccess={emberekListazasa} />
      </main>
    </>
  );
}

export default App;
