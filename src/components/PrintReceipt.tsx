import { Receipt } from '@/types/receipt';
import { Globe, Mail, Facebook } from 'lucide-react';
import marktechLogo from '@/assets/marktech-logo.webp';

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
    <div className="receipt-print max-w-4xl mx-auto bg-white text-black p-6 print:p-4 font-sans">
      {/* Header Section */}
      <div className="flex items-start gap-3 mb-1">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={marktechLogo} alt="MarkTech Nepal" className="w-16 h-auto" />
        </div>
        
        {/* Title and Subtitle */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-wide" style={{ fontFamily: 'serif' }}>MARKTECH NEPAL</h1>
          <h2 className="text-base font-medium underline mt-1">MAINTENANCE RECEIPT</h2>
        </div>
        
        {/* Right Side - Contact Info */}
        <div className="text-right text-sm leading-relaxed flex-shrink-0">
          <p>22, Tadhahiti Galli, New Road</p>
          <p>Kathmandu, Nepal</p>
          <p>Tel: +977-1-5320125,</p>
          <div className="flex items-center justify-end gap-1">
            {/* WhatsApp icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {/* Viber icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.182.64 6.727.512 9.9c-.128 3.172-.297 9.122 5.594 10.834v2.48s-.038.999.621 1.203c.795.246 1.263-.512 2.024-1.329.418-.449.992-1.108 1.428-1.613 3.94.333 6.969-.426 7.313-.537.793-.255 5.282-.833 6.012-6.793.752-6.15-.355-10.034-2.329-11.796 0 0 .262.186-1.473-1.323C17.701.472 14.788-.041 11.398.002zm.248 1.995c3.027-.038 5.573.394 7.149 1.895l-.001-.001c1.418 1.237 1.89 3.014 1.825 5.996-.07 3.267-.47 5.295-1.803 6.636-.813.753-2.024 1.263-3.639 1.549-.696.123-2.417.384-5.463.193 0 0-2.174 2.632-2.853 3.316-.109.11-.251.155-.341.135-.128-.029-.163-.17-.162-.375 0-.135.012-3.348.012-3.348-.006 0-.001.001 0 0-5.174-1.445-4.868-6.872-4.765-9.283.109-2.556.625-4.526 1.911-5.778 1.689-1.538 5.102-2.893 8.13-2.935zm.066 1.83c-.242.004-.484.02-.726.048-.15.018-.272.151-.262.302.01.15.143.266.294.256.84-.075 1.69-.003 2.513.204.822.207 1.598.557 2.3 1.015.698.458 1.306 1.018 1.805 1.662a6.46 6.46 0 011.107 2.184c.063.208.127.467.177.718.02.099.032.199.047.299.009.055.013.111.021.166.015.099.022.199.033.299.045.401.057.808.038 1.212-.003.076.02.15.063.209a.28.28 0 00.179.113c.153.029.305-.073.339-.227a7.15 7.15 0 00-.009-2.161 7.323 7.323 0 00-.476-1.626 7.438 7.438 0 00-1.263-1.987 7.414 7.414 0 00-2.05-1.604 7.395 7.395 0 00-2.575-.918 7.235 7.235 0 00-1.555-.164zm-2.645.973c-.175.011-.4.06-.677.16-.441.159-.99.556-1.276.923-.36.458-.569 1.006-.611 1.551-.041.529.044.986.198 1.404.326.94.85 1.844 1.433 2.728.582.883 1.227 1.754 1.965 2.572a14.24 14.24 0 003.48 2.925 10.4 10.4 0 002.424 1.14c.457.145.943.24 1.465.216.522-.024 1.078-.178 1.541-.479.478-.311.816-.748 1.012-1.186.126-.28.195-.558.213-.816.018-.257-.019-.496-.127-.688-.181-.32-.51-.535-.852-.701l-1.357-.62-.834-.381c-.291-.135-.604-.186-.9-.066-.243.099-.44.292-.608.504-.17.213-.317.45-.518.608-.055.043-.149.086-.299.084-.306-.006-.763-.133-1.308-.401a6.27 6.27 0 01-1.527-1.047 8.298 8.298 0 01-1.137-1.31c-.32-.45-.555-.88-.68-1.207-.06-.162-.088-.296-.089-.4-.001-.092.016-.139.056-.185.15-.164.364-.33.553-.52.19-.189.367-.4.458-.657.104-.292.078-.627-.04-.929l-.345-.891-.593-1.521c-.16-.372-.447-.597-.701-.697a1.233 1.233 0 00-.516-.09zm2.5.808a.273.273 0 00-.068.008c-.15.036-.246.186-.218.336.18.932.59 1.8 1.186 2.529a5.42 5.42 0 002.17 1.647c.141.061.304-.002.372-.14a.282.282 0 00-.129-.375 4.853 4.853 0 01-1.95-1.476 4.867 4.867 0 01-1.054-2.262.28.28 0 00-.31-.267zm.19 1.756c-.15.026-.256.164-.24.316.065.644.31 1.26.71 1.773.403.517.958.92 1.592 1.161.146.055.311-.018.375-.162a.286.286 0 00-.156-.378 2.92 2.92 0 01-1.294-.944 2.96 2.96 0 01-.577-1.439c-.022-.15-.157-.257-.305-.243-.017.001-.035.003-.052.006-.018.003-.035.006-.053.01z"/>
            </svg>
            {/* Facebook icon */}
            <Facebook size={14} />
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

      {/* Receipt Number */}
      <div className="mb-3">
        <span className="text-base">Receipt No.</span>
        <span className="text-2xl font-bold ml-3">{receiptNumberDisplay}</span>
      </div>

      {/* Customer Info Section */}
      <div className="mb-4 text-base">
        <div className="flex items-baseline mb-2">
          <span className="font-medium">Customer Name:</span>
          <span className="flex-1 border-b border-dotted border-black ml-2 min-h-[1.5rem]">{primaryReceipt.customer_name}</span>
        </div>
        <div className="flex items-baseline">
          <span className="font-medium">Contact:</span>
          <span className="flex-1 border-b border-dotted border-black ml-2 min-h-[1.5rem]">{primaryReceipt.customer_phone}</span>
          <span className="font-medium ml-4">PW:</span>
          <span className="w-32 border-b border-dotted border-black ml-2 min-h-[1.5rem]">{firstPassword}</span>
        </div>
      </div>

      {/* Devices Table */}
      <table className="w-full border-collapse border border-black mb-4 text-sm">
        <thead>
          <tr className="bg-white">
            <th className="border border-black p-2 text-left w-10 font-semibold">S.N</th>
            <th className="border border-black p-2 text-left font-semibold">Particulars</th>
            <th className="border border-black p-2 text-left font-semibold">Problem</th>
            <th className="border border-black p-2 text-left w-24 font-semibold">Model NO.</th>
            <th className="border border-black p-2 text-left w-24 font-semibold">Serial No.</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={receipt.id} style={{ minHeight: '200px' }}>
              <td className="border border-black p-2 align-top">
                {index + 1}
              </td>
              <td className="border border-black p-2 align-top">
                <span className="capitalize">{receipt.device_type}</span>
                {receipt.accessories && <span className="text-sm block text-gray-600">({receipt.accessories})</span>}
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
          {/* Add empty rows to fill space */}
          {receipts.length < 5 && Array.from({ length: 5 - receipts.length }).map((_, i) => (
            <tr key={`empty-${i}`} style={{ height: '40px' }}>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Terms & Conditions */}
      <div className="mb-2 text-sm leading-relaxed text-center">
        <p>
          मर्मतका लागि छाडिएको सामान 2 महिनासम्म लिन नआएमा हराए वा बिग्रिएमा त्यसको
        </p>
        <p>जिम्मेवाही कम्पनीले लिने छैन।</p>
      </div>

      {/* VAT Notice */}
      <div className="mb-3 text-center">
        <p className="text-lg font-bold">मर्मत खर्चमा अतिरिक्त मूल्य अभिवृद्धि कर (VAT) लाग्नेछ।</p>
      </div>

      {/* Signature Section */}
      <div className="flex justify-center mb-3">
        <div className="text-center">
          <div className="w-48 border-b border-dotted border-black mb-1"></div>
          <span className="text-base">For : MKTN</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-sm mb-2">
          Laptop, Desktop, Projector, Printer and all kinds of computer
        </p>
        <p className="text-sm mb-3">
          Accesories maintenance and sales
        </p>
        <p className="text-xl font-bold">
          Please Return this Slip
        </p>
      </div>
    </div>
  );
}
