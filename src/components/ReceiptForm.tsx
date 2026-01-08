import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateReceipt } from '@/hooks/useReceipts';
import { Loader2, Save, User, Laptop, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { CustomerAutocomplete } from '@/components/CustomerAutocomplete';
import { useRef, useState } from 'react';

interface ReceiptFormProps {
  onSuccess?: (receiptId: string) => void;
}

// Device name suggestions
const deviceSuggestions = [
  'Dell Laptop',
  'HP Laptop',
  'Lenovo Laptop',
  'Acer Laptop',
  'Asus Laptop',
  'MacBook',
  'Desktop PC',
  'Dell Monitor',
  'HP Monitor',
  'LG Monitor',
  'HP Printer',
  'Canon Printer',
  'Epson Printer',
  'Motherboard',
  'Gaming Laptop',
  'Workstation',
];

// Accessory options
const accessoryOptions = [
  'Charger',
  'Bag',
  'Mouse',
  'Keyboard',
  'Power Cable',
  'USB Cable',
];

// Device entry type
interface DeviceEntry {
  id: string;
  device_type: string;
  device_model: string;
  serial_number: string;
  has_password_lock: boolean;
  device_password: string;
  accessories: string[];
  problem_description: string;
  estimated_delivery_date: string;
}

const createEmptyDevice = (): DeviceEntry => ({
  id: crypto.randomUUID(),
  device_type: '',
  device_model: '',
  serial_number: '',
  has_password_lock: false,
  device_password: '',
  accessories: [],
  problem_description: '',
  estimated_delivery_date: '',
});

export function ReceiptForm({ onSuccess }: ReceiptFormProps) {
  const createReceipt = useCreateReceipt();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [devices, setDevices] = useState<DeviceEntry[]>([createEmptyDevice()]);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deviceSuggestions_, setDeviceSuggestions_] = useState<Record<string, string[]>>({});
  const [suggestionOpen, setSuggestionOpen] = useState<Record<string, boolean>>({});

  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSelectCustomer = (name: string, phone: string) => {
    setCustomerName(name);
    setCustomerPhone(phone);
  };

  const updateDevice = (deviceId: string, field: keyof DeviceEntry, value: any) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId ? { ...d, [field]: value } : d
    ));
  };

  const handleDeviceNameChange = (deviceId: string, value: string) => {
    updateDevice(deviceId, 'device_type', value);
    if (value.length > 0) {
      const filtered = deviceSuggestions.filter(d =>
        d.toLowerCase().includes(value.toLowerCase())
      );
      setDeviceSuggestions_(prev => ({ ...prev, [deviceId]: filtered }));
      setSuggestionOpen(prev => ({ ...prev, [deviceId]: filtered.length > 0 }));
    } else {
      setSuggestionOpen(prev => ({ ...prev, [deviceId]: false }));
    }
  };

  const selectDeviceSuggestion = (deviceId: string, suggestion: string) => {
    updateDevice(deviceId, 'device_type', suggestion);
    setSuggestionOpen(prev => ({ ...prev, [deviceId]: false }));
  };

  const handleAccessoryToggle = (deviceId: string, accessory: string, checked: boolean) => {
    setDevices(prev => prev.map(d => {
      if (d.id !== deviceId) return d;
      const newAccessories = checked
        ? [...d.accessories, accessory]
        : d.accessories.filter(a => a !== accessory);
      return { ...d, accessories: newAccessories };
    }));
  };

  const addDevice = () => {
    setDevices(prev => [...prev, createEmptyDevice()]);
  };

  const removeDevice = (deviceId: string) => {
    if (devices.length > 1) {
      setDevices(prev => prev.filter(d => d.id !== deviceId));
    }
  };

  const togglePasswordVisibility = (deviceId: string) => {
    setShowPasswords(prev => ({ ...prev, [deviceId]: !prev[deviceId] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a receipt for each device
      for (let i = 0; i < devices.length; i++) {
        const device = devices[i];
        const submitData = {
          customer_name: customerName || '',
          customer_phone: customerPhone || '',
          device_type: device.device_type || '',
          device_model: device.device_model || undefined,
          serial_number: device.serial_number || undefined,
          problem_description: device.problem_description || '',
          accessories: device.accessories.length > 0 ? device.accessories.join(', ') : null,
          device_password: device.has_password_lock ? device.device_password : null,
          estimated_delivery_date: device.estimated_delivery_date || undefined,
        };

        const result = await createReceipt.mutateAsync(submitData);
        
        // Only call onSuccess for the last device
        if (i === devices.length - 1) {
          // Reset form
          setCustomerName('');
          setCustomerPhone('');
          setDevices([createEmptyDevice()]);
          setShowPasswords({});
          onSuccess?.(result.id);
        }
      }
    } catch (error) {
      console.error('Error creating receipt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="text-center py-4 border-b-2 border-primary">
        <h1 className="text-3xl font-bold text-primary tracking-wide">Marktech Nepal</h1>
        <p className="text-muted-foreground italic">Laptop & Computer Repair Center</p>
      </div>

      {/* Customer Information */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="customer_name">Customer Name</Label>
            <CustomerAutocomplete
              value={customerName}
              onChange={setCustomerName}
              onSelectCustomer={handleSelectCustomer}
              placeholder="Enter customer name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  phoneRef.current?.focus();
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer_phone">Phone Number</Label>
            <Input
              id="customer_phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              ref={phoneRef}
              placeholder="Enter phone number"
            />
          </div>
        </CardContent>
      </Card>

      {/* Device Sections */}
      {devices.map((device, index) => (
        <Card key={device.id} className="shadow-card border-2 border-primary/20">
          <CardHeader className="pb-4 bg-primary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Laptop className="w-5 h-5 text-primary" />
                Device {devices.length > 1 ? `#${index + 1}` : 'Details'}
              </CardTitle>
              {devices.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDevice(device.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {/* Device Name with Autocomplete */}
            <div className="space-y-2 relative">
              <Label>Device Name</Label>
              <Input
                value={device.device_type}
                onChange={(e) => handleDeviceNameChange(device.id, e.target.value)}
                placeholder="e.g., Dell Laptop, HP Printer"
                onBlur={() => setTimeout(() => setSuggestionOpen(prev => ({ ...prev, [device.id]: false })), 150)}
                autoComplete="off"
              />
              {suggestionOpen[device.id] && (deviceSuggestions_[device.id]?.length ?? 0) > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-auto">
                  {deviceSuggestions_[device.id].map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      onMouseDown={() => selectDeviceSuggestion(device.id, suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lock Checkbox with Password Field */}
            <div className="space-y-3 py-3 px-4 bg-muted/50 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`lock-${device.id}`}
                  checked={device.has_password_lock}
                  onCheckedChange={(checked) => updateDevice(device.id, 'has_password_lock', checked === true)}
                />
                <Label htmlFor={`lock-${device.id}`} className="text-sm font-medium cursor-pointer">
                  Lock (User Device Password)
                </Label>
              </div>
              
              {device.has_password_lock && (
                <div className="flex items-center gap-2 ml-7">
                  <div className="relative flex-1 max-w-xs">
                    <Input
                      type={showPasswords[device.id] ? 'text' : 'password'}
                      value={device.device_password}
                      onChange={(e) => updateDevice(device.id, 'device_password', e.target.value)}
                      placeholder="Enter device password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => togglePasswordVisibility(device.id)}
                    >
                      {showPasswords[device.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`show-pwd-${device.id}`}
                      checked={showPasswords[device.id] || false}
                      onCheckedChange={(checked) => setShowPasswords(prev => ({ ...prev, [device.id]: checked === true }))}
                    />
                    <Label htmlFor={`show-pwd-${device.id}`} className="text-xs cursor-pointer whitespace-nowrap">
                      Show Password
                    </Label>
                  </div>
                </div>
              )}
            </div>

            {/* Accessories Checkboxes */}
            <div className="space-y-3 py-3 px-4 bg-muted/50 rounded-lg border border-border/50">
              <Label className="text-sm font-medium">Accessories</Label>
              <div className="flex flex-wrap gap-4">
                {accessoryOptions.map((accessory) => (
                  <div key={accessory} className="flex items-center gap-2">
                    <Checkbox
                      id={`accessory-${device.id}-${accessory}`}
                      checked={device.accessories.includes(accessory)}
                      onCheckedChange={(checked) => handleAccessoryToggle(device.id, accessory, checked === true)}
                    />
                    <Label 
                      htmlFor={`accessory-${device.id}-${accessory}`} 
                      className="text-sm cursor-pointer"
                    >
                      {accessory}
                    </Label>
                  </div>
                ))}
              </div>
              {device.accessories.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                  Selected: {device.accessories.join(', ')}
                </p>
              )}
            </div>

            {/* Model Number */}
            <div className="space-y-2">
              <Label>Model Number</Label>
              <Input
                value={device.device_model}
                onChange={(e) => updateDevice(device.id, 'device_model', e.target.value)}
                placeholder="e.g., Inspiron 15 3520"
              />
            </div>

            {/* Serial Number */}
            <div className="space-y-2">
              <Label>Serial Number</Label>
              <Input
                value={device.serial_number}
                onChange={(e) => updateDevice(device.id, 'serial_number', e.target.value)}
                placeholder="Enter serial number"
              />
            </div>

            {/* Problem Description */}
            <div className="space-y-2">
              <Label>Problem Description</Label>
              <Textarea
                value={device.problem_description}
                onChange={(e) => updateDevice(device.id, 'problem_description', e.target.value)}
                placeholder="Describe the issue..."
                rows={4}
              />
            </div>

            {/* Estimated Delivery Date */}
            <div className="space-y-2 sm:max-w-xs">
              <Label>Estimated Delivery Date</Label>
              <Input
                type="date"
                value={device.estimated_delivery_date}
                onChange={(e) => updateDevice(device.id, 'estimated_delivery_date', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add Next Device & Submit */}
      <Card className="shadow-card border border-primary/30 bg-primary/5">
        <CardContent className="py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={addDevice}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Next Device
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {devices.length > 1 ? `Create ${devices.length} Receipts` : 'Create Receipt'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
