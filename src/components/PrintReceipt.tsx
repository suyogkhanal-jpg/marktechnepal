import { Receipt } from '@/types/receipt';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';

interface PrintReceiptProps {
  receipt: Receipt;
}

export function PrintReceipt({ receipt }: PrintReceiptProps) {
  return (
    <div className="receipt-print max-w-2xl mx-auto bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="text-center border-b border-border pb-4 mb-4">
        <h1 className="text-2xl font-bold text-primary">MARINE TRADING PVT. LTD.</h1>
        <p className="text-sm text-muted-foreground">Entire IT Solution in a single destination</p>
        <p className="text-xs text-muted-foreground mt-1">
          22, Tahahiti Galli, New Road, Kathmandu, Nepal
        </p>
        <p className="text-xs text-muted-foreground">
          Tel: +977-1-4220125, 4239184 | Email: marinetrading2077@gmail.com
        </p>
      </div>

      {/* Receipt Title & Number */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold">MAINTENANCE RECEIPT</h2>
          <p className="text-sm text-muted-foreground">
            Date: {format(new Date(receipt.received_date), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Receipt No.</div>
          <div className="text-3xl font-mono font-bold text-primary">
            {receipt.receipt_number}
          </div>
        </div>
      </div>

      {/* Customer & Device Info Table */}
      <table className="w-full border-collapse mb-6">
        <tbody>
          <tr className="border border-border">
            <td className="border border-border p-2 bg-muted font-medium w-1/3">Customer Name</td>
            <td className="border border-border p-2">{receipt.customer_name}</td>
          </tr>
          <tr className="border border-border">
            <td className="border border-border p-2 bg-muted font-medium">Contact No.</td>
            <td className="border border-border p-2">{receipt.customer_phone}</td>
          </tr>
          {receipt.customer_email && (
            <tr className="border border-border">
              <td className="border border-border p-2 bg-muted font-medium">Email</td>
              <td className="border border-border p-2">{receipt.customer_email}</td>
            </tr>
          )}
          <tr className="border border-border">
            <td className="border border-border p-2 bg-muted font-medium">Device Type</td>
            <td className="border border-border p-2 capitalize">{receipt.device_type}</td>
          </tr>
          {receipt.device_model && (
            <tr className="border border-border">
              <td className="border border-border p-2 bg-muted font-medium">Model No.</td>
              <td className="border border-border p-2">{receipt.device_model}</td>
            </tr>
          )}
          {receipt.serial_number && (
            <tr className="border border-border">
              <td className="border border-border p-2 bg-muted font-medium">Serial No.</td>
              <td className="border border-border p-2">{receipt.serial_number}</td>
            </tr>
          )}
          {receipt.device_password && (
            <tr className="border border-border">
              <td className="border border-border p-2 bg-muted font-medium">User Password</td>
              <td className="border border-border p-2">{receipt.device_password}</td>
            </tr>
          )}
          {receipt.accessories && (
            <tr className="border border-border">
              <td className="border border-border p-2 bg-muted font-medium">Particulars</td>
              <td className="border border-border p-2">{receipt.accessories}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Problem Description */}
      <div className="border border-border p-3 mb-6">
        <h3 className="font-medium mb-2">Problem Description</h3>
        <p className="text-sm">{receipt.problem_description}</p>
      </div>

      {receipt.repair_notes && (
        <div className="border border-border p-3 mb-6">
          <h3 className="font-medium mb-2">Repair Notes</h3>
          <p className="text-sm">{receipt.repair_notes}</p>
        </div>
      )}

      {/* Status & Dates */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-sm text-muted-foreground">Status: </span>
          <StatusBadge status={receipt.status} />
        </div>
        {receipt.estimated_delivery_date && (
          <div className="text-sm">
            <span className="text-muted-foreground">Est. Delivery: </span>
            <span className="font-medium">
              {format(new Date(receipt.estimated_delivery_date), 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </div>

      {/* Terms & Signature */}
      <div className="border-t border-border pt-4 mt-6">
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          सूचना: सामान लिँदा यस नक्कल सक्कल भौचर अनिवार्य रुपमा लिएर आउनु पर्नेछ । भौचर बिना सामान बुझाईने छैन । 
          यदि कुनै कारणले मर्मत नभएमा मर्मत शुल्क लाग्ने छ । सामान आफैले लिन नआएमा हुने नोक्सानीको जिम्मेवार यस कम्पनी हुने छैन ।
          अनिवार्य अधिकतम् अवधि ९० (VAT) लाग्नेछ ।
        </p>
        
        <div className="flex justify-between mt-8">
          <div className="text-center">
            <div className="w-40 border-t border-foreground pt-1">
              <span className="text-xs">Customer Signature</span>
            </div>
          </div>
          <div className="text-center">
            <div className="w-40 border-t border-foreground pt-1">
              <span className="text-xs">For NLS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
        <p className="font-medium">Laptop, Motherboard, Monitor तथा सम्पूर्ण Computer Accessories को लागि</p>
        <p>Laptop Accessories Wholesale तथा Retail</p>
      </div>
    </div>
  );
}
