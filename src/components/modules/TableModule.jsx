import React, { useEffect, useState } from "react";
import ReceiptDetails from "./ReceiptsModule";
import "../css/tablemodule.css";


const TableModule = ({ receiptData = [], rejectiondata = [] }) => {
  const [receipts, setReceipts] = useState(receiptData);
  const [rejectionData, setRejectiondata] = useState(rejectiondata);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setReceipts(receiptData);
    setRejectiondata(rejectiondata);
  }, [receiptData]);

  console.log('rej',rejectiondata);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedReceipts = [...receipts].sort((a, b) => {
      const valueA = key === "name" ? `${a.staff.firstname} ${a.staff.lastname}` : a[key];
      const valueB = key === "name" ? `${b.staff.firstname} ${b.staff.lastname}` : b[key];

      if (typeof valueA === "string") {
        return direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return direction === "asc" ? valueA - valueB : valueB - valueA;
    });

    setReceipts(sortedReceipts);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ▲" : " ▼";
    }
    return " ⬍";
  };

  // **Search Functionality**
  const filteredReceipts = receipts?.filter((receipt) => {
    const fullName = `${receipt.staff.firstname} ${receipt.staff.lastname}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      receipt.receipt_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.evaluation_status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(receipt.amount_claimed).includes(searchQuery) ||
      String(receipt.amount_approved).includes(searchQuery)
    );
  });

  return (
    <div className="receipt-table-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <table className="receipt-table">
        <thead>
          <tr>
            <th onClick={() => sortData("submissiontime")}>
              Submission Time {getSortIcon("submissiontime")}
            </th>
            <th onClick={() => sortData("name")}>Name {getSortIcon("name")}</th>
            <th onClick={() => sortData("receipt_type")}>Receipt Type {getSortIcon("receipt_type")}</th>
            <th onClick={() => sortData("receipt_date")}>Receipt Date {getSortIcon("receipt_date")}</th>
            <th onClick={() => sortData("amount_claimed")}>Claimed {getSortIcon("amount_claimed")}</th>
            <th onClick={() => sortData("amount_approved")}>Amount Approved {getSortIcon("amount_approved")}</th>
            <th onClick={() => sortData("evaluation_status")}>Evaluation Status {getSortIcon("evaluation_status")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredReceipts?.length > 0 ? (
            filteredReceipts?.map((receipt) => (
              <tr key={receipt.id} onClick={() => setSelectedReceipt(receipt)} className="clickable-row">
                <td>{new Date(receipt.submissiontime).toLocaleString()}</td>
                <td>{`${receipt.staff.firstname} ${receipt.staff.lastname}`}</td>
                <td>{receipt.receipt_type}</td>
                <td>{new Date(receipt.receipt_date).toLocaleDateString()}</td>
                <td>{receipt.amount_claimed}</td>
                <td>{receipt.amount_approved || "-"}</td>
                <td>{receipt.evaluation_status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No receipts found</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedReceipt && (
        <ReceiptDetails
          receipt={selectedReceipt}
          rejectreasons={rejectionData}
          onClose={() => setSelectedReceipt(null)}
          onApprove={(receipt) => {
            console.log("Approved:", receipt);
            setSelectedReceipt(null); 
          }}
          onReject={(receipt) => {
            console.log("Rejected:", receipt);
            setSelectedReceipt(null); 
          }}
        />
      )}
    </div>
  );
};

export default TableModule;
