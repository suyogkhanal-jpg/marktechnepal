import { Receipt } from '@/types/receipt';
import { format } from 'date-fns';

interface PrintReceiptProps {
  receipt: Receipt;
}

export function PrintReceipt({ receipt }: PrintReceiptProps) {
  return (
    <div className="receipt-print max-w-4xl mx-auto bg-white text-black p-8 border border-black print:border-none">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-4">
        <div className="flex justify-center items-center gap-2 mb-1">
          <div className="w-8 h-8 border-2 border-black rounded flex items-center justify-center text-xs font-bold">
            MT
          </div>
          <h1 className="text-2xl font-bold tracking-wide">MARINE TRADING PVT. LTD.</h1>
        </div>
        <p className="text-sm italic">(Entire IT Solution in a single destination)</p>
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
            {receipt.receipt_number}
          </div>
        </div>
      </div>

      {/* Customer & Device Info - Inline Style like physical receipt */}
      <div className="border border-black mb-4">
        <div className="grid grid-cols-2 border-b border-black">
          <div className="p-2 border-r border-black">
            <span className="font-medium">Customer Name: </span>
            <span className="border-b border-dotted border-black">{receipt.customer_name}</span>
          </div>
          <div className="p-2">
            <span className="font-medium">Date: </span>
            <span className="border-b border-dotted border-black">{format(new Date(receipt.received_date), 'MMM d, yyyy')}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b border-black">
          <div className="p-2 border-r border-black">
            <span className="font-medium">Contact No.: </span>
            <span className="border-b border-dotted border-black">{receipt.customer_phone}</span>
          </div>
          <div className="p-2">
            <span className="font-medium">User Password: </span>
            <span className="border-b border-dotted border-black">{receipt.device_password || '...................'}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b border-black">
          <div className="p-2 border-r border-black">
            <span className="font-medium">Model No.: </span>
            <span className="border-b border-dotted border-black">{receipt.device_model || '...................'}</span>
          </div>
          <div className="p-2">
            <span className="font-medium">Serial No.: </span>
            <span className="border-b border-dotted border-black">{receipt.serial_number || '...................'}</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <table className="w-full border-collapse border border-black mb-4">
        <thead>
          <tr>
            <th className="border border-black p-2 text-center w-16">Qty.</th>
            <th className="border border-black p-2 text-left">Particulars</th>
            <th className="border border-black p-2 text-left">Problem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 text-center align-middle font-medium text-lg">1</td>
            <td className="border border-black p-2 align-top min-h-[100px]">
              <div className="font-medium capitalize">{receipt.device_type}</div>
              {receipt.accessories && <div className="text-sm mt-1">{receipt.accessories}</div>}
            </td>
            <td className="border border-black p-2 align-top">
              {receipt.problem_description}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Estimated Delivery */}
      {receipt.estimated_delivery_date && (
        <div className="mb-4 text-sm">
          <span className="font-medium">Estimated Delivery Date: </span>
          {format(new Date(receipt.estimated_delivery_date), 'MMM d, yyyy')}
        </div>
      )}

      {/* Terms & Conditions */}
      <div className="border-t border-black pt-3 mb-2">
        <p className="text-xs leading-relaxed">
          सूचना: सामान लिन आँउदा यो रसिद अनिवार्य छ । मर्मतको लागि घाडेको सामान मर्मत भईसकेको ४५ दिन सम्ममा नलगी कुनै किसिमको हानीनोक्सानी भएमा कम्पनी जवाफदेही हुने छैन ।
        </p>
        <p className="text-xs font-bold text-center mt-1">
          मर्मत खर्चमा अतिरिक्त मूल्य अभिवृद्धि कर (VAT) लाग्नेछ ।
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
            <span className="text-xs">For: NLS</span>
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
