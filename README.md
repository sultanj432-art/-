# 🏠 منصة صكي - Saki Platform

## الإجارة المنتهية بوعد التمليك

منصة رقمية متخصصة في تمكين تملك الوحدات السكنية عبر الإجارة المنتهية بالتمليك بطريقة شرعية وآمنة.

### 🎯 الأهداف الرئيسية
- تمكين المستأجرين من تملك وحدات سكنية بالتقسيط
- تسريع بيع الوحدات غير المباعة
- ضمان جودة الأصول العقارية
- تحقيق استدامة مالية وتشغيلية

### 🏗️ البنية التقنية

```
saki-platform/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB Models
│   │   ├── routes/          # API Routes
│   │   ├── middleware/      # Custom Middleware
│   │   ├── controllers/     # Business Logic
│   │   └── index.ts         # Entry Point
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/           # React Pages
│   │   ├── components/      # React Components
│   │   ├── hooks/           # Custom Hooks
│   │   ├── services/        # API Services
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

### 🚀 البدء السريع

#### المتطلبات:
- Node.js 18+
- Docker & Docker Compose
- MongoDB
- Redis

#### التثبيت:

```bash
# 1. استنسخ المشروع
git clone https://github.com/sultanj432-art/saki-platform.git
cd saki-platform

# 2. ثبت Dependencies
npm install

# 3. شغّل البيئة
docker-compose up -d

# 4. البدء
# Backend
cd backend && npm run dev

# Frontend (في terminal منفصل)
cd frontend && npm run dev
```

### 📋 الميزات

#### للمستأجر:
- ✅ البحث والاستعراض عن عقارات
- ✅ تقديم طلب تمويل
- ✅ متابعة حالة الطلب
- ✅ إدارة الأقساط
- ✅ تتبع التملك

#### لمالك العقار:
- ✅ إضافة وإدارة العقارات
- ✅ عرض طلبات التمويل
- ✅ متابعة الصفقات
- ✅ استقبال المدفوعات

#### لجهة التمويل:
- ✅ دراسة الطلبات
- ✅ تقييم الجدارة الائتمانية
- ✅ إصدار عروض تمويلية
- ✅ متابعة الأقساط

#### للجهات الأخرى (تأمين، استدامة):
- ✅ تقييم العقارات
- ✅ إصدار الشهادات
- ✅ متابعة الحالة

### 🔒 الأمان
- JWT Authentication
- Password Hashing (bcryptjs)
- CORS Protection
- Rate Limiting
- Input Validation

### 📊 تقنيات المشروع

**Backend:**
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Redis Cache
- JWT Authentication

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- React Router
- Axios
- React Query

### 🗄️ قاعدة البيانات

**Collections:**
1. **Users** - المستخدمين بجميع الأنواع
2. **Properties** - العقارات
3. **Applications** - طلبات التمويل
4. **Payments** - جداول الأقساط
5. **Sukuk** - الصكوك الإسلامية
6. **Commissions** - العمولات
7. **AuditLogs** - سجلات التدقيق

### 📡 API Endpoints

```
AUTHENTICATION
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh

PROPERTIES
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PUT    /api/properties/:id
DELETE /api/properties/:id

APPLICATIONS
GET    /api/applications
GET    /api/applications/:id
POST   /api/applications
PUT    /api/applications/:id
POST   /api/applications/:id/documents

PAYMENTS
GET    /api/payments/application/:appId
POST   /api/payments
PUT    /api/payments/:id
```

### 🤝 المساهمة
نرحب بالمساهمات! يرجى:
1. عمل Fork للمشروع
2. إنشاء فرع للميزة الجديدة
3. الالتزام بالتغييرات
4. فتح Pull Request

### 📝 الترخيص
هذا المشروع مرخص تحت MIT License

### 📞 التواصل
- البريد: info@saki-platform.com
- الهاتف: +966 50 XXXX XXXX
- الموقع: www.saki-platform.com

---

**© 2026 منصة صكي - جميع الحقوق محفوظة** 🏡
