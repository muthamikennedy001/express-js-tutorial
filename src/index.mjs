import express, { request, response } from "express";
import routes from "./routes/index.mjs";
import cookieParser, { signedCookies } from "cookie-parser";
import session from "express-session";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser("worldcup"));
app.use(
  session({
    secret: "messi is the goat",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(routes);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("messi", "goat", { maxAge: 9000, signed: true });
  res.status(201).send({ msg: "messi" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
