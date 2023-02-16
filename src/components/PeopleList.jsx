import { useEffect } from "react";
import PersonCard from "./PersonCard";

function PeopleList(props) {
  const { people, onMount } = props;
  useEffect(() => {
    onMount();
  }, []);
  const cardList = [];
  people.forEach((person) => {
    cardList.push(<PersonCard key={person.id} person={person} />);
  });
  return (
    <section>
      <h2>Emberek listája</h2>
      <div className="row gy-4">{cardList}</div>
    </section>
  );
}

export default PeopleList;
