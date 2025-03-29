import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

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

const ITEMS_PER_PAGE = 20;

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Format the transaction hash for display
  const formatTxHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  
  // Get current page items
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return transactions.slice(startIndex, endIndex);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If not many pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate which pages to show around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at boundaries
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = getCurrentItems();
  const pageNumbers = getPageNumbers();

  if (type === 'donation') {
    return (
      <>
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
            {(currentItems as Transaction[]).map((donation) => (
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
        
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {pageNumbers.map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink 
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page as number)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  } else {
    return (
      <>
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
            {(currentItems as Distribution[]).map((distribution) => (
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
        
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {pageNumbers.map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink 
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page as number)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  }
};

export default TransactionTable;
