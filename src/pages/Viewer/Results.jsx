import { useState } from "react";
import Districts from "../../components/Map/Districts";
import Concelhos from "../../components/Map/Concelhos";

export default function Results() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleDistrictClick = (districtId) => {
    setSelectedDistrict(districtId);
  };

  return (
    <div>
      <h2>Mapa dos Distritos</h2>
      <Districts onDistrictClick={handleDistrictClick} />
      {selectedDistrict && (
        <>
          <h2>Mapa dos Concelhos</h2>
          <Concelhos districtId={selectedDistrict} />
        </>
      )}
    </div>
  );
}
