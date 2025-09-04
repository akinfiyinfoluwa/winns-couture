
import React from 'react';
import { Button } from '@/components/ui/button';
import { TableHead, TableRow } from './RecentTransactions'; // Reusing existing components

interface AllTransactionsModalProps {
  open: boolean;
  onClose: () => void;
  transactions: any[]; // Define a more specific type later if needed
}

const AllTransactionsModal: React.FC<AllTransactionsModalProps> = ({
  open,
  onClose,
  transactions,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-lg border shadow-2xl p-6 flex flex-col max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
        <div className="overflow-y-auto flex-grow">
          <table className="w-full table-auto">
            <TableHead />
            <tbody>
              {transactions.map((transaction, index) => (
                <TableRow
                  key={index}
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
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default AllTransactionsModal;
