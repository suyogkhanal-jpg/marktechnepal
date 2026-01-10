import { Receipt } from '@/types/receipt';
import { format } from 'date-fns';

interface PrintReceiptProps {
  receipts: Receipt[];
}

export function PrintReceipt({ receipts }: PrintReceiptProps) {
  if (receipts.length === 0) return null;
  
  // Use first receipt for customer info
  const primaryReceipt = receipts[0];
  
  return (
    <div className="receipt-print max-w-4xl mx-auto bg-white text-black p-8 border border-black print:border-none">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-4">
        <div className="flex justify-center items-center gap-2 mb-1">
          <div className="w-10 h-10 border-2 border-black rounded flex items-center justify-center text-sm font-bold">
            MT
          </div>
          <h1 className="text-3xl font-bold tracking-wide">MARKTECH NEPAL</h1>
        </div>
        <p className="text-sm italic font-medium">(Laptop & Computer Repair Center)</p>
        <p className="text-xs mt-1">
          22, Tadhahiti Galli, New Road, Kathmandu, Nepal.
        </p>
        <p className="text-xs">
          Tel: +977-1-4220125, 4239184 | Email: marinetrading2077@gmail.com
        </p>
      </div>

      {/* Receipt Number & Title */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold underline">MAINTENANCE RECEIPT</h2>
        </div>
        <div className="text-right">
          <div className="text-sm">Receipt No.</div>
          <div className="text-4xl font-bold text-red-600 font-mono">
            {receipts.length > 1 
              ? `${receipts[receipts.length - 1].receipt_number}-${receipts[0].receipt_number}`
              : primaryReceipt.receipt_number
            }
          </div>
        </div>
      </div>

      {/* Customer Info - Shown only once */}
      <div className="border border-black mb-4">
        <div className="grid grid-cols-2 border-b border-black">
          <div className="p-2 border-r border-black">
            <span className="font-medium">Customer Name: </span>
            <span className="border-b border-dotted border-black">{primaryReceipt.customer_name}</span>
          </div>
          <div className="p-2">
            <span className="font-medium">Date: </span>
            <span className="border-b border-dotted border-black">{format(new Date(primaryReceipt.received_date), 'MMM d, yyyy')}</span>
          </div>
        </div>
        <div className="p-2">
          <span className="font-medium">Contact No.: </span>
          <span className="border-b border-dotted border-black">{primaryReceipt.customer_phone}</span>
        </div>
      </div>

      {/* Devices Table with S.N. */}
      <table className="w-full border-collapse border border-black mb-4">
        <thead>
          <tr>
            <th className="border border-black p-2 text-center w-12">S.N</th>
            <th className="border border-black p-2 text-left">Device Details</th>
            <th className="border border-black p-2 text-left">Problem</th>
            <th className="border border-black p-2 text-center w-24">Password</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={receipt.id}>
              <td className="border border-black p-2 text-center align-top font-bold text-lg">
                {index + 1}
              </td>
              <td className="border border-black p-2 align-top">
                <div className="font-medium capitalize">{receipt.device_type}</div>
                {receipt.device_model && <div className="text-sm">Model: {receipt.device_model}</div>}
                {receipt.serial_number && <div className="text-sm">S/N: {receipt.serial_number}</div>}
                {receipt.accessories && <div className="text-sm mt-1">Accessories: {receipt.accessories}</div>}
              </td>
              <td className="border border-black p-2 align-top">
                {receipt.problem_description}
              </td>
              <td className="border border-black p-2 text-center align-top">
                {receipt.device_password || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Estimated Delivery */}
      {primaryReceipt.estimated_delivery_date && (
        <div className="mb-4 text-sm border border-black p-2">
          <span className="font-medium">Estimated Delivery Date: </span>
          {format(new Date(primaryReceipt.estimated_delivery_date), 'MMM d, yyyy')}
        </div>
      )}

      {/* Terms & Conditions */}
      <div className="border-t border-black pt-3 mb-2">
        <p className="text-xs leading-relaxed font-bold">
          सूचना: सामान लिन आउँदा यो रसिद अनिवार्य रूपमा ल्याउनुहोला। मर्मतका लागि छाडिएको सामान मर्मत सम्पन्न भएको मितिले १५ दिनभित्र नलगेमा त्यसपछि हुने कुनै पनि किसिमको हानी–नोक्सानीको जिम्मेवारी कम्पनीले लिने छैन। मर्मत खर्चमा अतिरिक्त मूल्य अभिवृद्धि कर (VAT) लाग्नेछ।
        </p>
      </div>

      {/* Signatures */}
      <div className="flex justify-between mt-6 mb-4">
        <div className="text-center">
          <div className="w-36 border-t border-black pt-2">
            <span className="text-xs">सामान बुझाउनेको सही</span>
          </div>
        </div>
        <div className="text-center">
          <div className="w-36 border-t border-black pt-2">
            <span className="text-xs">Date: _______________</span>
          </div>
        </div>
        <div className="text-center">
          <div className="w-36 border-t border-black pt-2">
            <span className="text-xs">For: Marktech Nepal</span>
          </div>
        </div>
        <div className="text-center">
          <div className="w-36 border-t border-black pt-2">
            <span className="text-xs">सामान फिर्ता बुझिलिनेको सही</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs border-t border-black pt-3">
        <p className="font-bold">Laptop, Motherboard, Monitor तथा सम्पूर्ण Computer Accessories मर्मत</p>
        <p className="mt-1 inline-block border border-black rounded px-3 py-1">Laptop Accessories Wholesale तथा Retail</p>
      </div>
    </div>
  );
}
