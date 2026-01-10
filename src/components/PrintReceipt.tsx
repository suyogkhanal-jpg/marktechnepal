import { Receipt } from '@/types/receipt';
import { format } from 'date-fns';
import { Globe, Mail, Phone } from 'lucide-react';

interface PrintReceiptProps {
  receipts: Receipt[];
}

export function PrintReceipt({ receipts }: PrintReceiptProps) {
  if (receipts.length === 0) return null;
  
  // Use first receipt for customer info
  const primaryReceipt = receipts[0];
  
  // Get receipt number display
  const receiptNumberDisplay = receipts.length > 1 
    ? `${receipts[receipts.length - 1].receipt_number}-${receipts[0].receipt_number}`
    : primaryReceipt.receipt_number;

  // Get first device password for PW field
  const firstPassword = primaryReceipt.device_password || '';
  
  return (
    <div className="receipt-print max-w-4xl mx-auto bg-white text-black p-6 print:p-4 font-sans text-sm">
      {/* Header - Two Column Layout */}
      <div className="flex justify-between items-start border-b-2 border-black pb-3 mb-4">
        {/* Left Side - Logo and Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-14 h-14 bg-purple-700 rounded flex items-center justify-center text-white text-xl font-bold">
              MT
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-purple-700">MARKTECH NEPAL</h1>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-base font-bold underline">MAINTENANCE RECEIPT</h2>
            <div className="mt-1">
              <span className="text-sm">Receipt No. </span>
              <span className="text-3xl font-bold text-red-600">{receiptNumberDisplay}</span>
            </div>
          </div>
        </div>
        
        {/* Right Side - Contact Info */}
        <div className="text-right text-xs leading-relaxed">
          <p className="font-medium">22, Tadhahiti Galli, New Road</p>
          <p>Kathmandu, Nepal</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <Phone size={12} />
            <span>Tel: +977-1-5320125,</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <span className="text-xs">📱</span>
            <span>9766889852</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Globe size={12} />
            <span>marktechnepal.com</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Mail size={12} />
            <span>info@marktechnepal.com</span>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="text-right text-sm mb-3">
        <span className="font-medium">Date: </span>
        <span>{format(new Date(primaryReceipt.received_date), 'yyyy/MM/dd')}</span>
      </div>

      {/* Customer Info - Two Lines */}
      <div className="mb-4 text-sm">
        <div className="flex items-center mb-2">
          <span className="font-medium w-32">Customer Name:</span>
          <span className="flex-1 border-b border-dotted border-black pb-1">{primaryReceipt.customer_name}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center flex-1">
            <span className="font-medium w-20">Contact:</span>
            <span className="flex-1 border-b border-dotted border-black pb-1">{primaryReceipt.customer_phone}</span>
          </div>
          <div className="flex items-center w-48">
            <span className="font-medium w-10">PW:</span>
            <span className="flex-1 border-b border-dotted border-black pb-1">{firstPassword}</span>
          </div>
        </div>
      </div>

      {/* Devices Table - 5 Columns */}
      <table className="w-full border-collapse border border-black mb-4 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2 text-center w-12">S.N</th>
            <th className="border border-black p-2 text-left">Particulars</th>
            <th className="border border-black p-2 text-left">Problem</th>
            <th className="border border-black p-2 text-left w-28">Model NO.</th>
            <th className="border border-black p-2 text-left w-28">Serial No.</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={receipt.id}>
              <td className="border border-black p-2 text-center align-top font-bold">
                {index + 1}
              </td>
              <td className="border border-black p-2 align-top">
                <span className="capitalize">{receipt.device_type}</span>
                {receipt.accessories && <span className="text-xs block text-gray-600">({receipt.accessories})</span>}
              </td>
              <td className="border border-black p-2 align-top">
                {receipt.problem_description}
              </td>
              <td className="border border-black p-2 align-top">
                {receipt.device_model || '-'}
              </td>
              <td className="border border-black p-2 align-top">
                {receipt.serial_number || '-'}
              </td>
            </tr>
          ))}
          {/* Empty rows to fill space if needed */}
          {receipts.length < 3 && Array.from({ length: 3 - receipts.length }).map((_, i) => (
            <tr key={`empty-${i}`}>
              <td className="border border-black p-2 text-center">&nbsp;</td>
              <td className="border border-black p-2">&nbsp;</td>
              <td className="border border-black p-2">&nbsp;</td>
              <td className="border border-black p-2">&nbsp;</td>
              <td className="border border-black p-2">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Terms & Conditions */}
      <div className="mb-2 text-xs leading-relaxed">
        <p>
          मर्मतका लागि छाडिएको सामान 2 महिनासम्म लिन नआएमा हराए वा बिग्रिएमा त्यसको
          जिम्मेवाही कम्पनीले लिने छैन।
        </p>
      </div>

      {/* VAT Notice */}
      <div className="mb-4 text-xs font-bold">
        <p>मर्मत खर्चमा अतिरिक्त मूल्य अभिवृद्धि कर (VAT) लाग्नेछ।</p>
      </div>

      {/* Signature Section */}
      <div className="flex justify-end mt-8 mb-4">
        <div className="text-center">
          <div className="w-48 border-t border-dotted border-black pt-1">
            <span className="text-sm font-medium">For : MKTN</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center border-t border-black pt-3">
        <p className="text-xs mb-2">
          Laptop, Desktop, Projector, Printer and all kinds of computer Accessories maintenance and sales
        </p>
        <p className="text-sm font-bold border border-black inline-block px-4 py-1">
          Please Return this Slip
        </p>
      </div>
    </div>
  );
}
