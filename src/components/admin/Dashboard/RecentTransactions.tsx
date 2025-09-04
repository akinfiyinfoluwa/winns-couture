"use client"

import React, { useState } from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";
import AllTransactionsModal from "./AllTransactionsModal";

export const RecentTransactions = () => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const transactionsData = [
    {
      orderId: "#48149",
      unitsBought: 2,
      date: "Aug 2nd",
      price: "₦9.75",
      order: 1,
      customerAddress: "123 Main St, City",
      customerEmail: "john.doe@example.com",
    },
    {
      orderId: "#1942s",
      unitsBought: 1,
      date: "Aug 2nd",
      price: "₦21.25",
      order: 2,
      customerAddress: "456 Oak Ave, Town",
      customerEmail: "jane.smith@example.com",
    },
    {
      orderId: "#4192",
      unitsBought: 5,
      date: "Aug 1st",
      price: "₦94.75",
      order: 3,
      customerAddress: "789 Pine Ln, Village",
      customerEmail: "peter.jones@example.com",
    },
    {
      orderId: "#99481",
      unitsBought: 3,
      date: "Aug 1st",
      price: "₦9.44",
      order: 4,
      customerAddress: "101 Elm Rd, Hamlet",
      customerEmail: "mary.williams@example.com",
    },
    {
      orderId: "#1304",
      unitsBought: 1,
      date: "Aug 1st",
      price: "₦9.23",
      order: 5,
      customerAddress: "202 Maple Dr, Borough",
      customerEmail: "david.brown@example.com",
    },
    {
      orderId: "#1304",
      unitsBought: 2,
      date: "Jul 31st",
      price: "₦22.02",
      order: 6,
      customerAddress: "303 Birch Ct, County",
      customerEmail: "susan.davis@example.com",
    },
    // Add more dummy data for scrolling
    {
      orderId: "#55555",
      unitsBought: 1,
      date: "Jul 30th",
      price: "₦15.00",
      order: 7,
      customerAddress: "10 Downing St, London",
      customerEmail: "test1@example.com",
    },
    {
      orderId: "#66666",
      unitsBought: 3,
      date: "Jul 29th",
      price: "₦45.00",
      order: 8,
      customerAddress: "221B Baker St, London",
      customerEmail: "test2@example.com",
    },
    {
      orderId: "#77777",
      unitsBought: 2,
      date: "Jul 28th",
      price: "₦30.00",
      order: 9,
      customerAddress: "1600 Pennsylvania Ave, DC",
      customerEmail: "test3@example.com",
    },
    {
      orderId: "#88888",
      unitsBought: 4,
      date: "Jul 27th",
      price: "₦60.00",
      order: 10,
      customerAddress: "Eiffel Tower, Paris",
      customerEmail: "test4@example.com",
    },
    {
      orderId: "#99999",
      unitsBought: 1,
      date: "Jul 26th",
      price: "₦10.00",
      order: 11,
      customerAddress: "Colosseum, Rome",
      customerEmail: "test5@example.com",
    },
    {
      orderId: "#10101",
      unitsBought: 2,
      date: "Jul 25th",
      price: "₦20.00",
      order: 12,
      customerAddress: "Pyramids of Giza, Egypt",
      customerEmail: "test6@example.com",
    },
  ];

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> Recent Transactions
        </h3>
        <button onClick={() => setShowAllTransactions(true)} className="text-sm text-violet-500 hover:underline">
          See all
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          {transactionsData.slice(0, 6).map((transaction) => (
            <TableRow
              key={transaction.order}
              orderId={transaction.orderId}
              unitsBought={transaction.unitsBought}
              date={transaction.date}
              price={transaction.price}
              order={transaction.order}
              customerAddress={transaction.customerAddress}
              customerEmail={transaction.customerEmail}
            />
          ))}
        </tbody>
      </table>

      <AllTransactionsModal
        open={showAllTransactions}
        onClose={() => setShowAllTransactions(false)}
        transactions={transactionsData}
      />
    </div>
  );
};

export const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Order ID</th>
        <th className="text-start p-1.5">Units bought</th>
        <th className="text-start p-1.5">Date of Transaction</th>
        <th className="text-start p-1.5">Price</th>
        <th className="text-start p-1.5">Customer Address</th>
        <th className="text-start p-1.5">Customer Email</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

export const TableRow = ({
  orderId,
  unitsBought,
  date,
  price,
  order,
  customerAddress,
  customerEmail,
}: {
  orderId: string;
  unitsBought: number;
  date: string;
  price: string;
  order: number;
  customerAddress: string;
  customerEmail: string;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {orderId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{unitsBought}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{price}</td>
      <td className="p-1.5">{customerAddress}</td>
      <td className="p-1.5">{customerEmail}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};
