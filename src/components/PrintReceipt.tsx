import { Receipt } from '@/types/receipt';
import { Globe, Mail, Facebook } from 'lucide-react';
import marktechLogo from '@/assets/marktech-logo-black.png';
import { formatNepaliDate } from '@/utils/nepaliDate';

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

  // Get Nepali date from received_date
  const nepaliDate = formatNepaliDate(primaryReceipt.received_date);
  
  return (
    <div className="receipt-print bg-white text-black font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section - Logo Left, Title Center, Address Right */}
      <div className="flex items-start justify-between mb-2">
        {/* Logo - Top Left */}
        <div className="flex-shrink-0" style={{ width: '70px' }}>
          <img src={marktechLogo} alt="MarkTech Nepal" className="h-14 w-auto" />
        </div>
        
        {/* Title - Center */}
        <div className="text-center flex-1 px-2">
          <h1 className="font-bold tracking-wide" style={{ fontSize: '28px', letterSpacing: '2px' }}>
            MARKTECH NEPAL
          </h1>
          <h2 className="font-bold underline" style={{ fontSize: '18px', textDecorationThickness: '1.5px' }}>
            MAINTENANCE RECEIPT
          </h2>
        </div>
        
        {/* Address & Contact - Top Right */}
        <div className="text-right flex-shrink-0" style={{ fontSize: '11px', lineHeight: '1.4' }}>
          <p>22, Tadhahiti Galli, New Road</p>
          <p>Kathmandu, Nepal</p>
          <p>Tel: +977-1-5320125,</p>
          <div className="flex items-center justify-end gap-0.5">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.182.64 6.727.512 9.9c-.128 3.172-.297 9.122 5.594 10.834v2.48s-.038.999.621 1.203c.795.246 1.263-.512 2.024-1.329.418-.449.992-1.108 1.428-1.613 3.94.333 6.969-.426 7.313-.537.793-.255 5.282-.833 6.012-6.793.752-6.15-.355-10.034-2.329-11.796 0 0 .262.186-1.473-1.323C17.701.472 14.788-.041 11.398.002z"/>
            </svg>
            <Facebook size={11} />
            <span>: 9766889852</span>
          </div>
          <div className="flex items-center justify-end gap-0.5">
            <Globe size={11} />
            <span>marktechnepal.com</span>
          </div>
          <div className="flex items-center justify-end gap-0.5">
            <Mail size={11} />
            <span>info@marktechnepal.com</span>
          </div>
        </div>
      </div>

      {/* Receipt Number and Date Row */}
      <div className="flex justify-between items-baseline mb-3" style={{ fontSize: '14px' }}>
        <div>
          <span>Receipt No.</span>
          <span className="font-bold ml-2" style={{ fontSize: '22px' }}>{receiptNumberDisplay}</span>
        </div>
        <div>
          <span>Date: </span>
          <span className="font-semibold" style={{ fontSize: '13px' }}>{nepaliDate}</span>
        </div>
      </div>

      {/* Customer Info Section - with proper writing space */}
      <div className="mb-3" style={{ fontSize: '14px' }}>
        <div className="flex items-baseline mb-3">
          <span className="font-medium">Customer Name:</span>
          <span 
            className="flex-1 border-b border-dotted border-black ml-2" 
            style={{ minHeight: '22px', paddingBottom: '2px' }}
          >
            {primaryReceipt.customer_name}
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="font-medium">Contact:</span>
          <span 
            className="border-b border-dotted border-black ml-2" 
            style={{ minWidth: '180px', minHeight: '22px', paddingBottom: '2px' }}
          >
            {primaryReceipt.customer_phone}
          </span>
          <span className="font-medium ml-6">PW:</span>
          <span 
            className="flex-1 border-b border-dotted border-black ml-2" 
            style={{ minHeight: '22px', paddingBottom: '2px' }}
          >
            {firstPassword}
          </span>
        </div>
      </div>

      {/* Devices Table - with adequate row height for writing */}
      <table className="w-full border-collapse border border-black mb-3" style={{ fontSize: '13px' }}>
        <thead>
          <tr className="bg-white">
            <th className="border border-black p-2 text-left font-bold" style={{ width: '40px' }}>S.N</th>
            <th className="border border-black p-2 text-center font-bold" style={{ width: '130px' }}>Particulars</th>
            <th className="border border-black p-2 text-center font-bold">Problem</th>
            <th className="border border-black p-2 text-center font-bold" style={{ width: '95px' }}>Model NO.</th>
            <th className="border border-black p-2 text-center font-bold" style={{ width: '95px' }}>Serial No.</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={receipt.id} style={{ height: '50px' }}>
              <td className="border border-black p-2 align-top text-center">
                {index + 1}
              </td>
              <td className="border border-black p-2 align-top">
                <span className="capitalize">{receipt.device_type}</span>
                {receipt.accessories && <span className="block text-gray-600 text-xs">({receipt.accessories})</span>}
              </td>
              <td className="border border-black p-2 align-top">
                {receipt.problem_description}
              </td>
              <td className="border border-black p-2 align-top">
                {receipt.device_model || ''}
              </td>
              <td className="border border-black p-2 align-top">
                {receipt.serial_number || ''}
              </td>
            </tr>
          ))}
          {/* Add empty rows with adequate writing space */}
          {receipts.length < 4 && Array.from({ length: 4 - receipts.length }).map((_, i) => (
            <tr key={`empty-${i}`} style={{ height: '50px' }}>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Terms & Conditions - Nepali text */}
      <div className="text-center mb-1" style={{ fontSize: '13px', lineHeight: '1.5' }}>
        <p>मर्मतका लागि छाडिएको सामान २ महिनासम्म लिन नआएमा हराए वा बिग्रिएमा त्यसको</p>
        <p>जिम्मेवाही कम्पनीले लिने छैन।</p>
      </div>

      {/* VAT Notice - Bold Nepali text */}
      <div className="text-center mb-4" style={{ fontSize: '15px' }}>
        <p className="font-bold">मर्मत खर्चमा अतिरिक्त मूल्य अभिवृद्धि कर (VAT) लाग्नेछ।</p>
      </div>

      {/* Signature Section - Centered with blank space */}
      <div className="flex justify-center mb-3">
        <div className="text-center">
          <div style={{ height: '45px' }}></div>
          <div className="w-48 border-t border-black"></div>
          <span className="font-medium" style={{ fontSize: '13px' }}>For : MKTN</span>
        </div>
      </div>

      {/* Service Description */}
      <div className="text-center mb-2" style={{ fontSize: '13px', lineHeight: '1.4' }}>
        <p>Laptop, Desktop, Projector, Printer and all kinds of computer</p>
        <p>Accessories maintenance and sales</p>
      </div>

      {/* Please Return This Slip - Extra large and bold */}
      <div className="text-center">
        <p className="font-bold" style={{ fontSize: '18px' }}>
          Please Return this Slip
        </p>
      </div>
    </div>
  );
}
