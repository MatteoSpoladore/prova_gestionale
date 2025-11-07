import React, { useEffect, useState } from "react";

import SoloTable from "./Bilancio/SoloTable";
import axios from "axios";

function HomePage() {
  const [scritture, setScritture] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/scritture/")
      .then((res) => setScritture(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <SoloTable scritture={scritture} />;
}

export default HomePage;
