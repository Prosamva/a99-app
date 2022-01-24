import axios from "axios";
import "./App.css";
import { FiMenu, FiSearch } from "react-icons/fi";
import PropertyList from "./PropertyList";
import { useEffect, useState } from "react";
import NewPropertyForm from "./NewPropertyForm";
import RequestCityForm from "./RequestCity";
import DisplayProperty from "./DisplayProperty";

// const serverUrl = "https://fswi-99acres-clone.herokuapp.com/";
const serverUrl = "http://localhost:3001/";

function App() {
  const [cities, setCities] = useState([]);
  const [properties, setProperties] = useState([]);
  const [navShow, setNavShow] = useState(false);
  const [pn, setPn] = useState(0);
  const [infp, setInfp] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState({});
  const [citySelect, setCitySelect] = useState("all");
  const [searchText, setSearchText] = useState("");

  const removePopup = () => {
    setPn(0);
  };

  const getCities = () => {
    axios
      .get(serverUrl + "cities")
      .then((res) => setCities(res.data))
      .catch((error) =>
        alert("Something went wrong while trying to fetch cities! " + error)
      );
    console.log('Reached cities!')
  };
  const getProperties = () => {
    axios
      .get(serverUrl + "properties")
      .then((res) => setProperties(res.data))
      .catch((error) =>
        alert("Something went wrong while trying to fetch properties! " + error)
      );
  };

  useEffect(getCities, []);
  useEffect(getProperties, []);

  const handleRequestCityForm = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let formObject = Object.fromEntries(formData.entries());
    axios
      .post(serverUrl + "cities", formObject)
      .then((res) => console.log(res.data))
      .catch((error) =>
        alert("Something went wrong while submitting your request! " + error)
      );
    removePopup();
    getCities();
    getProperties();
  };

  const handleNewPropertyForm = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    axios
      .post(serverUrl + "properties", formData)
      .then((res) => console.log(res.data))
      .catch((error) =>
        alert(
          "Something went wrong while submitting your property details! " +
            error
        )
      );
    removePopup();
    getCities();
    getProperties();
  };

  const handlePropertyClick = (data) => {
    setSelectedProperty(data);
    setPn(3);
  };

  return (
    <div className="App">
      <div id="popup">
        {(() => {
          switch (pn) {
            case 1:
              return (
                <NewPropertyForm
                  cities={cities}
                  handlePopup={removePopup}
                  handleFormSubmit={handleNewPropertyForm}
                />
              );
            case 2:
              return (
                <RequestCityForm
                  handlePopup={removePopup}
                  handleFormSubmit={handleRequestCityForm}
                />
              );
            case 3:
              return (
                <DisplayProperty
                  handlePopup={removePopup}
                  data={selectedProperty}
                  serverUrl={serverUrl}
                />
              );
            default:
              return "";
          }
        })()}
      </div>
      <div className="top-nav">
        <header>
          <div className="nav-brand item">
            <div>
              <h1>99acres</h1>
              <h6>India's No.1 Property Portal Clone</h6>
            </div>
            <div>
              <button
                className="nav-button"
                onClick={() => setNavShow(!navShow)}
              >
                <FiMenu size="32px" />
              </button>
            </div>
          </div>

          <div className={`more-options item ${navShow ? "show" : ""}`}>
            <div className="filter item">
              <div class="select-container">
                <select
                  onChange={({ target: option }) => {
                    setCitySelect(option.value.toString());
                  }}
                >
                  <option value="all">All India</option>
                  {cities.map((city) => (
                    <option value={city._id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="search-form">
                <input
                  name="searchInput"
                  id="SearchInput"
                  type="text"
                  className="search-field"
                  placeholder="Search Address / Property Type / Other Details"
                  onChange={({ target: { value } }) =>
                    setSearchText(value.toLowerCase())
                  }
                ></input>
                <FiSearch class="icon" color="black" size="24px" />
              </div>
            </div>
            <div className="post-links item">
              <button className="post-button" onClick={() => setPn(1)}>
                Post Property
                <span className="tag">FREE</span>
              </button>
              <button className="post-button" onClick={() => setPn(2)}>
                Request City
                <span className="tag">FREE</span>
              </button>
            </div>
          </div>
        </header>
      </div>
      <h4 id="infpt">{infp ? "Browse Properties" : "NONE FOUND"}</h4>
      <PropertyList
        properties={properties.filter((property) => {
          if (citySelect !== "all" && property.city !== citySelect)
            return false;
          const val =
            property.address +
            property.type +
            property.price +
            property.title +
            property.description +
            property.pinCode;
          return val.toLowerCase().includes(searchText);
        })}
        serverUrl={serverUrl}
        handlePropertyClick={handlePropertyClick}
        handleEmptyList={setInfp}
      />

      <footer>
        <div>
          <section>
            <h4>Our Partners</h4>
            <ul>
              <li>
                <a href="https://www.naukri.com/">Naukri.com - Jobs in India</a>
              </li>
              <li>
                <a href="https://www.naukrigulf.com/">
                  Naukrigulf.com - Jobs in middle east
                </a>
              </li>
              <li>
                <a href="https://www.jeevansathi.com/">
                  Jeevansathi.com - Matrimonials
                </a>
              </li>
              <li>
                <a href="http://www.brijj.com/">
                  Brijj.com - Professional Networking
                </a>
              </li>
              <li>
                <a href="https://www.shiksha.com/">
                  Shiksha.com - Education Career Info
                </a>
              </li>
              <li>
                <a href="https://www.policybazaar.com/">
                  Policybazaar.com - Insurance India
                </a>
              </li>
              <li>
                <a href="https://www.meritnation.com/">
                  Meritnation.com - Online Educational Assessment
                </a>
              </li>
              <li>
                <a href="https://www.paisabazaar.com/">PaisaBazaar.com</a>
              </li>
              <li>
                <a href="https://www.ambitionbox.com/">AmbitionBox.com</a>
              </li>
              <li>
                <a href="https://www.firstnaukri.com/">
                  FirstNaukri.com - A jobsite for campus hiring
                </a>
              </li>
              <li>
                <a href="https://www.jobhai.com/">
                  Jobhai.com – Find Jobs Near You
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div>
          <section>
            <h4>Contact Us</h4>
            <div>
              Toll Free - 1800 41 99099
              <br />
              <small>Monday - Saturday (9:00AM to 11:00PM IST)</small>
            </div>
            <h5>Email - feedback@99acres.com</h5>
          </section>
          <section>
            <h4>Connect with us</h4>
            <p>
              All rights reserved - Info Edge (India) Ltd.
              <br />A naukri.com group venture
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default App;
