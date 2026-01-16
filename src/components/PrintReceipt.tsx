import { Receipt } from '@/types/receipt';
import { Globe, Mail } from 'lucide-react';
import marktechLogo from '@/assets/marktech-logo-black.png';
import { formatNepaliDate } from '@/utils/nepaliDate';

interface PrintReceiptProps {
  receipts: Receipt[];
}

export function PrintReceipt({ receipts }: PrintReceiptProps) {
  if (receipts.length === 0) return null;
  
  const primaryReceipt = receipts[0];
  
  const receiptNumberDisplay = receipts.length > 1 
    ? `${receipts[receipts.length - 1].receipt_number}-${receipts[0].receipt_number}`
    : primaryReceipt.receipt_number;

  const firstPassword = primaryReceipt.device_password || '';
  const nepaliDate = formatNepaliDate(primaryReceipt.received_date);
  
  // Font styles for professional receipt look
  const labelFont = { fontFamily: "'Roboto Condensed', Arial, sans-serif", fontWeight: 600 };
  const dataFont = { fontFamily: "'Courier Prime', 'Courier New', monospace", fontWeight: 400 };
  const headerFont = { fontFamily: "'Roboto Condensed', Arial, sans-serif", fontWeight: 700, letterSpacing: '3px' };
  
  return (
    <div 
      className="receipt-print bg-white text-black"
      style={{ 
        width: '148mm',
        minHeight: '210mm',
        padding: '5mm 4mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        ...labelFont
      }}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between" style={{ marginBottom: '4mm' }}>
        {/* Logo */}
        <div style={{ width: '20mm', flexShrink: 0 }}>
          <img src={marktechLogo} alt="MarkTech Nepal" style={{ height: '17mm', width: 'auto' }} />
        </div>
        
        {/* Title */}
        <div className="text-center flex-1" style={{ padding: '0 2mm' }}>
          <h1 style={{ ...headerFont, fontSize: '26pt', margin: 0, lineHeight: 1.1 }}>
            MARKTECH NEPAL
          </h1>
          <h2 style={{ 
            ...labelFont, 
            fontSize: '15pt', 
            margin: '2mm 0 0 0',
            textDecoration: 'underline',
            textUnderlineOffset: '2px'
          }}>
            MAINTENANCE RECEIPT
          </h2>
        </div>
        
        {/* Address & Contact */}
        <div className="text-right" style={{ fontSize: '9pt', lineHeight: 1.4, flexShrink: 0, width: '44mm' }}>
          <p style={{ margin: 0 }}>22, Tadhahiti Galli, New Road</p>
          <p style={{ margin: 0 }}>Kathmandu, Nepal</p>
          <p style={{ margin: 0 }}>Tel: +977-1-5320125</p>
          <div className="flex items-center justify-end" style={{ gap: '1mm' }}>
            <svg style={{ width: '10px', height: '10px' }} viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <svg style={{ width: '10px', height: '10px' }} viewBox="0 0 24 24" fill="#7360F2">
              <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.182.64 6.727.512 9.9c-.128 3.172-.297 9.122 5.594 10.834v2.48s-.038.999.621 1.203c.795.246 1.263-.512 2.024-1.329.418-.449.992-1.108 1.428-1.613 3.94.333 6.969-.426 7.313-.537.793-.255 5.282-.833 6.012-6.793.752-6.15-.355-10.034-2.329-11.796l-1.473-1.323C17.701.472 14.788-.041 11.398.002z"/>
            </svg>
            <span>9766889852</span>
          </div>
          <div className="flex items-center justify-end" style={{ gap: '1mm' }}>
            <Globe size={10} />
            <span>marktechnepal.com</span>
          </div>
          <div className="flex items-center justify-end" style={{ gap: '1mm' }}>
            <Mail size={10} />
            <span>info@marktechnepal.com</span>
          </div>
        </div>
      </div>

      {/* Receipt Number and Date */}
      <div className="flex justify-between items-center" style={{ marginBottom: '4mm', fontSize: '12pt' }}>
        <div className="flex items-baseline" style={{ gap: '2mm' }}>
          <span style={labelFont}>Receipt No.</span>
          <span style={{ ...dataFont, fontSize: '20pt', fontWeight: 700 }}>{receiptNumberDisplay}</span>
        </div>
        <div className="flex items-baseline" style={{ gap: '2mm' }}>
          <span style={labelFont}>Date:</span>
          <span style={{ ...dataFont, fontSize: '12pt' }}>{nepaliDate}</span>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{ marginBottom: '4mm', fontSize: '12pt' }}>
        <div className="flex items-baseline" style={{ marginBottom: '3mm' }}>
          <span style={{ ...labelFont, width: '30mm', flexShrink: 0 }}>Customer Name:</span>
          <span 
            className="flex-1 border-b border-black" 
            style={{ ...dataFont, paddingBottom: '1px', minHeight: '6mm' }}
          >
            {primaryReceipt.customer_name}
          </span>
        </div>
        <div className="flex items-baseline">
          <span style={{ ...labelFont, width: '18mm', flexShrink: 0 }}>Contact:</span>
          <span 
            className="border-b border-black" 
            style={{ ...dataFont, width: '38mm', paddingBottom: '1px', minHeight: '6mm' }}
          >
            {primaryReceipt.customer_phone}
          </span>
          <span style={{ ...labelFont, marginLeft: '6mm', width: '10mm', flexShrink: 0 }}>PW:</span>
          <span 
            className="flex-1 border-b border-black" 
            style={{ ...dataFont, paddingBottom: '1px', minHeight: '6mm' }}
          >
            {firstPassword}
          </span>
        </div>
      </div>

      {/* Devices Table */}
      <table 
        className="w-full border-collapse" 
        style={{ 
          marginBottom: '4mm',
          fontSize: '11pt',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ ...labelFont, border: '1px solid #000', padding: '2.5mm 1.5mm', textAlign: 'center', width: '9mm' }}>S.N</th>
            <th style={{ ...labelFont, border: '1px solid #000', padding: '2.5mm 1.5mm', textAlign: 'center', width: '30mm' }}>Particulars</th>
            <th style={{ ...labelFont, border: '1px solid #000', padding: '2.5mm 1.5mm', textAlign: 'center', width: '40mm' }}>Problem</th>
            <th style={{ ...labelFont, border: '1px solid #000', padding: '2.5mm 1.5mm', textAlign: 'center', width: '30mm' }}>Model NO.</th>
            <th style={{ ...labelFont, border: '1px solid #000', padding: '2.5mm 1.5mm', textAlign: 'center', width: '30mm' }}>Serial No.</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={receipt.id}>
              <td style={{ ...dataFont, border: '1px solid #000', padding: '2.5mm 1.5mm', textAlign: 'center', height: '14mm', verticalAlign: 'top' }}>
                {index + 1}
              </td>
              <td style={{ ...dataFont, border: '1px solid #000', padding: '2.5mm 1.5mm', verticalAlign: 'top', textTransform: 'capitalize' }}>
                {receipt.device_type}
                {receipt.accessories && <span style={{ display: 'block', fontSize: '9pt', color: '#555' }}>({receipt.accessories})</span>}
              </td>
              <td style={{ ...dataFont, border: '1px solid #000', padding: '2.5mm 1.5mm', verticalAlign: 'top', fontSize: '10pt' }}>
                {receipt.problem_description}
              </td>
              <td style={{ ...dataFont, border: '1px solid #000', padding: '2.5mm 1.5mm', verticalAlign: 'top', fontSize: '10pt' }}>
                {receipt.device_model || ''}
              </td>
              <td style={{ ...dataFont, border: '1px solid #000', padding: '2.5mm 1.5mm', verticalAlign: 'top', fontSize: '10pt' }}>
                {receipt.serial_number || ''}
              </td>
            </tr>
          ))}
          {receipts.length < 3 && Array.from({ length: 3 - receipts.length }).map((_, i) => (
            <tr key={`empty-${i}`}>
              <td style={{ border: '1px solid #000', padding: '2.5mm 1.5mm', height: '14mm' }}></td>
              <td style={{ border: '1px solid #000', padding: '2.5mm 1.5mm' }}></td>
              <td style={{ border: '1px solid #000', padding: '2.5mm 1.5mm' }}></td>
              <td style={{ border: '1px solid #000', padding: '2.5mm 1.5mm' }}></td>
              <td style={{ border: '1px solid #000', padding: '2.5mm 1.5mm' }}></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Terms & Conditions */}
      <div className="text-center" style={{ fontSize: '11pt', lineHeight: 1.5, marginBottom: '3mm' }}>
        <p style={{ margin: 0 }}>मर्मतका लागि छाडिएको सामान २ महिनासम्म लिन नआएमा हराए वा बिग्रिएमा त्यसको</p>
        <p style={{ margin: 0 }}>जिम्मेवाही कम्पनीले लिने छैन।</p>
      </div>

      {/* VAT Notice */}
      <div className="text-center" style={{ marginBottom: '5mm' }}>
        <p style={{ ...labelFont, fontSize: '13pt', margin: 0 }}>
          मर्मत खर्चमा अतिरिक्त मूल्य अभिवृद्धि कर (VAT) लाग्नेछ।
        </p>
      </div>

      {/* Signature Section */}
      <div className="flex justify-center" style={{ marginBottom: '4mm' }}>
        <div className="text-center">
          <div style={{ height: '14mm' }}></div>
          <div style={{ width: '55mm', borderTop: '1px solid #000' }}></div>
          <span style={{ ...labelFont, fontSize: '11pt' }}>For : MKTN</span>
        </div>
      </div>

      {/* Spacer to push bottom content down */}
      <div style={{ flex: 1 }}></div>

      {/* Service Description with horizontal line */}
      <div className="text-center" style={{ marginBottom: '4mm' }}>
        <p style={{ 
          ...labelFont, 
          fontSize: '11pt', 
          margin: 0, 
          letterSpacing: '0.5px',
          textAlign: 'justify',
          textAlignLast: 'center'
        }}>
          Laptop, Desktop, Projector, Printer and all kinds of computer
        </p>
        <div style={{ 
          width: '100%', 
          height: '1px', 
          backgroundColor: '#000', 
          margin: '2mm 0'
        }}></div>
        <p style={{ 
          ...labelFont, 
          fontSize: '12pt', 
          margin: 0,
          letterSpacing: '1px'
        }}>
          Accessories maintenance and sales
        </p>
      </div>

      {/* Return Slip Notice */}
      <div className="text-center" style={{ marginBottom: '3mm' }}>
        <p style={{ 
          ...headerFont, 
          fontSize: '16pt', 
          fontWeight: 900,
          margin: 0,
          padding: '3mm 6mm',
          border: '3px solid #000',
          display: 'inline-block',
          letterSpacing: '2px'
        }}>
          PLEASE RETURN THIS SLIP
        </p>
      </div>
    </div>
  );
}
