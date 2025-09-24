import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Calendar, Target } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  documentName: string;
  documentType: string;
  relevanceScore: number;
  lastModified: string;
  pageNumber?: number;
}

export function SearchTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      // Mock API call - replace with actual FastAPI endpoint
      // const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
      // const data = await response.json();

      // Mock search results
      setTimeout(() => {
        const mockResults: SearchResult[] = query.toLowerCase().includes('safety') 
          ? [
              {
                id: '1',
                title: 'Safety Protocol Update',
                content: 'New safety protocols have been implemented for emergency brake systems. All trains must undergo mandatory safety checks before operational deployment...',
                documentName: 'Safety_Bulletin_2024_001.pdf',
                documentType: 'Safety Bulletin',
                relevanceScore: 0.95,
                lastModified: '2024-01-15',
                pageNumber: 1,
              },
              {
                id: '2',
                title: 'Emergency Brake System Inspection',
                content: 'Inspection report for Metro Rail 123 emergency brake system. Issues identified during routine check require immediate attention...',
                documentName: 'Inspection_Report_MR123.pdf',
                documentType: 'Inspection Report',
                relevanceScore: 0.87,
                lastModified: '2024-01-12',
                pageNumber: 3,
              },
            ]
          : query.toLowerCase().includes('maintenance')
          ? [
              {
                id: '3',
                title: 'Scheduled Maintenance Guidelines',
                content: 'Comprehensive maintenance schedule for Q1 2024. All trains require quarterly inspections as per KMRL maintenance protocols...',
                documentName: 'Maintenance_Schedule_Q1_2024.pdf',
                documentType: 'Maintenance Guide',
                relevanceScore: 0.92,
                lastModified: '2024-01-10',
                pageNumber: 2,
              },
            ]
          : [
              {
                id: '4',
                title: 'General Operations Manual',
                content: 'Standard operating procedures for Metro Rail operations. This document covers basic operational guidelines and best practices...',
                documentName: 'Operations_Manual_2024.pdf',
                documentType: 'Operations Manual',
                relevanceScore: 0.68,
                lastModified: '2024-01-08',
                pageNumber: 1,
              },
            ];

        setResults(mockResults);
        setIsSearching(false);
      }, 1500);

    } catch (error) {
      setIsSearching(false);
      console.error('Search failed:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 0.9) return 'bg-green-100 text-green-800';
    if (score >= 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">🔍 Search</h2>
        
        {/* Search Input */}
        <Card className="metro-card">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search across all documents (e.g., 'safety protocols', 'maintenance schedule')"
                className="flex-1 h-12"
                disabled={isSearching}
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
                variant="metro"
                className="h-12 px-6"
              >
                {isSearching ? (
                  <>Searching...</>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div>
          {isSearching ? (
            <Card className="metro-card">
              <CardContent className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Searching through documents...</p>
              </CardContent>
            </Card>
          ) : results.length === 0 ? (
            <Card className="metro-card">
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try searching with different keywords or upload more documents.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </div>
              
              {results.map((result) => (
                <Card key={result.id} className="metro-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-primary hover:text-primary-hover cursor-pointer">
                        {result.title}
                      </CardTitle>
                      <Badge className={getRelevanceColor(result.relevanceScore)}>
                        {Math.round(result.relevanceScore * 100)}% match
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {result.content}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{result.documentName}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(result.lastModified)}</span>
                      </div>
                      
                      {result.pageNumber && (
                        <div>
                          <span>Page {result.pageNumber}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {result.documentType}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}