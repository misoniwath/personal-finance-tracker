import React from "react";
import "./balanceCard.css";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

export function Balance() {
  return (
    <div className="balance-card">
          <div className="amount-content">
            <div className="title-row">
              <h3>Current Balnace</h3>
              <MdOutlineAccountBalanceWallet className="income-icon" />
            </div>
            <p className="amount-green">$2050.67</p>
            <p>0 income transactions</p>
          </div>
        </div>
  );
}