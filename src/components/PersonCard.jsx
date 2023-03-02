function PersonCard(props) {
  const { person, afterDelete, modositClick } = props;
  const { id, name, email, address, phone_number, birth_date } = person;
  const emberTorlese = () => {
    fetch(`${process.env.REACT_APP_API_LINK}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    }).then(async (response) => {
      if (response.status !== 204) {
        const data = await response.json();
        alert(data.message);
      }
      afterDelete();
    });
  };
  // TODO: módosítás és törlés megvalósítása
  return (
    <div className="col-md-6">
      <div className="card h-100">
        <div className="card-header">
          <h4 className="card-title">{name}</h4>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>E-mail</th>
                <td>{email}</td>
              </tr>
              <tr>
                <th>Lakcím</th>
                <td>{address}</td>
              </tr>
              <tr>
                <th>Tel:</th>
                <td>{phone_number}</td>
              </tr>
              <tr>
                <th>Szül.dátum</th>
                <td>{birth_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer">
            <div className="row row-cols-2">
                <a href="#felvetel" className="btn btn-warning col" onClick={() => {modositClick(id)}}>Módosítás</a>
                <button className="btn btn-danger col" onClick={() => {emberTorlese();}}>Törlés</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
