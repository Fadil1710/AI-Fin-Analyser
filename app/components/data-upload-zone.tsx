"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle, CheckCircle, X } from "lucide-react"

interface DataUploadZoneProps {
  onFileUpload: (files: File[]) => void
  acceptedTypes: string[]
  maxFiles: number
}

export function DataUploadZone({ onFileUpload, acceptedTypes, maxFiles }: DataUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    processFiles(files)
  }, [])

  const processFiles = (files: File[]) => {
    setUploadStatus("uploading")
    setErrorMessage("")

    // Validate file types
    const validFiles = files.filter((file) =>
      acceptedTypes.some((type) => file.name.toLowerCase().endsWith(type.toLowerCase())),
    )

    if (validFiles.length === 0) {
      setUploadStatus("error")
      setErrorMessage("No valid files found. Please check file types.")
      setTimeout(() => setUploadStatus("idle"), 3000)
      return
    }

    if (validFiles.length > maxFiles) {
      setUploadStatus("error")
      setErrorMessage(`Too many files. Maximum ${maxFiles} files allowed.`)
      setTimeout(() => setUploadStatus("idle"), 3000)
      return
    }

    // Simulate file validation and upload
    setTimeout(() => {
      onFileUpload(validFiles)
      setUploadStatus("success")
      setTimeout(() => setUploadStatus("idle"), 2000)
    }, 1500)
  }

  const clearStatus = () => {
    setUploadStatus("idle")
    setErrorMessage("")
  }

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
      } ${uploadStatus === "success" ? "border-green-400 bg-green-50" : ""}
    ${uploadStatus === "error" ? "border-red-400 bg-red-50" : ""}`}
    >
      <CardContent
        className="p-8 text-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          {uploadStatus === "uploading" && (
            <div className="animate-spin mx-auto">
              <Upload className="h-12 w-12 text-blue-600" />
            </div>
          )}

          {uploadStatus === "success" && <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />}

          {uploadStatus === "error" && (
            <div className="flex items-center justify-center space-x-2">
              <AlertCircle className="h-12 w-12 text-red-600" />
              <Button variant="ghost" size="sm" onClick={clearStatus}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {uploadStatus === "idle" && <Upload className="h-12 w-12 text-gray-400 mx-auto" />}

          <div>
            {uploadStatus === "uploading" && (
              <p className="text-lg font-medium text-blue-600">Uploading and validating files...</p>
            )}

            {uploadStatus === "success" && (
              <p className="text-lg font-medium text-green-600">Files uploaded successfully!</p>
            )}

            {uploadStatus === "error" && (
              <div>
                <p className="text-lg font-medium text-red-600">Upload failed</p>
                <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
              </div>
            )}

            {uploadStatus === "idle" && (
              <>
                <p className="text-lg font-medium text-gray-900">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-gray-600">
                  Accepted formats: {acceptedTypes.join(", ")} • Max {maxFiles} files
                </p>
              </>
            )}
          </div>

          {uploadStatus === "idle" && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedTypes.join(",")}
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                className="cursor-pointer bg-transparent"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
