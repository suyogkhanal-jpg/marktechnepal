import { Monitor, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-elevated no-print">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-lg">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Marine Trading</h1>
              <p className="text-xs text-primary-foreground/70">Customer Receipt Management</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary-foreground/70 hidden sm:block">
              Entire IT Solution in a single destination
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
