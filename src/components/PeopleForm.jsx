import { useState } from "react";
import FormInput from "./FormInput";

function PeopleForm(props) {
  const { onSuccess } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emberFelvetele = () => {
    const person = {
      name: name,
      email: email,
      address: address,
      phone_number: phone_number,
      birth_date: birth_date,
    };
    fetch("http://localhost:8000/api/people", {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.status === 201) {
        onSuccess();
        setName("");
        setEmail("");
        setAddress("");
        setPhone_number("");
        setBirth_date("");
        setErrorMessage("");
      } else if (response.status === "404") {
        setErrorMessage("Az oldal nem található");
      } else {
        const jsonData = await response.json();
        const errorMessage = jsonData.message;
        setErrorMessage(errorMessage);
      }
    });
  };

  return (
    <section id="felvetel">
      <h2>Új ember felvétele</h2>
      {errorMessage !== "" ? (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {errorMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          emberFelvetele();
        }}
      >
        <FormInput
          inputId={"nameInput"}
          inputLabel={"Név"}
          value={name}
          setValue={setName}
        />
        <FormInput
          inputId={"emailInput"}
          inputLabel={"E-mail"}
          inputType={"email"}
          value={email}
          setValue={setEmail}
        />
        <FormInput
          inputId={"addressInput"}
          inputLabel={"Lakcím"}
          value={address}
          setValue={setAddress}
        />
        <FormInput
          inputId={"phone_numberInput"}
          inputLabel={"Telefonszám"}
          inputType={"tel"}
          value={phone_number}
          setValue={setPhone_number}
        />
        <FormInput
          inputId={"birth_dateInput"}
          inputLabel={"Születési dátum"}
          inputType={"date"}
          value={birth_date}
          setValue={setBirth_date}
        />
        <button className="btn btn-success" type="submit">
          Elküld
        </button>
      </form>
    </section>
  );
}

export default PeopleForm;
