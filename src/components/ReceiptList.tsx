import { Receipt } from '@/types/receipt';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Printer, Phone, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface ReceiptListProps {
  receipts: Receipt[] | undefined;
  isLoading: boolean;
}

export function ReceiptList({ receipts, isLoading }: ReceiptListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!receipts || receipts.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No receipts found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {receipts.map((receipt, index) => (
        <Card
          key={receipt.id}
          className="shadow-card hover:shadow-elevated transition-shadow animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-lg font-bold text-primary">
                    #{receipt.receipt_number}
                  </span>
                  <StatusBadge status={receipt.status} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <span className="font-medium truncate">{receipt.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{receipt.customer_phone}</span>
                  </div>
                  <div className="text-muted-foreground capitalize">
                    {receipt.device_type} {receipt.device_model && `- ${receipt.device_model}`}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(receipt.received_date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/receipt/${receipt.id}`}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/receipt/${receipt.id}/print`}>
                    <Printer className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
