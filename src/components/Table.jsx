import db from "../data/db";
import { useState } from "react";
import "./Table.css";
import { useRef } from "react";
import { useEffect } from "react";

export function Table() {
  const [database, setDatabase] = useState(db);
  const [selectValue, setSelectValue] = useState("");
  const [newContancts, setNewContacts] = useState([]);

  useEffect(() => {
    setDatabase([...db, ...newContancts]);
  }, [newContancts]);

  const handlerInput = (event) => {
    const value = event.target.value.toLowerCase();
    setDatabase(
      db.filter((data) => {
        return selectValue === "first_name"
          ? data.first_name.toLowerCase().includes(value)
          : selectValue === "last_name"
          ? data.last_name.toLowerCase().includes(value)
          : data.first_name.toLowerCase().includes(value) ||
            data.last_name.toLowerCase().includes(value);
      })
    );
  };

  const handleSelectValue = (event) => {
    setSelectValue(event.target.value);
  };

  const handleNewContact = (news) => {
    setNewContacts([news, ...newContancts]);
  };

  return (
    <>
      <div className="table-container">
        <div className="info-container">
          <div className="search-container">
          <label htmlFor="inputSearch">SEARCH</label>
          <input id="inputSearch" type="text" className="table-input" onChange={handlerInput} />
        <div className="select-container">
          <select name="search-select" id="search-select" onChange={handleSelectValue}>
            <option value="first_name">name</option>
            <option value="last_name">surname</option>
          </select>
        </div>
        </div>
        <div>
          <AddContact data={handleNewContact} />
        </div>
        </div>
        <table className="t-content">
          <thead className="t-head">
            <tr>
              <th>YOUR ADDRESS BOOK</th>
            </tr>
          </thead>
          <tbody className="t-body">
            {database.map((data, index) => {
              return <TableRow key={index} data={data} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function TableRow({ data }) {
  return (
    <>
      <tr className="t-row">
        <td className="t-info-column">
          <div className="t-column">
            <span>NAME</span> : {data.first_name}
          </div>
          <div className="t-column">
            <span>SURNAME</span> : {data.last_name}
          </div>
          <div className="t-column">
            <span>PHONE</span> : {data.phone}
          </div>
        </td>
        <td className="t-image-column">
          <img src={data.image} alt="" className="t-image" />
        </td>
      </tr>
    </>
  );
}

function AddContact(props) {
  const firstName = useRef("");
  const lastName = useRef("");
  const newPhone = useRef("");
  const newImg = useRef("");

  const handlerImg = (event) => {
    newImg.current = event.target.src;
  };

  const handlerAddNewContact = async () => {
    const newContact = {
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      phone: newPhone.current.value,
      image: newImg.current,
    };
    props.data(newContact);
  };

  return (
    <>
      <div className="addContact-container">
        <h4>ADD CONTACT</h4>
        <input id="first_name" type="text" ref={firstName} />
        <input id="last_name" type="text" ref={lastName} />
        <input id="age" type="text" ref={newPhone} />
        <div className="avatar-container">
          {db.map((user, i) => (
            <img key={i} src={user.image} alt="avatar-img" className="avatar-img" onClick={handlerImg}></img>
          ))}
        </div>
        <button className="addContanct-button" onClick={handlerAddNewContact}>
          ADD CONTANCT
        </button>
      </div>
    </>
  );
}
