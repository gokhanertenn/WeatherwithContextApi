import React from "react";
import cities from "../../helpers/cities_of_turkey.json";
import { useSelect } from "../../contexts/SelectContext";

function Header() {
  const { setSelect } = useSelect();

  const handleChange = (event) => setSelect(event.target.value);

  return (
    <div className="Header">
      <label htmlFor="select">Cities:</label>

      <select id="select" onChange={handleChange}>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;