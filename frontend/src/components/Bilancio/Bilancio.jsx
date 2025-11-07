import React, { useEffect, useState } from "react";
import axios from "axios";
import BilancioTable from "./BilancioTable";

function Bilancio() {
  const [voci, setVoci] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/bilancio/voci/")
      .then((res) => setVoci(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <BilancioTable voci={voci} />;
}

export default Bilancio;
