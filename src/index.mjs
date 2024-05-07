import express, { request, response } from "express";
import { query, validationResult } from "express-validator";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const mockUsers = [
  {
    id: 1,
    username: "messi",
    anonname: "m10",
  },
  {
    id: 2,
    username: "ronaldo",
    anonname: "CR7",
  },
  {
    id: 3,
    username: "neymar",
    anonname: "Ney",
  },
  {
    id: 4,
    username: "mbappe",
    anonname: "KM7",
  },
  {
    id: 5,
    username: "lewandowski",
    anonname: "Lewy",
  },
  {
    id: 6,
    username: "salah",
    anonname: "Mo",
  },
  {
    id: 7,
    username: "modric",
    anonname: "Luka",
  },
  {
    id: 8,
    username: "kane",
    anonname: "HK10",
  },
  {
    id: 9,
    username: "debruyne",
    anonname: "KDB",
  },
  {
    id: 10,
    username: "suarez",
    anonname: "El Pistolero",
  },
  {
    id: 11,
    username: "griezmann",
    anonname: "Grizi",
  },
  {
    id: 12,
    username: "vanDijk",
    anonname: "Big Virg",
  },
  {
    id: 13,
    username: "hazard",
    anonname: "Eden",
  },
  {
    id: 14,
    username: "aguero",
    anonname: "Kun",
  },
  {
    id: 15,
    username: "terStegen",
    anonname: "Stegen",
  },
  {
    id: 16,
    username: "alisson",
    anonname: "Ali",
  },
  {
    id: 17,
    username: "deJong",
    anonname: "Frenkie",
  },
  {
    id: 18,
    username: "casemiro",
    anonname: "Casemiro",
  },
  {
    id: 19,
    username: "ramos",
    anonname: "Sergio",
  },
  {
    id: 20,
    username: "robertson",
    anonname: "Robbo",
  },
];

const mockProducts = [
  {
    id: 1,
    category: "football boots",
    type: "cr7 football boots",
  },
  {
    id: 2,
    category: "shirts",
    type: "messi signed world cup boots",
  },
  {
    id: 3,
    category: "football boots",
    type: "Neymar signature edition boots",
  },
  {
    id: 4,
    category: "shirts",
    type: "Ronaldo Juventus jersey",
  },
  {
    id: 5,
    category: "football boots",
    type: "Mbappe speedster boots",
  },
  {
    id: 6,
    category: "shirts",
    type: "Lewandowski Bayern Munich jersey",
  },
  {
    id: 7,
    category: "football boots",
    type: "Salah precision striker boots",
  },
  {
    id: 8,
    category: "shirts",
    type: "Modric Real Madrid jersey",
  },
  {
    id: 9,
    category: "football boots",
    type: "Kane goal machine boots",
  },
  {
    id: 10,
    category: "shirts",
    type: "De Bruyne Manchester City jersey",
  },
  {
    id: 11,
    category: "football boots",
    type: "Suarez lethal finisher boots",
  },
  {
    id: 12,
    category: "shirts",
    type: "Griezmann Barcelona jersey",
  },
  {
    id: 13,
    category: "football boots",
    type: "Van Dijk defensive commander boots",
  },
  {
    id: 14,
    category: "shirts",
    type: "Hazard Real Madrid jersey",
  },
  {
    id: 15,
    category: "football boots",
    type: "Aguero goal-scoring predator boots",
  },
  {
    id: 16,
    category: "shirts",
    type: "Ter Stegen Barcelona jersey",
  },
  {
    id: 17,
    category: "football boots",
    type: "Alisson safe hands boots",
  },
  {
    id: 18,
    category: "shirts",
    type: "De Jong Barcelona jersey",
  },
  {
    id: 19,
    category: "football boots",
    type: "Casemiro midfield powerhouse boots",
  },
  {
    id: 20,
    category: "shirts",
    type: "Ramos Real Madrid jersey",
  },
];
const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

app.get("/", (req, res) => {
  res.status(201).send({ msg: "messi" });
});

app.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Should Not Be Empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("Should not be less than 3 and not more than 15"),
  (req, res) => {
    const result = validationResult(request);
    console.log(result);
    const {
      query: { filter, value },
    } = req;

    if (filter && value)
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    return res.send(mockUsers);
  }
);

app.get("/api/user/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.put("/api/user/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

app.patch("/api/user/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/user/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

app.get("/api/products", (req, res) => {
  res.send(mockProducts);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
