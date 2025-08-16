# VideoConvert Pro 🎬

A modern, web-based video converter built with Next.js and FFmpeg that allows you to convert videos between multiple formats with professional quality settings.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- **Multiple Format Support**: Convert between MP4, AVI, MOV, WMV, WebM, MKV, FLV, and M4V
- **Quality Control**: Choose from High, Medium, or Low quality settings
- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **Real-time Progress**: Monitor conversion progress with detailed status updates
- **Professional UI**: Beautiful, responsive design built with Radix UI and Tailwind CSS
- **Client-side Processing**: All conversions happen in your browser using WebAssembly
- **Batch Processing**: Convert multiple files simultaneously
- **No Server Required**: Complete client-side solution for privacy and speed

## 🚀 Live Demo

**[Try VideoConvert Pro Online](https://vercel.com/matheus-puppes-projects/v0-video-converter-with-next-js)**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Video Processing**: FFmpeg WebAssembly (@ffmpeg/ffmpeg)
- **File Handling**: React Dropzone, File API
- **State Management**: React Hooks
- **Build Tool**: Next.js with PostCSS and Autoprefixer

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/video-converter.git
   cd video-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Basic Video Conversion

1. **Upload Videos**: Drag and drop video files or click to browse
2. **Configure Settings**: Choose output format and quality level
3. **Start Conversion**: Click "Start Conversion" to begin processing
4. **Download Results**: Download your converted videos when ready

### Supported Input Formats

- **MP4** (.mp4) - Most compatible format
- **AVI** (.avi) - High quality, larger files
- **MOV** (.mov) - Apple QuickTime format
- **WMV** (.wmv) - Windows Media format
- **WebM** (.webm) - Web optimized format
- **MKV** (.mkv) - Open source container
- **FLV** (.flv) - Flash video format
- **M4V** (.m4v) - iTunes compatible format

### Quality Settings

- **High Quality**: Best quality, larger file size (CRF 18, slow preset)
- **Medium Quality**: Balanced quality and size (CRF 23, medium preset)
- **Low Quality**: Smaller file size, lower quality (CRF 28, fast preset)

## 🔧 Development

### Project Structure

```
video-converter/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main video converter page
├── components/             # Reusable UI components
│   ├── ui/                # Radix UI components
│   └── theme-provider.tsx # Theme context provider
├── lib/                   # Utility libraries
│   ├── utils.ts           # Helper functions
│   └── video-converter.ts # FFmpeg video conversion logic
├── public/                # Static assets
├── styles/                # Additional styles
└── package.json           # Dependencies and scripts
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Key Components

- **VideoConverter**: Main page component with drag & drop interface
- **VideoConverter Class**: FFmpeg wrapper for video processing
- **UI Components**: Reusable Radix UI components with Tailwind styling

## 🌟 Features in Detail

### Advanced Conversion Engine

The application uses FFmpeg WebAssembly for professional-grade video conversion:

- **Codec Support**: H.264, VP9, AAC, MP3, Opus
- **Optimization**: Preset-based encoding for quality/speed balance
- **Format Detection**: Automatic input format recognition
- **Error Handling**: Graceful fallback with mock conversion for demo

### Responsive Design

- **Mobile First**: Optimized for all device sizes
- **Dark/Light Theme**: Automatic theme detection and switching
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized rendering with React best practices

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Auto-deploy**: Every push to main branch triggers deployment
3. **Environment Variables**: Configure any necessary environment variables
4. **Custom Domain**: Add your custom domain if desired

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use `next build && next export`
- **AWS Amplify**: Direct GitHub integration
- **Docker**: Build and deploy as container

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FFmpeg**: For the powerful video processing capabilities
- **Next.js Team**: For the amazing React framework
- **Radix UI**: For accessible component primitives
- **Tailwind CSS**: For the utility-first CSS framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/video-converter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/video-converter/discussions)
- **Email**: your.email@example.com

## 🔮 Roadmap

- [ ] **Audio Extraction**: Convert videos to audio formats
- [ ] **Video Editing**: Basic trimming and cropping
- [ ] **Batch Presets**: Save and reuse conversion settings
- [ ] **Cloud Storage**: Direct upload to cloud services
- [ ] **API Integration**: RESTful API for programmatic access
- [ ] **Mobile App**: React Native companion app

---

**Made with ❤️ by [Your Name]**

*Transform your videos with professional quality and ease.*