"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileVideo, X, CheckCircle, Settings, Play, Download, Loader2, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { videoConverter, type ConversionProgress } from "@/lib/video-converter"

interface UploadedFile {
  file: File
  id: string
  status: "pending" | "uploading" | "ready" | "converting" | "completed" | "error"
  inputFormat?: string
  outputFormat?: string
  quality?: string
  progress?: number
  convertedData?: Uint8Array
  error?: string
}

const VIDEO_FORMATS = [
  { value: "mp4", label: "MP4", description: "Most compatible format", icon: "🎬" },
  { value: "avi", label: "AVI", description: "High quality, larger files", icon: "🎞️" },
  { value: "mov", label: "MOV", description: "Apple QuickTime format", icon: "🍎" },
  { value: "wmv", label: "WMV", description: "Windows Media format", icon: "🪟" },
  { value: "webm", label: "WebM", description: "Web optimized format", icon: "🌐" },
  { value: "mkv", label: "MKV", description: "Open source container", icon: "📦" },
  { value: "flv", label: "FLV", description: "Flash video format", icon: "⚡" },
  { value: "m4v", label: "M4V", description: "iTunes compatible format", icon: "🎵" },
]

const QUALITY_OPTIONS = [
  { value: "high", label: "High Quality", description: "Best quality, larger file size", icon: "💎" },
  { value: "medium", label: "Medium Quality", description: "Balanced quality and size", icon: "⚖️" },
  { value: "low", label: "Low Quality", description: "Smaller file size, lower quality", icon: "📱" },
]

export default function VideoConverter() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isConverting, setIsConverting] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase()
      return {
        file,
        id: Math.random().toString(36).substr(2, 9),
        status: "ready" as const,
        inputFormat: extension,
        outputFormat: "mp4",
        quality: "medium",
      }
    })
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv", ".m4v"],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const updateFileSettings = (id: string, field: keyof UploadedFile, value: string) => {
    setUploadedFiles((prev) => prev.map((file) => (file.id === id ? { ...file, [field]: value } : file)))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFormatLabel = (format: string) => {
    return VIDEO_FORMATS.find((f) => f.value === format)?.label || format.toUpperCase()
  }

  const getFormatIcon = (format: string) => {
    return VIDEO_FORMATS.find((f) => f.value === format)?.icon || "🎬"
  }

  const canConvert = uploadedFiles.length > 0 && uploadedFiles.every((file) => file.outputFormat)

  const startConversion = async () => {
    if (!canConvert || isConverting) return

    setIsConverting(true)

    for (const file of uploadedFiles) {
      if (file.status !== "ready") continue

      try {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, status: "converting", progress: 0 } : f)),
        )

        const convertedData = await videoConverter.convertVideo(
          file.file,
          file.outputFormat!,
          file.quality!,
          (progress: ConversionProgress) => {
            setUploadedFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress: progress.progress } : f)))
          },
        )

        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, status: "completed", progress: 100, convertedData } : f)),
        )
      } catch (error) {
        console.error("Conversion error:", error)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, status: "error", error: "Conversion failed" } : f)),
        )
      }
    }

    setIsConverting(false)
  }

  const downloadFile = (file: UploadedFile) => {
    if (!file.convertedData) return

    const blob = new Blob([file.convertedData], {
      type: `video/${file.outputFormat}`,
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${file.file.name.split(".")[0]}.${file.outputFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <header className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-primary">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">VideoConvert Pro</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Transform your videos with professional-grade conversion. Fast, reliable, and beautifully simple.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 text-white/80">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">High Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span className="font-medium">Professional Tools</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Upload Section */}
        <Card className="mb-12 border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="font-serif text-3xl text-foreground mb-3">Upload Your Videos</CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drag and drop your video files or click to browse. We support all major formats including MP4, AVI, MOV,
              WMV, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={cn(
                "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group",
                isDragActive
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]",
                isConverting && "pointer-events-none opacity-50",
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-6">
                <div
                  className={cn(
                    "p-6 rounded-full transition-all duration-300",
                    isDragActive
                      ? "bg-primary text-white scale-110"
                      : "bg-primary/10 text-primary group-hover:bg-primary/20",
                  )}
                >
                  <Upload className="h-12 w-12" />
                </div>
                {isDragActive ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-primary">Drop your videos here!</p>
                    <p className="text-muted-foreground">Release to upload</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-2xl font-semibold text-foreground">Drag & drop videos here</p>
                    <p className="text-muted-foreground">or click to select files from your computer</p>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isConverting}
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {uploadedFiles.length > 0 && (
          <Card className="mb-12 border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileVideo className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-serif text-2xl text-foreground">Configure Conversion</CardTitle>
                  <CardDescription className="text-lg">
                    {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""} ready for processing
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {uploadedFiles.map((uploadedFile) => (
                  <div
                    key={uploadedFile.id}
                    className="group relative p-8 border border-border rounded-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 hover:shadow-lg"
                  >
                    {/* File Info */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <FileVideo className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xl font-semibold text-foreground truncate mb-1">{uploadedFile.file.name}</p>
                        <p className="text-muted-foreground">{formatFileSize(uploadedFile.file.size)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {uploadedFile.status === "ready" && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Ready
                          </Badge>
                        )}
                        {uploadedFile.status === "converting" && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            Converting
                          </Badge>
                        )}
                        {uploadedFile.status === "completed" && (
                          <Button
                            onClick={() => downloadFile(uploadedFile)}
                            className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        {uploadedFile.status === "error" && <Badge variant="destructive">Error</Badge>}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadedFile.id)}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          disabled={uploadedFile.status === "converting"}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {uploadedFile.status === "converting" && (
                      <div className="mb-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">Converting video...</span>
                          <span className="text-sm font-bold text-primary">{uploadedFile.progress || 0}%</span>
                        </div>
                        <Progress value={uploadedFile.progress || 0} className="h-3 bg-muted" />
                      </div>
                    )}

                    {/* Error Message */}
                    {uploadedFile.status === "error" && (
                      <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                        <p className="text-sm text-destructive font-medium">
                          {uploadedFile.error || "Conversion failed. Please try again."}
                        </p>
                      </div>
                    )}

                    {/* Format Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Input Format */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground">Input Format</Label>
                        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                          <span className="text-2xl">{getFormatIcon(uploadedFile.inputFormat || "")}</span>
                          <div>
                            <Badge variant="secondary" className="bg-muted text-foreground">
                              {getFormatLabel(uploadedFile.inputFormat || "")}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">Auto-detected</p>
                          </div>
                        </div>
                      </div>

                      {/* Output Format */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground">Output Format</Label>
                        <Select
                          value={uploadedFile.outputFormat}
                          onValueChange={(value) => updateFileSettings(uploadedFile.id, "outputFormat", value)}
                          disabled={uploadedFile.status === "converting" || uploadedFile.status === "completed"}
                        >
                          <SelectTrigger className="h-auto p-4 bg-background border-border hover:border-primary/50 transition-colors">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            {VIDEO_FORMATS.map((format) => (
                              <SelectItem key={format.value} value={format.value} className="p-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{format.icon}</span>
                                  <div>
                                    <p className="font-semibold">{format.label}</p>
                                    <p className="text-xs text-muted-foreground">{format.description}</p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Quality */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground">Quality</Label>
                        <Select
                          value={uploadedFile.quality}
                          onValueChange={(value) => updateFileSettings(uploadedFile.id, "quality", value)}
                          disabled={uploadedFile.status === "converting" || uploadedFile.status === "completed"}
                        >
                          <SelectTrigger className="h-auto p-4 bg-background border-border hover:border-primary/50 transition-colors">
                            <SelectValue placeholder="Select quality" />
                          </SelectTrigger>
                          <SelectContent>
                            {QUALITY_OPTIONS.map((quality) => (
                              <SelectItem key={quality.value} value={quality.value} className="p-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{quality.icon}</span>
                                  <div>
                                    <p className="font-semibold">{quality.label}</p>
                                    <p className="text-xs text-muted-foreground">{quality.description}</p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Conversion Preview */}
                    <div className="mt-6 flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <Settings className="h-5 w-5 text-primary" />
                      <span className="text-sm text-foreground">
                        Converting from{" "}
                        <strong className="text-primary">{getFormatLabel(uploadedFile.inputFormat || "")}</strong> to{" "}
                        <strong className="text-primary">{getFormatLabel(uploadedFile.outputFormat || "")}</strong> at{" "}
                        <strong className="text-primary">{uploadedFile.quality}</strong> quality
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {uploadedFiles.length > 0 && (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 backdrop-blur-sm">
            <CardContent className="pt-8">
              <div className="text-center space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Ready to Convert {uploadedFiles.filter((f) => f.status === "ready").length} File
                    {uploadedFiles.filter((f) => f.status === "ready").length !== 1 ? "s" : ""}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {isConverting
                      ? "Processing your videos with professional quality..."
                      : "All files will be processed with your selected settings"}
                  </p>
                </div>
                <Button
                  size="lg"
                  disabled={!canConvert || isConverting}
                  onClick={startConversion}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-12 py-6 text-lg font-semibold"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                      Converting Videos...
                    </>
                  ) : (
                    <>
                      <Play className="h-6 w-6 mr-3" />
                      Start Conversion
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
