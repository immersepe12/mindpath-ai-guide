import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertCircle, CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react';

interface DebugEntry {
  key: string;
  type: 'submission' | 'success' | 'error' | 'final' | 'visit' | 'direct_access';
  data: any;
  timestamp: string;
}

const LeadDebugger = () => {
  const [debugEntries, setDebugEntries] = useState<DebugEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadDebugData();
  }, []);

  const loadDebugData = () => {
    const entries: DebugEntry[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('lead_') || key.startsWith('thank_you_') || key.startsWith('direct_access_'))) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          const type = key.includes('submission') ? 'submission' :
                      key.includes('success') ? 'success' :
                      key.includes('error') ? 'error' :
                      key.includes('final') ? 'final' :
                      key.includes('thank_you') ? 'visit' :
                      key.includes('direct_access') ? 'direct_access' : 'submission';
          
          entries.push({
            key,
            type,
            data,
            timestamp: data.timestamp || data.completedAt || data.errorAt || new Date().toISOString()
          });
        } catch (e) {
          console.warn('Could not parse debug entry:', key, e);
        }
      }
    }
    
    // Sort by timestamp (newest first)
    entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setDebugEntries(entries);
  };

  const clearDebugData = () => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('lead_') || key.startsWith('thank_you_') || key.startsWith('direct_access_'))) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    setDebugEntries([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'direct_access':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Eye className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      submission: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      final: 'bg-purple-100 text-purple-800',
      visit: 'bg-gray-100 text-gray-800',
      direct_access: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors]}>
        {type.replace('_', ' ')}
      </Badge>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Only show in development or when manually enabled
  if (!isVisible && !window.location.hostname.includes('localhost') && !window.location.search.includes('debug=true')) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100"
      >
        Debug Leads
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full">
      <Card className="shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            Lead Submission Debug
            <div className="flex gap-2">
              <Button onClick={loadDebugData} variant="outline" size="sm">
                Refresh
              </Button>
              <Button onClick={clearDebugData} variant="outline" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button onClick={() => setIsVisible(false)} variant="outline" size="sm">
                ×
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto space-y-3">
          {debugEntries.length === 0 ? (
            <p className="text-sm text-gray-500">No debug entries found</p>
          ) : (
            debugEntries.map((entry, index) => (
              <div key={index} className="border rounded p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(entry.type)}
                    {getTypeBadge(entry.type)}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
                
                <div className="text-sm space-y-1">
                  {entry.data.email && (
                    <div><strong>Email:</strong> {entry.data.email}</div>
                  )}
                  {entry.data.firstName && (
                    <div><strong>Name:</strong> {entry.data.firstName}</div>
                  )}
                  {entry.data.freshworksSuccess !== undefined && (
                    <div className="flex items-center gap-2">
                      <strong>Freshworks:</strong>
                      {entry.data.freshworksSuccess ? (
                        <Badge className="bg-green-100 text-green-800">Success</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Failed</Badge>
                      )}
                    </div>
                  )}
                  {entry.data.freshworksMethod && (
                    <div><strong>Method:</strong> {entry.data.freshworksMethod}</div>
                  )}
                  {entry.data.error && (
                    <div className="text-red-600"><strong>Error:</strong> {entry.data.error}</div>
                  )}
                  {entry.data.accessType && (
                    <div><strong>Access:</strong> {entry.data.accessType}</div>
                  )}
                  {entry.data.hasConversionParams !== undefined && (
                    <div><strong>Valid Conversion:</strong> {entry.data.hasConversionParams ? 'Yes' : 'No'}</div>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDebugger;