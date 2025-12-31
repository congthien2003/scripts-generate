# Script Generator Web App

## 📋 Tổng quan dự án

Ứng dụng web generator cho phép tạo scripts/templates tự động theo các mẫu có sẵn. Được xây dựng bằng React 19, TypeScript, Vite với Shadcn UI components.

## 🚀 Công nghệ sử dụng

### Core Technologies

- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool và dev server
- **React Router DOM 7** - Client-side routing

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Shadcn UI** - Pre-built components
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Form & Validation

- **React Hook Form 7** - Form management
- **Zod 4** - Schema validation
- **@hookform/resolvers** - Form validation integration

### State Management

- **Redux Toolkit** - Global state management
- **React Redux** - Redux integration

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking

## 📁 Cấu trúc dự án

```
src/
├── features/               # Feature-based modules
│   ├── sql/               # SQL Generators
│   │   ├── notification/  # Notification SQL Generator
│   │   ├── merchant/      # Merchant SQL Generator (Coming Soon)
│   │   └── configuration/ # Configuration SQL Generator (Coming Soon)
│   ├── text/              # Text Generators (Coming Soon)
│   │   ├── email/         # Email Template Generator
│   │   └── message/       # Message Template Generator
│   └── migration/         # Migration Generators (Coming Soon)
│       ├── dotnet/        # .NET Migration Generator
│       └── database/      # Database Migration Generator
├── shared/                # Shared resources
│   ├── components/        # Reusable components
│   │   ├── CodePreview.tsx      # Code preview with copy/download
│   │   ├── ScriptLayout.tsx     # Main layout
│   │   ├── ScriptSidebar.tsx    # Navigation sidebar
│   │   └── ActionButtons.tsx    # Action buttons
│   ├── lib/              # Utility libraries
│   │   └── template-engine.ts   # Template engine
│   └── types/            # Shared TypeScript types
│       └── index.ts
├── components/           # UI components (Shadcn)
│   └── ui/              # Base UI components
├── pages/               # Page components
│   └── error/           # Error page
├── router/              # Routing configuration
│   └── index.tsx
├── stores/              # Redux stores
│   └── loading/         # Loading state
├── lib/                 # Utility functions
│   ├── utils.ts        # Helper utilities
│   ├── format.ts       # Format utilities
│   └── toast.ts        # Toast notifications
└── App.tsx             # Root component
```

## 🏗️ Kiến trúc dự án

### Feature-Based Architecture

Mỗi generator là một feature độc lập với:

- **Generator Component**: UI form để nhập dữ liệu
- **Schema**: Zod validation schema cho form
- **Templates**: Template strings với placeholders
- **Service**: Logic xử lý và generate code

### Template Engine

Template engine đơn giản sử dụng placeholder replacement:

```typescript
// Template với placeholders
const template = 'INSERT INTO {{table}} ({{columns}}) VALUES ({{values}});';

// Replace với data
const result = replacePlaceholders(template, {
  table: 'Users',
  columns: 'Name, Email',
  values: "'John', 'john@email.com'",
});
```

## 🔧 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 18
- npm hoặc yarn hoặc bun

### Cài đặt dependencies

```bash
npm install
```

### Chạy development server

```bash
npm run dev
```

Truy cập: http://localhost:3000

### Build cho production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📱 Generators hiện có

### 1. SQL Notification Generator ✅

Generate SQL INSERT statements cho hệ thống notification với hỗ trợ đa ngôn ngữ (vi-VN, en-US).

**Features:**

- Multi-language support (Vietnamese, English)
- 12 notification types: System, Payment, Transfer, Transaction, Account, Security, Marketing, General, Funding, Warning, ForAdmin, KYC
- Auto-generate notification keys
- SQL template với placeholders

**Usage:**

1. Nhập Base Key (e.g., `notification.merchant.assigned`)
2. Chọn Type (0-11)
3. Nhập Title và Body (Vietnamese và English)
4. Click "Generate SQL"
5. Copy hoặc Download kết quả

### 2. SQL Merchant Generator 🚧

Generate SQL statements cho merchant management (Coming Soon)

### 3. SQL Configuration Generator 🚧

Generate SQL statements cho application configuration (Coming Soon)

### 4. Text Generators 🚧

- Email Template Generator
- Message Template Generator (SMS, Push, In-App, WhatsApp)

### 5. Migration Generators 🚧

- .NET Migration Generator
- Database Migration Generator (PostgreSQL, MySQL, MSSQL, SQLite)

## 🎨 UI Components

### Shared Components

- **ScriptLayout**: Main layout với sidebar và content area
- **ScriptSidebar**: Navigation sidebar với categories
- **CodePreview**: Preview code với syntax highlighting, copy và download buttons
- **ActionButtons**: Reusable action buttons

### UI Library (Shadcn)

- Button, Input, Form, Label
- Dialog, Checkbox, Table
- Typography variants
- Loading states

## 🧪 Code Quality

### TypeScript

- Strict type checking enabled
- Type-safe forms với Zod inference
- Interface definitions cho templates và data models

### Project Standards

- Feature-based organization
- Reusable shared components
- Type-safe validation schemas
- Clean component composition

## 🚀 Thêm Generator mới

### 1. Tạo feature folder

```
src/features/[category]/[generator-name]/
```

### 2. Tạo các files cần thiết

```typescript
// schema.ts - Zod validation schema
export const mySchema = z.object({
  field1: z.string(),
  field2: z.number(),
});

export type MyFormData = z.infer<typeof mySchema>;

// templates.ts - Template definitions
export const myTemplates: Template[] = [
  {
    key: 'TEMPLATE_KEY',
    language: 'sql',
    template: `-- Template content with {{placeholders}}`,
  },
];

// service.ts - Generate logic
export function generateMyScript(data: MyFormData): GeneratorResult {
  return generateFromTemplates(myTemplates, {
    baseKey: data.someKey,
    additionalParams: { ...data },
  });
}

// MyGenerator.tsx - Component
export function MyGenerator() {
  // Form setup, validation, và UI
}
```

### 3. Thêm route

Cập nhật `src/router/index.tsx`:

```typescript
{
  path: 'category/generator-name',
  element: <MyGenerator />,
}
```

### 4. Cập nhật sidebar

Cập nhật `src/shared/components/ScriptSidebar.tsx` để thêm link mới.

## 📚 Hướng dẫn cho Developer

### Setup môi trường

1. Clone repository
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Mở http://localhost:3000

### Development Workflow

1. Tạo feature branch từ main
2. Develop generator theo cấu trúc feature-based
3. Test thoroughly với form validation
4. Submit pull request

### Best Practices

- Sử dụng TypeScript cho tất cả files
- Validate input với Zod schemas
- Reuse shared components khi có thể
- Follow naming conventions (PascalCase cho components, camelCase cho functions)
- Write descriptive comments cho complex logic

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push và create Pull Request

## 📄 License

MIT License

---

**Project Status**: In Development 🚧  
**Last Updated**: December 31, 2025
