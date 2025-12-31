Ổn, anh hình dung **rất rõ** cách app này hoạt động 👍
Anh sẽ viết cho em **một file `docs.md` hoàn chỉnh**, dùng được để:

- Onboard bản thân sau này
- Giải thích cho người khác
- Làm kim chỉ nam khi code (không bị lệch scope)

Anh viết theo **góc nhìn kỹ thuật + sản phẩm**, đúng stack em đã chốt:

> ReactJS + Shadcn + React Router + React Hook Form
> Feature-based architecture

---

````md
# Script Generator Web App

## 1. Mục tiêu dự án

Ứng dụng web hỗ trợ **generate script / text theo template có sẵn**, phục vụ nhu cầu dev hằng ngày như:

- SQL insert (notification, metadata, config…)
- Text template
- .NET migration script

Ứng dụng:

- Không cần đăng nhập
- Không phụ thuộc backend
- Chạy local / self-host
- Tập trung vào **tốc độ và tính lặp lại**

---

## 2. Ý tưởng cốt lõi (Core Concept)

> **User chỉ nhập KEY CHÍNH → hệ thống generate ra N script liên quan**

Ví dụ:

- Key chính: `notification.merchant.assigned`
- Hệ thống tự sinh:
  - `notification.merchant.assigned`
  - `notification.merchant.assigned.title`
  - `notification.merchant.assigned.body`
- Mỗi key con sinh ra theo **đa ngôn ngữ**:
  - `vi-VN`
  - `en-US`

User **không cần nhập lại**, chỉ nhập 1 lần.

---

## 3. User Flow tổng quát

1. User chọn **Generator Category**

   - SQL
   - Text
   - .NET Migration

2. Trong mỗi category, user chọn **Sub Tab**

   - Ví dụ: `Notification`

3. User nhập:

   - Key chính
   - Một số input phụ (nếu có)

4. App:

   - Áp dụng template group
   - Generate nhiều script liên quan

5. User:
   - Preview kết quả
   - Copy hoặc Download file

---

## 4. Ví dụ chi tiết: SQL → Notification

### 4.1. User Input

```txt
notification.merchant.assigned
```
````

---

### 4.2. Logic Generate

Giả sử Notification có **5 template insert**

| Thứ tự | Key được generate                            |
| ------ | -------------------------------------------- |
| 1      | notification.merchant.assigned               |
| 2      | notification.merchant.assigned.title (vi-VN) |
| 3      | notification.merchant.assigned.body (vi-VN)  |
| 4      | notification.merchant.assigned.title (en-US) |
| 5      | notification.merchant.assigned.body (en-US)  |

---

### 4.3. Output SQL (ví dụ)

```sql
INSERT INTO notification_messages (notification_key, language, type)
VALUES ('notification.merchant.assigned', 'system', 'event');

INSERT INTO notification_translations (notification_key, language, value)
VALUES ('notification.merchant.assigned.title', 'vi-VN', '...');

INSERT INTO notification_translations (notification_key, language, value)
VALUES ('notification.merchant.assigned.body', 'vi-VN', '...');

INSERT INTO notification_translations (notification_key, language, value)
VALUES ('notification.merchant.assigned.title', 'en-US', '...');

INSERT INTO notification_translations (notification_key, language, value)
VALUES ('notification.merchant.assigned.body', 'en-US', '...');
```

---

## 5. Kiến trúc Frontend

### 5.1. Tech Stack

- ReactJS
- React Router
- Shadcn UI
- React Hook Form
- TypeScript

---

### 5.2. Feature-based Structure

```
src/
├─ features/
│  ├─ sql/
│  │  ├─ notification/
│  │  │  ├─ NotificationGenerator.tsx
│  │  │  ├─ notification.templates.ts
│  │  │  ├─ notification.schema.ts
│  │  │  └─ notification.service.ts
│  │
│  ├─ text/
│  ├─ migration/
│
├─ shared/
│  ├─ components/
│  │  ├─ Sidebar.tsx
│  │  ├─ CodePreview.tsx
│  │
│  ├─ lib/
│  │  ├─ template-engine.ts
│  │
│  └─ types/
│
├─ router/
│  └─ routes.tsx
```

---

## 6. Template System

### 6.1. Template Group

Một **Template Group** đại diện cho:

- Một feature cụ thể
- Một logic generate hoàn chỉnh

Ví dụ:

- `SQL / Notification`
- `SQL / Merchant`
- `Text / Email`

---

### 6.2. Template Definition (Ví dụ)

```ts
export const notificationTemplates = [
	{
		key: "{{baseKey}}",
		language: null,
		template: `INSERT INTO ...`,
	},
	{
		key: "{{baseKey}}.title",
		language: "vi-VN",
		template: `INSERT INTO ...`,
	},
	{
		key: "{{baseKey}}.body",
		language: "vi-VN",
		template: `INSERT INTO ...`,
	},
	{
		key: "{{baseKey}}.title",
		language: "en-US",
		template: `INSERT INTO ...`,
	},
	{
		key: "{{baseKey}}.body",
		language: "en-US",
		template: `INSERT INTO ...`,
	},
];
```

---

## 7. Template Engine

### 7.1. Nguyên tắc

- Thuần function
- Không phụ thuộc UI
- Dễ test

---

### 7.2. Core Function

```ts
export function generateTemplate(
	template: string,
	data: Record<string, string>
) {
	return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] ?? "");
}
```

---

## 8. Form Handling

- React Hook Form
- Mỗi feature có schema riêng
- Validation rõ ràng (key bắt buộc, format chuẩn)

Ví dụ:

- Không cho key rỗng
- Không cho space thừa
- Chuẩn snake / dot notation

---

## 9. Output Handling

### 9.1. Preview

- Code block
- Monospace
- Scrollable
- Có thể copy từng block hoặc toàn bộ

---

### 9.2. Download File

- SQL → `.sql`
- Text → `.txt`
- Migration → `.cs`

---

## 10. Nguyên tắc thiết kế

1. **Key-based generation**
2. **One input → many outputs**
3. Feature độc lập
4. Không hard-code logic trong UI
5. Dễ thêm template mới mà không sửa code cũ

---

## 11. Hướng mở rộng trong tương lai

- Import / Export template
- Multi-language config
- Preset template group
- Gắn AI để suggest template
- Chia sẻ template nội bộ team

---

## 12. Tóm tắt

Đây là một:

- Developer productivity tool
- Nhẹ, nhanh, offline
- Giảm thao tác lặp lại
- Chuẩn hóa script theo convention

> **Nhập 1 key → sinh ra cả bộ script đúng chuẩn**
