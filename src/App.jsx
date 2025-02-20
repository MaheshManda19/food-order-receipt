import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchReceipts } from "./services/server/foodorderreceipts";
import { fetchRejections } from "./services/server/rejections";
import TableModule from "./components/modules/TableModule";
import Login from "./components/modules/Loginmodule";
import "./App.css";

function App() {
  const [receiptData, setReceiptData] = useState(null);
  const [rejectiondata, setRejectiondata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReceipts = async () => {
      try {
        const data = await fetchReceipts();
        const rejectiondatas = await fetchRejections();
        setReceiptData(data);
        setRejectiondata(rejectiondatas);
      } catch (err) {
        setError(err.message);
      }
    };

    getReceipts();
  }, []);

  console.log('receiptData', receiptData);
  console.log('rejectiondata', rejectiondata);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/receipttable" element={<TableModule receiptData={receiptData} rejectiondata={rejectiondata} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
