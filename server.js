import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const api_url = "https://secrets-api.appbrewery.com/"; 

const userName = "elasticvertigo";
const password = "elasticvertigo";
const apiKey = "0fe9a094-0f9f-4684-9a96-e1e31d2fae68";
const token = "1cdd02f0-53ec-4f01-9279-68d6dc31f65b";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/noauth", async (req, res) => {
  try {
    const randomSecret = await axios.get(api_url + "random");
    const result = JSON.stringify(randomSecret.data);
    res.render("index.ejs", { result: result});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicauth", async (req, res) => {
  try {
    const response = await axios.get(api_url + "all?page=1",
      {
        auth: {
          username: userName,
          password: password
        }
      }
    );    
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { result: result});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiauth", async (req, res) => {
  try {
    const response = await axios.get(api_url + `filter?score=5&apiKey=${apiKey}`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { result: result});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${token}`}
};

app.get("/tokenauth", async (req, res) => {
  try {
    const response = await axios.get(api_url + "user-secrets", config);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { result: result});
  } catch (error) {
    res.status(404).send(error.message);
    // console.log(error.message);
  } 
});

app.get("/", (req, res) => {
  res.render("index.ejs", { result: "API Response." });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});