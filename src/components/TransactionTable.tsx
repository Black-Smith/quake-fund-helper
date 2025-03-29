
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

type Transaction = {
  id: string;
  date: string;
  amount: string;
  txHash: string;
  donor: string;
};

type Distribution = {
  id: string;
  date: string;
  amount: string;
  txHash: string;
  purpose: string;
  recipient: string;
};

type TransactionTableProps = {
  transactions: Transaction[] | Distribution[];
  type: 'donation' | 'distribution';
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, type }) => {
  // Format the transaction hash for display
  const formatTxHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  if (type === 'donation') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Donor</TableHead>
            <TableHead className="hidden md:table-cell">Transaction Hash</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(transactions as Transaction[]).map((donation) => (
            <TableRow key={donation.id}>
              <TableCell>{donation.date}</TableCell>
              <TableCell className="font-medium">{donation.amount}</TableCell>
              <TableCell>{donation.donor}</TableCell>
              <TableCell className="hidden md:table-cell font-mono text-xs">
                {formatTxHash(donation.txHash)}
              </TableCell>
              <TableCell>
                <a 
                  href={`https://bscscan.com/tx/${donation.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-earthquake-primary hover:underline flex items-center gap-1 justify-end"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead className="hidden md:table-cell">Recipient</TableHead>
            <TableHead className="hidden lg:table-cell">Transaction Hash</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(transactions as Distribution[]).map((distribution) => (
            <TableRow key={distribution.id}>
              <TableCell>{distribution.date}</TableCell>
              <TableCell className="font-medium">{distribution.amount}</TableCell>
              <TableCell>{distribution.purpose}</TableCell>
              <TableCell className="hidden md:table-cell">{distribution.recipient}</TableCell>
              <TableCell className="hidden lg:table-cell font-mono text-xs">
                {formatTxHash(distribution.txHash)}
              </TableCell>
              <TableCell>
                <a 
                  href={`https://bscscan.com/tx/${distribution.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-earthquake-primary hover:underline flex items-center gap-1 justify-end"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export default TransactionTable;
