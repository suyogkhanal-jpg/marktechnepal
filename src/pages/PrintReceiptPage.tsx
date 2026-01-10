import { useParams, Link } from 'react-router-dom';
import { useReceipt, useCustomerReceipts } from '@/hooks/useReceipts';
import { PrintReceipt } from '@/components/PrintReceipt';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Printer } from 'lucide-react';

export default function PrintReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const { data: receipt, isLoading: receiptLoading } = useReceipt(id);
  
  // Fetch all receipts for the same customer on the same date
  const { data: customerReceipts, isLoading: customerReceiptsLoading } = useCustomerReceipts(
    receipt?.customer_phone,
    receipt?.received_date
  );

  const handlePrint = () => {
    window.print();
  };

  const isLoading = receiptLoading || customerReceiptsLoading;
  const receiptsToShow = customerReceipts && customerReceipts.length > 0 ? customerReceipts : (receipt ? [receipt] : []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Skeleton className="h-96 max-w-2xl mx-auto" />
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Receipt not found</p>
          <Button variant="outline" asChild>
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Action Bar */}
      <div className="bg-card border-b border-border p-4 no-print">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to={`/receipt/${receipt.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Receipt
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {receiptsToShow.length} device(s) for this customer
            </span>
            <Button onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print Receipt
            </Button>
          </div>
        </div>
      </div>

      {/* Print Preview */}
      <div className="p-6">
        <PrintReceipt receipts={receiptsToShow} />
      </div>
    </div>
  );
}
