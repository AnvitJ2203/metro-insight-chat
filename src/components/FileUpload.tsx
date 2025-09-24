import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUpload: (documents: any[]) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF files only.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate FastAPI upload
      const formData = new FormData();
      pdfFiles.forEach(file => formData.append('files', file));

      // Mock API call - replace with actual FastAPI endpoint
      // const response = await fetch('/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      // Simulate successful upload
      setTimeout(() => {
        const mockDocuments = pdfFiles.map((file, index) => ({
          id: Date.now() + index,
          name: file.name,
          size: file.size,
          type: 'PDF',
          uploadDate: new Date().toISOString(),
          summary: `Auto-generated summary for ${file.name}`,
        }));

        onUpload(mockDocuments);
        setIsUploading(false);
        
        toast({
          title: "Upload successful",
          description: `${pdfFiles.length} document(s) uploaded successfully.`,
        });
      }, 2000);

    } catch (error) {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "Failed to upload documents. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          Drag & drop PDF files here
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          or click to browse
        </p>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Choose Files"}
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {isUploading && (
        <div className="text-center text-sm text-muted-foreground">
          Processing documents...
        </div>
      )}
    </div>
  );
}