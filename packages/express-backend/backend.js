// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };
  
app.get("/", (req, res) => {
    res.send("Hello World!");
});

  
const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};
//This functionality is covered below
/*  
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });
*/
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });

const deleteUser = (id) => {
    const index = users["users_list"].findIndex((user) => user.id === id);
    return users["users_list"].splice(index, 1)[0]; // returns the deleted user
};
  
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
        result = deleteUser(id)
        res.send(result)
    }
  });
  
  const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter((user) => {
        return user["name"] === name && user["job"] === job;
    });
};


  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined) {
        let result = findUserByName(name)
        if(job != undefined){
            result = findUserByNameAndJob(name, job);
        }
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });