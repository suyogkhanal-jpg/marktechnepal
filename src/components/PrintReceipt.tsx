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
            {/* WhatsApp - Green */}
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {/* Viber - Purple */}
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#7360F2">
              <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.182.64 6.727.512 9.9c-.128 3.172-.297 9.122 5.594 10.834v2.48s-.038.999.621 1.203c.795.246 1.263-.512 2.024-1.329.418-.449.992-1.108 1.428-1.613 3.94.333 6.969-.426 7.313-.537.793-.255 5.282-.833 6.012-6.793.752-6.15-.355-10.034-2.329-11.796 0 0 .262.186-1.473-1.323C17.701.472 14.788-.041 11.398.002zm.297 2.056c2.877-.036 5.194.404 6.809 1.493 1.381.935 2.108 2.373 2.165 4.285.065 2.161-.219 3.902-.839 5.166-.454.926-1.098 1.644-1.914 2.132-1.081.646-2.413.968-3.963 1.008-.392.01-.793.015-1.2.015-1.778 0-3.711-.123-5.614-.367l-.037-.005c-.45.5-1.055 1.2-1.484 1.66-.288.31-.441.264-.453-.082v-2.283l-.009-.087c-3.277-.96-4.771-3.232-4.698-7.15.021-1.103.165-2.082.44-2.953.39-1.232 1.012-2.19 1.87-2.873 1.513-1.203 3.989-1.91 7.344-2.014.527-.018 1.047-.023 1.583.055zm-.162 1.723c-2.628-.073-4.593.303-5.858 1.113-.93.598-1.492 1.404-1.671 2.4-.143.793-.17 1.723-.083 2.773.165 1.99.908 3.357 2.21 4.067.426.232.934.424 1.516.573v1.144c.687-.667 1.185-1.147 1.65-1.588l.226-.214.284.037c1.666.217 3.399.327 5.007.318 1.259-.007 2.33-.194 3.187-.556.56-.236 1.022-.54 1.374-.906.471-.488.815-1.111 1.024-1.854.279-.991.385-2.215.316-3.637-.092-1.903-.892-3.152-2.391-3.736-1.243-.484-2.86-.756-4.805-.89a24.46 24.46 0 00-1.986-.044zm.36 1.467a.533.533 0 01.027 1.066c-1.104.028-1.926.285-2.468.767-.542.483-.82 1.193-.83 2.125a.533.533 0 11-1.066-.019c.014-1.249.42-2.252 1.22-3.012.798-.76 1.89-1.12 3.117-1.927zm5.197 1.023c.008 0 .015 0 .022.002.098.015.157.107.157.243v.594c0 .12-.047.234-.128.32l-.428.456c-.086.091-.08.238.013.322l.479.429c.071.064.112.154.112.248v.633c0 .136-.072.229-.17.219l-.02-.002c-.188-.03-.467-.186-.839-.468-.31-.235-.61-.504-.9-.8-.29-.296-.55-.604-.78-.918-.275-.377-.425-.66-.451-.848-.008-.099.078-.176.213-.183h.618a.435.435 0 01.31.128l.44.44c.084.084.23.088.32.01l.471-.414a.423.423 0 01.317-.113h.244zm-5.05.962a.533.533 0 01.103 1.056c-.346.068-.57.173-.693.321-.12.146-.17.357-.148.633a.533.533 0 11-1.062.102c-.042-.434.058-.84.307-1.14.248-.298.614-.505 1.09-.6a.533.533 0 01.404.628zM8.478 9.39c.294 0 .515.088.662.264.148.176.284.44.409.794l.262.743c.094.261.178.5.254.718.078.224.113.39.107.5-.007.11-.063.186-.169.226-.106.041-.231.021-.375-.059-.144-.08-.28-.178-.41-.294a6.367 6.367 0 01-.428-.408 3.248 3.248 0 01-.37-.458c-.121.334-.255.611-.402.832-.263.398-.567.597-.91.597a.87.87 0 01-.68-.32c-.185-.212-.277-.49-.277-.835 0-.464.135-.837.407-1.12.271-.282.638-.423 1.1-.423.157 0 .29.015.397.045l-.055-.196c-.06-.208-.12-.382-.179-.522-.059-.14-.137-.245-.233-.316-.097-.07-.225-.106-.384-.106-.157 0-.316.055-.476.164-.16.11-.275.214-.346.314a.236.236 0 01-.195.106.236.236 0 01-.186-.084.291.291 0 01-.075-.201c0-.146.094-.311.283-.494.188-.183.436-.32.743-.41.154-.044.316-.07.488-.077h.117zm5.094.005c.293 0 .514.088.662.264.147.176.283.44.408.794l.262.743c.094.261.178.5.254.718.078.224.114.39.107.5-.007.11-.063.186-.169.226-.106.041-.23.021-.374-.059a2.358 2.358 0 01-.41-.294 6.367 6.367 0 01-.428-.408 3.248 3.248 0 01-.37-.458c-.121.334-.255.611-.402.832-.263.398-.567.597-.91.597a.87.87 0 01-.68-.32c-.185-.212-.278-.49-.278-.835 0-.464.136-.837.408-1.12.27-.282.637-.423 1.099-.423.157 0 .29.015.397.045l-.055-.196c-.06-.208-.12-.382-.179-.522-.059-.14-.137-.245-.233-.316-.097-.07-.225-.106-.384-.106-.157 0-.316.055-.476.164-.16.11-.275.214-.346.314a.236.236 0 01-.195.106.236.236 0 01-.186-.084.291.291 0 01-.075-.201c0-.146.094-.311.283-.494.188-.183.436-.32.743-.41.154-.044.316-.07.488-.077h.117zm-5.094 2.212c-.222 0-.403.086-.543.257-.14.17-.21.395-.21.674 0 .188.044.335.133.442a.406.406 0 00.326.16c.154 0 .306-.106.456-.319a2.24 2.24 0 00.297-.683c-.056-.023-.13-.053-.22-.09a1.547 1.547 0 01-.24-.132.576.576 0 000-.309zm5.094 0c-.222 0-.403.086-.543.257-.14.17-.21.395-.21.674 0 .188.044.335.133.442a.406.406 0 00.326.16c.154 0 .306-.106.456-.319a2.24 2.24 0 00.297-.683c-.056-.023-.13-.053-.22-.09a1.547 1.547 0 01-.24-.132.576.576 0 000-.309z"/>
            </svg>
            {/* Facebook - Blue */}
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
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
            <th className="border border-black p-2 text-left font-bold" style={{ width: '35px' }}>S.N</th>
            <th className="border border-black p-2 text-center font-bold" style={{ width: '120px' }}>Particulars</th>
            <th className="border border-black p-2 text-center font-bold" style={{ width: '140px' }}>Problem</th>
            <th className="border border-black p-2 text-center font-bold" style={{ width: '115px' }}>Model NO.</th>
            <th className="border border-black p-2 text-center font-bold" style={{ width: '115px' }}>Serial No.</th>
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
