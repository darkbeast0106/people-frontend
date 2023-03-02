import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

function PeopleForm(props) {
  const { onSuccess, modositandoId = 0, resetModositando } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (modositandoId === 0) {
      formReset();
    } else {
      fetch(`${process.env.REACT_APP_API_LINK}/${modositandoId}`, {
        headers: {
          Accept: "application/json",
        },
      }).then(async (response) => {
        const data = await response.json();
        if (response.status !== 200) {
          alert(data.message);
        } else {
          setName(data.name);
          setEmail(data.email);
          setAddress(data.address);
          setPhone_number(data.phone_number);
          setBirth_date(data.birth_date);
        }
      });
    }
  }, [modositandoId]);

  const emberFelvetele = () => {
    const person = {
      name: name,
      email: email,
      address: address,
      phone_number: phone_number,
      birth_date: birth_date,
    };
    fetch(`${process.env.REACT_APP_API_LINK}`, {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.status === 201) {
        onSuccess();
        formReset();
      } else if (response.status === "404") {
        setErrorMessage("Az oldal nem található");
      } else {
        const jsonData = await response.json();
        const errorMessage = jsonData.message;
        setErrorMessage(errorMessage);
      }
    });
  };

  const emberModositasa = () => {
    const person = {
      name: name,
      email: email,
      address: address,
      phone_number: phone_number,
      birth_date: birth_date,
    };
    fetch(`${process.env.REACT_APP_API_LINK}/${modositandoId}`, {
      method: "PUT",
      body: JSON.stringify(person),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.status === 200) {
        onSuccess();
        resetModositando();
        navigate("/");
      } else if (response.status === "404") {
        setErrorMessage("Az oldal nem található");
      } else {
        const jsonData = await response.json();
        const errorMessage = jsonData.message;
        setErrorMessage(errorMessage);
      }
    });
  };

  const formReset = () => {
    setName("");
    setEmail("");
    setAddress("");
    setPhone_number("");
    setBirth_date("");
    setErrorMessage("");
  };

  return (
    <section id="felvetel" className="mt-3">
      {modositandoId === 0 ? (
        <h2>Új ember felvétele</h2>
      ) : (
        <h2>{name} módosítása</h2>
      )}
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
          if (modositandoId === 0) {
            emberFelvetele();
          } else {
            emberModositasa();
          }
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
        {modositandoId === 0 ? (
          <button className="btn btn-success" type="submit">
            Felvétel
          </button>
        ) : (
          <button className="btn btn-warning" type="submit">
            Módosítás
          </button>
        )}
        <button
          className="btn btn-danger"
          type="reset"
          onClick={() => {
            formReset();
            resetModositando();
          }}
        >
          Űrlap alaphelyzetbe
        </button>
      </form>
    </section>
  );
}

export default PeopleForm;
