import React, { useState } from "react";
import "../css/receiptmodule.css";

const ReceiptDetails = ({ receipt, onClose, onApprove, onReject, rejectreasons }) => {
  const [rejectReason, setRejectReason] = useState("");

  if (!receipt) return null;

  const isPending = receipt.evaluation_status === "PENDING";

  return (
    <div className="receipt-details-overlay">
      <div className="receipt-details-container">
        <div className="receipt-title">
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        {/* Top Section: Receipt Info & Image */}
        <div className="receipt-header">
          <div className="receipt-info">
            <p className="staff-firstname">
              <strong>
                <span>{receipt.staff.firstname}</span>, {receipt.staff.lastname} - {receipt.receipt_type}
              </strong>
            </p>

            <div className="info-grid">
              <div>
                <p><strong>Submitted:</strong> {new Date(receipt.submissiontime).toLocaleString()}</p>
                <p><strong>Receipt Type:</strong> {receipt.receipt_type}</p>
                <p><strong>Receipt Date:</strong> {new Date(receipt.receipt_date).toLocaleString()}</p>
                <p><strong>Amount Claimed:</strong> {receipt.amount_claimed} EUR</p>
              </div>
              <div>
                <p><strong>Received:</strong> {new Date(receipt.evaluation_time).toLocaleString()}</p>
                <p>
                  <strong>Evaluation:</strong>
                  <span className={`evaluation-status ${receipt.evaluation_status.toLowerCase()}`}>
                    {receipt.evaluation_status}
                  </span>
                </p>
                <p><strong>Amount Approved:</strong> {receipt.amount_approved} EUR</p>
                <p><strong>Taxation Month:</strong> {receipt.taxationexport_id}</p>
              </div>
            </div>
          </div>

          {/* Receipt Image */}
          <div className="receipt-image-container">
            <img src={receipt.receiptfile?.image_url} alt="Receipt" className="receipt-image" />
          </div>
        </div>

        {/* Flags for Suspicious or Auto-Rejected */}
        {receipt.suspect && <p style={{ color: 'red' }}>Suspicious</p>}
        {receipt.auto_rejected && <p style={{ color: 'red' }}>Auto Rejected</p>}

        {/* Budget Summary Section */}
        <div className="budget-summary">
          <table>
            <thead>
              <tr>
                <th>Current Month</th>
                <th>Mobility Budget Used</th>
                <th>Lunch Budget Used</th>
                <th>Lunch Receipts Approved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-</td>
                <td>86,30 EUR</td>
                <td>34,50 EUR</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Actions Row (Buttons first, Dropdown after some gap) */}
        <div className="receipt-actions-row">
          {/* Buttons */}
          <button className="accept-btn" onClick={() => onApprove(receipt)} disabled={!isPending}>
            Accept
          </button>
          <button
            className="reject-btn"
            onClick={() => onReject(receipt, rejectReason)}
            disabled={!isPending || !rejectReason}
          >
            Reject
          </button>

          {/* Rejection Dropdown */}
          <select
            className="reject-dropdown"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            disabled={!isPending}
          >
            <option value="">Select Rejection Reason</option>
            {rejectreasons?.length > 0 ? (
              rejectreasons.map((reason) => (
                <option key={reason.id} value={reason.reject_title}>
                  {reason.reject_title}
                </option>
              ))
            ) : (
              <option disabled>No rejection reasons available</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetails;
