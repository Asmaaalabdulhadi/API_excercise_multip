import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const Doaa_API_URL = "https://islamicapi.com/api/v1/ruqyah/?type=instant&lang=en&program=a-long-ruqya&source=from-quran&random=true&api_key=W2SPdhx5Hn9AxBRpUC4dRV0T9sA0yUENALBlFZmqWjL76CVK";
const Weather_API = "http://api.airvisual.com/v2/nearest_city?key=3391f13b-f181-441c-9127-ae3438458152";


app.get("/", async (req, res) => {
  try {
    const result = await axios.get(Doaa_API_URL);
    console.log(result);

  const result2 = await axios.get(Weather_API);
      console.log("eesult2: ",result2.data.data.current.weather.tp);


    res.render("index.ejs", {
      doaa: result.data.data.arabic,
      doaaSource: result.data.data.sub_category,
      tempratureNow: result2.data.data.current.weather.tp,
    });
  } catch (error) {
    //console.log(error.response.data);
    console.log("There is a problem....");
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
