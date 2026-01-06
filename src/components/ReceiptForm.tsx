import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateReceipt } from '@/hooks/useReceipts';
import { ReceiptFormData } from '@/types/receipt';
import { Loader2, Save, User, Laptop } from 'lucide-react';
import { CustomerAutocomplete } from '@/components/CustomerAutocomplete';
import { useRef, KeyboardEvent, useState } from 'react';

const formSchema = z.object({
  customer_name: z.string().min(1, 'Customer name is required').max(100),
  customer_phone: z.string().min(1, 'Phone number is required').max(20),
  device_type: z.string().min(1, 'Device name is required'),
  device_model: z.string().optional(),
  serial_number: z.string().optional(),
  has_password_lock: z.boolean().optional(),
  has_accessories: z.boolean().optional(),
  problem_description: z.string().min(1, 'Problem description is required').max(1000),
  estimated_delivery_date: z.string().optional(),
});

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


export function ReceiptForm({ onSuccess }: ReceiptFormProps) {
  const createReceipt = useCreateReceipt();
  const [deviceSuggestionsOpen, setDeviceSuggestionsOpen] = useState(false);
  const [filteredDevices, setFilteredDevices] = useState<string[]>([]);

  // Refs for Enter key navigation
  const phoneRef = useRef<HTMLInputElement>(null);
  const deviceNameRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const serialRef = useRef<HTMLInputElement>(null);
  const problemRef = useRef<HTMLTextAreaElement>(null);
  const deliveryDateRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReceiptFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      device_type: '',
      has_password_lock: false,
      has_accessories: false,
    },
  });

  const customerName = watch('customer_name') || '';
  const deviceType = watch('device_type') || '';
  const hasPasswordLock = watch('has_password_lock') || false;
  const hasAccessories = watch('has_accessories') || false;

  const onSubmit = async (data: ReceiptFormData) => {
    const result = await createReceipt.mutateAsync(data);
    reset();
    onSuccess?.(result.id);
  };

  const handleSelectCustomer = (name: string, phone: string) => {
    setValue('customer_name', name);
    setValue('customer_phone', phone);
  };

  // Handle Enter key to move to next field
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, nextRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  // Handle device name input with suggestions
  const handleDeviceNameChange = (value: string) => {
    setValue('device_type', value);
    if (value.length > 0) {
      const filtered = deviceSuggestions.filter(d => 
        d.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDevices(filtered);
      setDeviceSuggestionsOpen(filtered.length > 0);
    } else {
      setDeviceSuggestionsOpen(false);
    }
  };

  const selectDeviceSuggestion = (suggestion: string) => {
    setValue('device_type', suggestion);
    setDeviceSuggestionsOpen(false);
    modelRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <Label htmlFor="customer_name">Customer Name *</Label>
            <CustomerAutocomplete
              value={customerName}
              onChange={(value) => setValue('customer_name', value)}
              onSelectCustomer={handleSelectCustomer}
              placeholder="Enter customer name"
              error={!!errors.customer_name}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  phoneRef.current?.focus();
                }
              }}
            />
            {errors.customer_name && (
              <p className="text-xs text-destructive">{errors.customer_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer_phone">Phone Number *</Label>
            <Input
              id="customer_phone"
              {...register('customer_phone')}
              ref={phoneRef}
              placeholder="Enter phone number"
              className={errors.customer_phone ? 'border-destructive' : ''}
              onKeyDown={(e) => handleKeyDown(e, deviceNameRef)}
            />
            {errors.customer_phone && (
              <p className="text-xs text-destructive">{errors.customer_phone.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Device Details - Single Grouped Block */}
      <Card className="shadow-card border-2 border-primary/20">
        <CardHeader className="pb-4 bg-primary/5">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Laptop className="w-5 h-5 text-primary" />
            Device Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {/* Device Name with Autocomplete */}
          <div className="space-y-2 relative">
            <Label htmlFor="device_type">Device Name *</Label>
            <Input
              id="device_type"
              ref={deviceNameRef}
              value={deviceType}
              onChange={(e) => handleDeviceNameChange(e.target.value)}
              placeholder="e.g., Dell Laptop, HP Printer"
              className={errors.device_type ? 'border-destructive' : ''}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setDeviceSuggestionsOpen(false);
                  modelRef.current?.focus();
                }
                if (e.key === 'Escape') {
                  setDeviceSuggestionsOpen(false);
                }
              }}
              onBlur={() => setTimeout(() => setDeviceSuggestionsOpen(false), 150)}
              autoComplete="off"
            />
            {deviceSuggestionsOpen && filteredDevices.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-auto">
                {filteredDevices.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    onMouseDown={() => selectDeviceSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {errors.device_type && (
              <p className="text-xs text-destructive">{errors.device_type.message}</p>
            )}
          </div>

          {/* Inline Indicators - Checkboxes side by side */}
          <div className="flex items-center gap-6 py-2 px-3 bg-muted/50 rounded-md border border-border/50">
            <div className="flex items-center gap-2">
              <Checkbox
                id="has_password_lock"
                checked={hasPasswordLock}
                onCheckedChange={(checked) => setValue('has_password_lock', checked === true)}
              />
              <Label htmlFor="has_password_lock" className="text-sm font-medium cursor-pointer">
                Password Lock
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="has_accessories"
                checked={hasAccessories}
                onCheckedChange={(checked) => setValue('has_accessories', checked === true)}
              />
              <Label htmlFor="has_accessories" className="text-sm font-medium cursor-pointer">
                Accessories
              </Label>
            </div>
          </div>

          {/* Model Number */}
          <div className="space-y-2">
            <Label htmlFor="device_model">Model Number</Label>
            <Input
              id="device_model"
              {...register('device_model')}
              ref={modelRef}
              placeholder="e.g., Inspiron 15 3520"
              onKeyDown={(e) => handleKeyDown(e, serialRef)}
            />
          </div>

          {/* Serial Number */}
          <div className="space-y-2">
            <Label htmlFor="serial_number">Serial Number</Label>
            <Input
              id="serial_number"
              {...register('serial_number')}
              ref={serialRef}
              placeholder="Enter serial number"
              onKeyDown={(e) => handleKeyDown(e, problemRef)}
            />
          </div>

          {/* Problem Description */}
          <div className="space-y-2">
            <Label htmlFor="problem_description">Problem Description *</Label>
            <Textarea
              id="problem_description"
              {...register('problem_description')}
              ref={problemRef}
              placeholder="Describe the issue in detail..."
              rows={4}
              className={errors.problem_description ? 'border-destructive' : ''}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  deliveryDateRef.current?.focus();
                }
              }}
            />
            {errors.problem_description && (
              <p className="text-xs text-destructive">{errors.problem_description.message}</p>
            )}
          </div>

          {/* Estimated Delivery Date */}
          <div className="space-y-2 sm:max-w-xs">
            <Label htmlFor="estimated_delivery_date">Estimated Delivery Date</Label>
            <Input
              id="estimated_delivery_date"
              type="date"
              {...register('estimated_delivery_date')}
              ref={deliveryDateRef}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={createReceipt.isPending}>
          {createReceipt.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Create Receipt
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
