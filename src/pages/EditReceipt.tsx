import { useNavigate, useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useReceipt, useUpdateReceipt } from '@/hooks/useReceipts';
import { ArrowLeft, Loader2, Save, User, Laptop, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  customer_name: z.string().min(1, 'Customer name is required').max(100),
  customer_phone: z.string().min(1, 'Phone number is required').max(20),
  customer_email: z.string().optional(),
  device_type: z.string().min(1, 'Device type is required'),
  device_model: z.string().optional(),
  serial_number: z.string().optional(),
  accessories: z.string().optional(),
  problem_description: z.string().min(1, 'Problem description is required').max(1000),
  repair_notes: z.string().optional(),
  estimated_delivery_date: z.string().optional(),
  device_password: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditReceipt() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: receipt, isLoading } = useReceipt(id);
  const updateReceipt = useUpdateReceipt();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const deviceType = watch('device_type');

  useEffect(() => {
    if (receipt) {
      reset({
        customer_name: receipt.customer_name,
        customer_phone: receipt.customer_phone,
        customer_email: receipt.customer_email || '',
        device_type: receipt.device_type,
        device_model: receipt.device_model || '',
        serial_number: receipt.serial_number || '',
        accessories: receipt.accessories || '',
        problem_description: receipt.problem_description,
        repair_notes: receipt.repair_notes || '',
        estimated_delivery_date: receipt.estimated_delivery_date || '',
        device_password: receipt.device_password || '',
      });
    }
  }, [receipt, reset]);

  const onSubmit = async (data: FormData) => {
    if (!id) return;
    
    await updateReceipt.mutateAsync({
      id,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      customer_email: data.customer_email || null,
      device_type: data.device_type,
      device_model: data.device_model || null,
      serial_number: data.serial_number || null,
      accessories: data.accessories || null,
      problem_description: data.problem_description,
      repair_notes: data.repair_notes || null,
      estimated_delivery_date: data.estimated_delivery_date || null,
      device_password: data.device_password || null,
    });
    
    navigate(`/receipt/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <p className="text-muted-foreground">Receipt not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/receipt/${id}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Edit Receipt #{receipt.receipt_number}</h2>
            <p className="text-muted-foreground">Update receipt information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="customer_email">Email (optional)</Label>
                <Input
                  id="customer_email"
                  type="email"
                  {...register('customer_email')}
                  placeholder="Enter email address"
                />
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
                <Select 
                  value={deviceType} 
                  onValueChange={(value) => setValue('device_type', value)}
                >
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

          {/* Problem & Repair Notes */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-primary" />
                Problem & Repair Details
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
                  placeholder="Add repair notes..."
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

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" size="lg" asChild>
              <Link to={`/receipt/${id}`}>Cancel</Link>
            </Button>
            <Button type="submit" size="lg" disabled={updateReceipt.isPending}>
              {updateReceipt.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
