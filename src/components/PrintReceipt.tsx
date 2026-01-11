import { Receipt } from '@/types/receipt';
import { Globe, Mail } from 'lucide-react';

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
    <div className="receipt-print max-w-4xl mx-auto bg-white text-black p-8 print:p-6 font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        {/* Left Side - Logo and Title */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-16 h-12 bg-purple-800 rounded flex items-center justify-center text-white text-xs font-bold leading-tight px-1">
              <span className="text-center">MarkTech<br/>Nepal</span>
            </div>
            <h1 className="text-3xl font-bold tracking-wide">MARKTECH NEPAL</h1>
          </div>
          <h2 className="text-lg font-medium underline mb-2 ml-1">MAINTENANCE RECEIPT</h2>
          <div className="ml-1">
            <span className="text-base">Receipt No.</span>
            <span className="text-4xl font-bold ml-3">{receiptNumberDisplay}</span>
          </div>
        </div>
        
        {/* Right Side - Contact Info */}
        <div className="text-right text-sm leading-relaxed">
          <p className="font-medium">22, Tadhahiti Galli, New Road</p>
          <p>Kathmandu, Nepal</p>
          <p className="mt-1">Tel: +977-1-5320125,</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-lg">☎ ⓦ 🌐</span>
            <span className="font-medium">: 9766889852</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Globe size={14} />
            <span>marktechnepal.com</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Mail size={14} />
            <span>info@marktechnepal.com</span>
          </div>
        </div>
      </div>

      {/* Customer Info Section */}
      <div className="mb-6 text-base">
        <div className="flex items-baseline mb-3">
          <span className="font-medium">Customer Name:</span>
          <span className="flex-1 border-b border-dotted border-black ml-2 pb-1">{primaryReceipt.customer_name}</span>
        </div>
        <div className="flex items-baseline gap-6">
          <div className="flex items-baseline flex-1">
            <span className="font-medium">Contact:</span>
            <span className="flex-1 border-b border-dotted border-black ml-2 pb-1">{primaryReceipt.customer_phone}</span>
          </div>
          <div className="flex items-baseline w-40">
            <span className="font-medium">PW:</span>
            <span className="flex-1 border-b border-dotted border-black ml-2 pb-1">{firstPassword}</span>
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <table className="w-full border-collapse border border-black mb-6 text-sm">
        <thead>
          <tr className="bg-white">
            <th className="border border-black p-3 text-left w-12 font-semibold">S.N</th>
            <th className="border border-black p-3 text-left font-semibold">Particulars</th>
            <th className="border border-black p-3 text-left font-semibold">Problem</th>
            <th className="border border-black p-3 text-left w-28 font-semibold">Model NO.</th>
            <th className="border border-black p-3 text-left w-28 font-semibold">Serial No.</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={receipt.id}>
              <td className="border border-black p-3 align-top">
                {index + 1}
              </td>
              <td className="border border-black p-3 align-top">
                <span className="capitalize">{receipt.device_type}</span>
                {receipt.accessories && <span className="text-sm block text-gray-600">({receipt.accessories})</span>}
              </td>
              <td className="border border-black p-3 align-top">
                {receipt.problem_description}
              </td>
              <td className="border border-black p-3 align-top">
                {receipt.device_model || ''}
              </td>
              <td className="border border-black p-3 align-top">
                {receipt.serial_number || ''}
              </td>
            </tr>
          ))}
          {/* Empty rows to ensure minimum table height */}
          {receipts.length < 5 && Array.from({ length: Math.max(5 - receipts.length, 3) }).map((_, i) => (
            <tr key={`empty-${i}`} style={{ height: '60px' }}>
              <td className="border border-black p-3">&nbsp;</td>
              <td className="border border-black p-3">&nbsp;</td>
              <td className="border border-black p-3">&nbsp;</td>
              <td className="border border-black p-3">&nbsp;</td>
              <td className="border border-black p-3">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Terms & Conditions */}
      <div className="mb-3 text-sm leading-relaxed text-center">
        <p>
          मर्मतका लागि छाडिएको सामान 2 महिनासम्म लिन नआएमा हराए वा बिग्रिएमा त्यसको
        </p>
        <p>जिम्मेवाही कम्पनीले लिने छैन।</p>
      </div>

      {/* VAT Notice */}
      <div className="mb-6 text-center">
        <p className="text-lg font-bold">मर्मत खर्चमा अतिरिक्त मूल्य अभिवृद्धि कर (VAT) लाग्नेछ।</p>
      </div>

      {/* Signature Section */}
      <div className="flex justify-center mb-4">
        <div className="text-center">
          <div className="w-48 border-b border-dotted border-black mb-1"></div>
          <span className="text-base">For : MKTN</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm mb-3">
          Laptop, Desktop, Projector, Printer and all kinds of computer Accesories maintenance and sales
        </p>
        <p className="text-xl font-bold">
          Please Return this Slip
        </p>
      </div>
    </div>
  );
}
