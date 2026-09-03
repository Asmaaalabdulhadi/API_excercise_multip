import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const Doaa_API_URL = "https://islamicapi.com/api/v1/ruqyah/?type=instant&lang=en&program=a-long-ruqya&source=from-quran&random=true&api_key=W2SPdhx5Hn9AxBRpUC4dRV0T9sA0yUENALBlFZmqWjL76CVK";
const Weather_API = "http://api.airvisual.com/v2/nearest_city?key=3391f13b-f181-441c-9127-ae3438458152";
const Hijri_Date ="https://api.aladhan.com/v1/hToG/01-07-1446?calendarMethod=UAQ";
const date = new Date();
// Outputs as DD/MM/YYYY (e.g., "02/09/2026")
const formattedDate = date.toLocaleDateString("en-GB"); 
const TimeNow = date.toTimeString();
console.log(TimeNow); 


app.get("/", async (req, res) => {
  try {
    const result = await axios.get(Doaa_API_URL);
    console.log(result);

  const result2 = await axios.get(Weather_API);
      console.log("eesult2: ",result2.data.data.current.weather.tp);

  const result3 = await axios.get(Hijri_Date);
      console.log("result3: ",result3.data.data.hijri.date);



    res.render("index.ejs", {
      doaa: result.data.data.arabic,
      doaaSource: result.data.data.sub_category,
      tempratureNow: result2.data.data.current.weather.tp,
      HijriDay: result3.data.data.hijri.day,
      HijriMonth: result3.data.data.hijri.month.ar,
      HijriYear: result3.data.data.hijri.year,
      Timern: TimeNow,


      date: formattedDate,
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
