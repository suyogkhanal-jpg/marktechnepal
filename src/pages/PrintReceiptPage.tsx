import { useParams, Link } from 'react-router-dom';
import { useReceipt } from '@/hooks/useReceipts';
import { PrintReceipt } from '@/components/PrintReceipt';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Printer } from 'lucide-react';

export default function PrintReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const { data: receipt, isLoading } = useReceipt(id);

  const handlePrint = () => {
    window.print();
  };

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
          <Button onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print Receipt
          </Button>
        </div>
      </div>

      {/* Print Preview */}
      <div className="p-6">
        <PrintReceipt receipt={receipt} />
      </div>
    </div>
  );
}
