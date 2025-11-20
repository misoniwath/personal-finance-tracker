import React from "react";
import "./Card.css";
import { HiOutlineArrowCircleDown } from "react-icons/hi";
import { HiOutlineArrowCircleUp } from "react-icons/hi";

export function Expense() {
  return (
    <div className="balance-card">
          <div className="amount-content">
            <div className="title-row">
              <h3>Total Expense</h3>
              <HiOutlineArrowCircleUp className="income-icon" />
            </div>
            <p className="amount-green">$2050.67</p>
            <p>0 income transactions</p>
          </div>
        </div>
  );
}

