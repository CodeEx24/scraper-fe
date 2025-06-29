import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Search } from 'lucide-react';
import type { FC } from 'react';

interface QueryInputProps {
  query: string;
  setQuery: (q: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}

export const QueryInput: FC<QueryInputProps> = ({
  query,
  setQuery,
  isLoading,
  onSubmit,
  onClear,
}) => (
  <form onSubmit={onSubmit} className="flex gap-2">
    <Input
      placeholder="What kind of product are you looking for?"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      disabled={isLoading}
      className="flex-1"
    />
    <Button type="submit" disabled={isLoading || !query.trim()}>
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <Search className="w-4 h-4 mr-2" />
          Ask
        </>
      )}
    </Button>
    {query && (
      <Button type="button" variant="outline" onClick={onClear}>
        Clear
      </Button>
    )}
  </form>
);
