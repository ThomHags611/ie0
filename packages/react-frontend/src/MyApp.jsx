// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form"; 

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    const promise = fetch(`http://localhost:8000/users/${characters[index].id}`, {
      method: "DELETE",
    }).then(response => {
      if(response.status === 204) {
        console.log("USCCESS");
        return null;
      }else if(response.status === 404){
        console.log("unable to find id for DELETE");
        return null;
      }
      
    });
    
    setCharacters(updated);
  }

  function updateList(person) {
    postUser(person)
      .then((new_person) => {
        if (new_person){
          setCharacters([...characters, new_person]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person){
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    }).then(response => {
      if(response.status === 201) {
        return response.json();
      }else{
        return null;
      }
      
    });
    
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit = {updateList} />
    </div>
  );
}

export default MyApp;