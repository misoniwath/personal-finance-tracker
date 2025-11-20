import React from "react";
import "./Card.css";
import { HiOutlineArrowCircleUp } from "react-icons/hi";

export function Income() {
  return (
    <div className="balance-card">
      <div className="amount-content">
        <div className="title-row">
          <h3>Total Income</h3>
          <HiOutlineArrowCircleUp className="income-icon" />
        </div>
        <p className="amount-green">$5000.67</p>
        <p>0 income transactions</p>
      </div>
    </div>
  );
}
