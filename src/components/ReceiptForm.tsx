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

const formSchema = z.object({
  customer_name: z.string().min(1, 'Customer name is required').max(100),
  customer_phone: z.string().min(1, 'Phone number is required').max(20),
  customer_email: z.string().email('Invalid email').optional().or(z.literal('')),
  device_type: z.string().min(1, 'Device type is required'),
  device_model: z.string().optional(),
  serial_number: z.string().optional(),
  accessories: z.string().optional(),
  problem_description: z.string().min(1, 'Problem description is required').max(1000),
  repair_notes: z.string().optional(),
  estimated_delivery_date: z.string().optional(),
  device_password: z.string().optional(),
});

interface ReceiptFormProps {
  onSuccess?: (receiptId: string) => void;
}

export function ReceiptForm({ onSuccess }: ReceiptFormProps) {
  const createReceipt = useCreateReceipt();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReceiptFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      device_type: '',
    },
  });

  const onSubmit = async (data: ReceiptFormData) => {
    const result = await createReceipt.mutateAsync(data);
    reset();
    onSuccess?.(result.id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Information */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="customer_name">Customer Name *</Label>
            <Input
              id="customer_name"
              {...register('customer_name')}
              placeholder="Enter customer name"
              className={errors.customer_name ? 'border-destructive' : ''}
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
              placeholder="Enter phone number"
              className={errors.customer_phone ? 'border-destructive' : ''}
            />
            {errors.customer_phone && (
              <p className="text-xs text-destructive">{errors.customer_phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer_email">Email (Optional)</Label>
            <Input
              id="customer_email"
              type="email"
              {...register('customer_email')}
              placeholder="Enter email address"
              className={errors.customer_email ? 'border-destructive' : ''}
            />
            {errors.customer_email && (
              <p className="text-xs text-destructive">{errors.customer_email.message}</p>
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
            <Label htmlFor="device_type">Device Type *</Label>
            <Select onValueChange={(value) => setValue('device_type', value)}>
              <SelectTrigger className={errors.device_type ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select type" />
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
            <Label htmlFor="device_model">Model</Label>
            <Input
              id="device_model"
              {...register('device_model')}
              placeholder="e.g., Dell Inspiron 15"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serial_number">Serial Number</Label>
            <Input
              id="serial_number"
              {...register('serial_number')}
              placeholder="Enter serial number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="device_password">User Password/Lock</Label>
            <Input
              id="device_password"
              {...register('device_password')}
              placeholder="Device password"
            />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-4">
            <Label htmlFor="accessories">Accessories</Label>
            <Input
              id="accessories"
              {...register('accessories')}
              placeholder="e.g., Charger, Mouse, Bag"
            />
          </div>
        </CardContent>
      </Card>

      {/* Problem & Notes */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            Problem & Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="problem_description">Problem Description *</Label>
            <Textarea
              id="problem_description"
              {...register('problem_description')}
              placeholder="Describe the issue..."
              rows={4}
              className={errors.problem_description ? 'border-destructive' : ''}
            />
            {errors.problem_description && (
              <p className="text-xs text-destructive">{errors.problem_description.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="repair_notes">Repair Notes</Label>
            <Textarea
              id="repair_notes"
              {...register('repair_notes')}
              placeholder="Additional notes..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated_delivery_date">Estimated Delivery Date</Label>
            <Input
              id="estimated_delivery_date"
              type="date"
              {...register('estimated_delivery_date')}
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
