import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FormControl,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoCard from "./components/card/InfoCard";
import ChartCard from "./components/CardChart/ChartCard";
import Table from "./components/Table/Table";
import { sortData } from "./utils";
import Map from "./components/map/Map";

function App() {
  const [country, setCounty] = useState("worldwide");
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [coronaInfo,setCoronaInfo]=useState('')
  const [tableData,setTableData]=useState([])
  const[mapCenter,setMapCenter]=useState([51.505, -0.09])
  const [mapZoom,setMapZoom]=useState(3)

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso3,
        }));
        const sortedData=sortData(data)
        setTableData(sortedData)
        setCountriesInfo(countries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  useEffect(()=>{
  
    fetch("https://disease.sh/v3/covid-19/all")
    .then((res) => res.json())
    .then(data=>{
      //console.log(data)

      setCoronaInfo(data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  const dropDownCountyHandler =  (e) => {
    const countryCode = e.target.value;
    setCounty(countryCode);

    // console.log(countryCode)
   
    const url= countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    // console.log(url)
    fetch(url)
    .then((res) => res.json())
    .then(data=>{
      //  console.log(data)
      setMapCenter([data.countryInfo.lat,data.countryInfo.long])
      setMapZoom(4)
      setCoronaInfo(data)
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // console.log(coronaInfo)
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <div className="head__text">
        <Typography variant="h6">Covid-19 Tracker</Typography>
        </div>
        <div className="header__dropDown">
        <FormControl className="app__dropDown">
          <NativeSelect
            value={country}
            variant="filled"
            onChange={dropDownCountyHandler}
          >
            <option value="worldwide">World Wide</option>
            {countriesInfo &&
              countriesInfo.map((val) => {
                
                return (
                  <option key={val.name} value={val.value}>
                    {val.name}
                  </option>
                );
              })}
          </NativeSelect>
        </FormControl>
        </div>
        

        
      </div>
      <div className="app__card">
        <InfoCard color='red' title="Corona Virus Cases" cases={coronaInfo.todayCases} total={coronaInfo.cases} />
        <InfoCard color='green' title="Recovered" cases={coronaInfo.todayRecovered} total={coronaInfo.recovered} />
        <InfoCard color='red' title="Deaths" cases={coronaInfo.todayDeaths} total={coronaInfo.deaths} />
      </div>
      <div className="app__map">
        <Map 
        position={mapCenter}
        zoom={mapZoom}
        />
      </div>
      </div>

      <div className="app__right">
      <Typography style={{backgroundColor:"white"}} className='text-center py-3' variant='h6'>
          Live Cases By Country
        </Typography>
            <Table data={tableData}/> 

            
      </div>  
    </div>
  );
}

export default App;
