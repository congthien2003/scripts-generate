# 📋 Kế hoạch triển khai - Script Generator Web App

## Tổng quan dự án

- **Mục tiêu**: Ứng dụng web generate script/text theo template có sẵn
- **Tech Stack**: ReactJS + Shadcn UI + React Router + React Hook Form + TypeScript
- **Kiến trúc**: Feature-based architecture

---

## Phase 1: Setup & Foundation

| #   | Task                                     | Status |
| --- | ---------------------------------------- | ------ |
| 1.1 | Khởi tạo dự án React + TypeScript + Vite | ✅     |
| 1.2 | Cài đặt và cấu hình Shadcn UI            | ✅     |
| 1.3 | Cài đặt React Router + React Hook Form   | ✅     |
| 1.4 | Thiết lập cấu trúc thư mục feature-based | ✅     |

---

## Phase 2: Core Infrastructure

| #   | Task                                       | Status |
| --- | ------------------------------------------ | ------ |
| 2.1 | Tạo Template Engine (`template-engine.ts`) | ✅     |
| 2.2 | Tạo shared types/interfaces                | ✅     |
| 2.3 | Tạo Layout chính với Sidebar               | ✅     |
| 2.4 | Cấu hình routing cơ bản                    | ✅     |

---

## Phase 3: Shared Components

| #   | Task                                      | Status |
| --- | ----------------------------------------- | ------ |
| 3.1 | Sidebar component (navigation categories) | ✅     |
| 3.2 | CodePreview component (hiển thị kết quả)  | ✅     |
| 3.3 | Copy/Download buttons                     | ✅     |

---

## Phase 4: SQL Generator Feature

| #   | Task                                        | Status |
| --- | ------------------------------------------- | ------ |
| 4.1 | Tạo cấu trúc `features/sql/`                | ✅     |
| 4.2 | Notification Generator - Schema & Templates | ✅     |
| 4.3 | Notification Generator - Form UI            | ✅     |
| 4.4 | Notification Generator - Service logic      | ✅     |
| 4.5 | Integration & Testing                       | ✅     |

---

## Phase 5: Text Generator Feature

| #   | Task                                | Status |
| --- | ----------------------------------- | ------ |
| 5.1 | Tạo cấu trúc `features/text/`       | ✅     |
| 5.2 | Basic Text Generator implementation | ✅     |

---

## Phase 6: Migration Generator Feature

| #   | Task                                    | Status |
| --- | --------------------------------------- | ------ |
| 6.1 | Tạo cấu trúc `features/migration/`      | ✅     |
| 6.2 | .NET Migration Generator implementation | ✅     |

---

## Phase 7: Polish & Enhancement

| #   | Task                        | Status |
| --- | --------------------------- | ------ |
| 7.1 | UI/UX improvements          | ✅     |
| 7.2 | Error handling & validation | ✅     |
| 7.3 | Responsive design           | ✅     |
| 7.4 | Final testing               | 🔄     |

---

## 📁 Cấu trúc thư mục dự kiến

```txt
src/
├─ features/
│  ├─ sql/
│  │  └─ notification/
│  │     ├─ NotificationGenerator.tsx
│  │     ├─ notification.templates.ts
│  │     ├─ notification.schema.ts
│  │     └─ notification.service.ts
│  ├─ text/
│  └─ migration/
├─ shared/
│  ├─ components/
│  │  ├─ Sidebar.tsx
│  │  ├─ CodePreview.tsx
│  │  └─ Layout.tsx
│  ├─ lib/
│  │  └─ template-engine.ts
│  └─ types/
│     └─ index.ts
├─ router/
│  └─ routes.tsx
├─ App.tsx
└─ main.tsx
```

---

## Legend

- ⬜ Chưa bắt đầu
- 🔄 Đang thực hiện
- ✅ Hoàn thành

---

## Ghi chú

- Cập nhật status sau mỗi task hoàn thành
- Ưu tiên hoàn thành từng Phase trước khi chuyển sang Phase tiếp theo
