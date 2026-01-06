import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateReceipt } from '@/hooks/useReceipts';
import { ReceiptFormData } from '@/types/receipt';
import { Loader2, Save, User, Laptop, FileText } from 'lucide-react';
import { CustomerAutocomplete } from '@/components/CustomerAutocomplete';
import { useRef, KeyboardEvent } from 'react';

const formSchema = z.object({
  customer_name: z.string().min(1, 'Customer name is required').max(100),
  customer_phone: z.string().min(1, 'Phone number is required').max(20),
  device_type: z.string().min(1, 'Device type is required'),
  device_model: z.string().optional(),
  serial_number: z.string().optional(),
  accessories: z.string().optional(),
  problem_description: z.string().min(1, 'Problem description is required').max(1000),
  estimated_delivery_date: z.string().optional(),
  device_password: z.string().optional(),
});

interface ReceiptFormProps {
  onSuccess?: (receiptId: string) => void;
}

export function ReceiptForm({ onSuccess }: ReceiptFormProps) {
  const createReceipt = useCreateReceipt();

  // Refs for Enter key navigation
  const phoneRef = useRef<HTMLInputElement>(null);
  const deviceTypeRef = useRef<HTMLButtonElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const serialRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const accessoriesRef = useRef<HTMLInputElement>(null);
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
    },
  });

  const customerName = watch('customer_name') || '';

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
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, nextRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current?.focus();
    }
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
              onKeyDown={(e) => handleKeyDown(e, deviceTypeRef)}
            />
            {errors.customer_phone && (
              <p className="text-xs text-destructive">{errors.customer_phone.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Device Information */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Laptop className="w-5 h-5 text-primary" />
            Device Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="device_type">Device Name *</Label>
            <Select onValueChange={(value) => {
              setValue('device_type', value);
              setTimeout(() => modelRef.current?.focus(), 100);
            }}>
              <SelectTrigger 
                ref={deviceTypeRef}
                className={errors.device_type ? 'border-destructive' : ''}
              >
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="desktop">Desktop PC</SelectItem>
                <SelectItem value="monitor">Monitor</SelectItem>
                <SelectItem value="printer">Printer</SelectItem>
                <SelectItem value="motherboard">Motherboard</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.device_type && (
              <p className="text-xs text-destructive">{errors.device_type.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="device_model">Model Number</Label>
            <Input
              id="device_model"
              {...register('device_model')}
              ref={modelRef}
              placeholder="e.g., Dell Inspiron 15"
              onKeyDown={(e) => handleKeyDown(e, serialRef)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serial_number">Serial Number</Label>
            <Input
              id="serial_number"
              {...register('serial_number')}
              ref={serialRef}
              placeholder="Enter serial number"
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="device_password">User Password/Lock</Label>
            <Input
              id="device_password"
              {...register('device_password')}
              ref={passwordRef}
              placeholder="Device password"
              onKeyDown={(e) => handleKeyDown(e, accessoriesRef)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-4">
            <Label htmlFor="accessories">Accessories</Label>
            <Input
              id="accessories"
              {...register('accessories')}
              ref={accessoriesRef}
              placeholder="e.g., Charger, Mouse, Bag"
              onKeyDown={(e) => handleKeyDown(e, problemRef)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Problem Description */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            Problem Description / Remarks
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="problem_description">Problem Description *</Label>
            <Textarea
              id="problem_description"
              {...register('problem_description')}
              ref={problemRef}
              placeholder="Describe the issue..."
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
          <div className="space-y-2">
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
