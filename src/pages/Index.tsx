import { useState } from 'react';
import { Header } from '@/components/Header';
import { StatsCards } from '@/components/StatsCards';
import { SearchBar } from '@/components/SearchBar';
import { ReceiptList } from '@/components/ReceiptList';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { useReceipts } from '@/hooks/useReceipts';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: receipts, isLoading } = useReceipts(searchQuery || undefined);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">Manage customer device receipts</p>
          </div>
          <Button asChild size="lg">
            <Link to="/new">
              <Plus className="w-5 h-5 mr-2" />
              New Receipt
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Search & Recent Receipts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Recent Receipts</h3>
          </div>
          
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <ReceiptList receipts={receipts} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
