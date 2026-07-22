# NestJS REST API with Prisma ORM, PostgreSQL, JWT Authentication, Swagger API Documentation, Multer File Upload, Role-Based Access Control (RBAC), Validation, Search, Filter, Sort, Pagination and Relations

This project was built using NestJS 11, Prisma ORM 7, PostgreSQL, JWT Authentication, Swagger API Documentation, Multer File Upload, Role-Based Access Control (RBAC), Validation, Search, Filter, Sort, Pagination and Relations.

| Ushbu loyiha NestJS 11, Prisma ORM 7, PostgreSQL, JWT Authentication, Swagger API Documentation, Multer File Upload, Role-Based Access Control (RBAC), Validation, Search, Filter, Sort, Pagination va Relations yordamida yaratildi.

## Features | Imkoniyatlar

- User Registration with hashed password | bcrypt yordamida parolni hash qilib ro'yxatdan o'tish
- User Login with JWT Authentication | JWT orqali login qilish
- Protected Routes using JwtAuthGuard | JwtAuthGuard yordamida himoyalangan endpointlar
- Role-Based Access Control (RBAC) | Role-Based Access Control (RBAC)
- Roles Guard implementation | RolesGuard ishlatilgan
- Roles Decorator support | @Roles() decorator ishlatilgan
- Three user roles (USER, ADMIN, SUPERADMIN) | USER, ADMIN va SUPERADMIN rollari
- User Profile endpoint | Login qilgan user profilini olish
- Full CRUD operations for Users | User uchun CRUD amallari
- Full CRUD operations for Products | Product uchun CRUD amallari
- Request validation using class-validator | class-validator yordamida validatsiya
- Password hashing using bcrypt | bcrypt yordamida parollarni hash qilish
- JWT Authentication using Passport | Passport JWT Authentication
- JWT Strategy implementation | JWT Strategy ishlatilgan
- Swagger API Documentation using @nestjs/swagger | @nestjs/swagger yordamida API hujjatlashtirilgan
- Interactive Swagger UI for testing endpoints | Endpointlarni Swagger UI orqali test qilish imkoniyati
- PostgreSQL database integration | PostgreSQL ma'lumotlar bazasi bilan integratsiya
- Prisma ORM integration | Prisma ORM integratsiyasi
- Prisma Studio support | Prisma Studio qo'llab-quvvatlashi
- Prisma Visualizer support | Prisma Visualizer qo'llab-quvvatlashi
- File upload using Multer | Multer yordamida fayl yuklash
- User profile image upload | User profil rasmini yuklash
- Product image upload | Product rasmini yuklash
- Product search by name (contains) | Productlarni nomi bo'yicha qidirish (contains)
- Product filtering by minimum price | Minimal narx bo'yicha filterlash
- Product filtering by maximum price | Maksimal narx bo'yicha filterlash
- Product sorting by price (ASC/DESC) | Productlarni narxi bo'yicha ASC/DESC tartiblash
- Product pagination | Productlarni sahifalab (pagination) chiqarish
- Static file serving using ServeStaticModule | ServeStaticModule yordamida statik fayllarni brauzerda ko'rsatish
- One-to-Many relationship between User and Product | User va Product jadvallari orasida One-to-Many bog'lanish
- Global ValidationPipe support | Global ValidationPipe ishlatilgan
- Error handling with NotFoundException | NotFoundException orqali xatolarni boshqarish
- Error handling with UnauthorizedException | UnauthorizedException ishlatilgan
- Error handling with ConflictException | ConflictException ishlatilgan
- ParseIntPipe validation for route parameters | Route parametrlari uchun ParseIntPipe ishlatilgan

---

## Technologies Used | Ishlatilgan texnologiyalar

- NestJS v11
- Prisma ORM 7
- PostgreSQL
- JWT Authentication
- Passport.js
- Passport JWT
- Passport Local Strategy
- bcrypt
- TypeScript
- Postman
- Prisma Studio
- Prisma Visualizer
- class-validator
- class-transformer
- Reflector
- pg
- @prisma/adapter-pg
- Multer
- ServeStaticModule
- Swagger
- @nestjs/swagger
- swagger-ui-express

---

## Required Packages | Kerakli kutubxonalar

```bash
npm install prisma @prisma/client
npm install pg @prisma/adapter-pg

npm install class-validator class-transformer

npm install @nestjs/jwt
npm install @nestjs/passport

npm install passport
npm install passport-jwt

npm install bcrypt

npm install -D @types/bcrypt
npm install multer

npm install -D @types/multer
npm install @nestjs/swagger swagger-ui-express

npm install @nestjs/serve-static
npm install path
```

---

## Database Relationship | Ma'lumotlar bazasi bog'lanishi

One User can have multiple Products.  
| Bitta User bir nechta Productga ega bo'lishi mumkin.

```text
User (1) --------< Product (N)
```

---

## File Upload | Fayl Yuklash

This project supports image upload using **Multer**. Uploaded images are stored inside the `uploads/` folder while only the filename is saved in PostgreSQL.

| Ushbu loyiha **Multer** yordamida rasm yuklashni qo'llab-quvvatlaydi. Rasmlar `uploads/` papkasiga saqlanadi, PostgreSQL bazasida esa faqat filename saqlanadi.

---

# API Endpoints | API Endpointlari

## Authentication | Autentifikatsiya

| Method | Endpoint         | Description                       | Tavsif                                      |
| ------ | ---------------- | --------------------------------- | ------------------------------------------- |
| POST   | `/auth/register` | Register new user                 | Yangi user ro'yxatdan o'tkazish             |
| POST   | `/auth/login`    | Login user                        | User login                                  |
| GET    | `/auth/profile`  | Get logged in user (JWT Required) | JWT bilan login qilgan user profilini olish |

---

## Users | Foydalanuvchilar

> SUPERADMIN only

| Method | Endpoint           | Description               | Tavsif                      |
| ------ | ------------------ | ------------------------- | --------------------------- |
| GET    | `/users`           | Get all users             | Barcha userlarni olish      |
| GET    | `/users/:id`       | Get user by id            | Userni ID orqali olish      |
| PATCH  | `/users/:id`       | Update user               | Userni yangilash            |
| DELETE | `/users/:id`       | Delete user               | Userni o'chirish            |
| PATCH  | `/users/:id/image` | Upload user profile image | User profil rasmini yuklash |

---

## Products | Mahsulotlar

> ADMIN only

| Method | Endpoint              | Description          | Tavsif                    |
| ------ | --------------------- | -------------------- | ------------------------- |
| GET    | `/products`           | Get all products     | Barcha productlarni olish |
| GET    | `/products/:id`       | Get product by id    | Productni ID orqali olish |
| POST   | `/products`           | Create product       | Yangi product yaratish    |
| PATCH  | `/products/:id`       | Update product       | Productni yangilash       |
| DELETE | `/products/:id`       | Delete product       | Productni o'chirish       |
| PATCH  | `/products/:id/image` | Upload product image | Product rasmini yuklash   |

---

### Product Query Parameters

| Query     | Description             | Tavsif                              |
| --------- | ----------------------- | ----------------------------------- |
| contains  | Search products by name | Product nomi bo'yicha qidirish      |
| minPrice  | Filter by minimum price | Minimal narx bo'yicha filter        |
| maxPrice  | Filter by maximum price | Maksimal narx bo'yicha filter       |
| sort=asc  | Sort price ascending    | Narxni o'sish tartibida             |
| sort=desc | Sort price descending   | Narxni kamayish tartibida           |
| page      | Pagination page         | Sahifa raqami                       |
| limit     | Products per page       | Har bir sahifadagi mahsulotlar soni |

---

## Product Search, Filter, Sort & Pagination

### Search

GET /products?contains=Samsung

### Filter by Minimum Price

GET /products?minPrice=1000

### Filter by Maximum Price

GET /products?maxPrice=500

### Sort Ascending

GET /products?sort=asc

### Sort Descending

GET /products?sort=desc

### Pagination

GET /products?page=1&limit=3

---

## Authentication Flow | Autentifikatsiya oqimi

1. Register a new user.
2. Login with email and password.
3. Receive JWT Access Token.
4. Send the token using:

```http
Authorization: Bearer <your-jwt-token>
```

5. JwtAuthGuard validates the token.
6. RolesGuard checks user role.
7. Access is granted only if the required role matches.

---

## User Roles | Foydalanuvchi rollari

| Role       | Permissions             |
| ---------- | ----------------------- |
| USER       | Default registered user |
| ADMIN      | Can manage Products     |
| SUPERADMIN | Can manage Users        |

---

## Validation Rules | Validatsiya qoidalari

### User Validation | User validatsiyasi

#### Name | Ism

- Required | Majburiy
- Minimum length: 3 | Minimal uzunligi: 3
- Maximum length: 30 | Maksimal uzunligi: 30

#### Email

- Required | Majburiy
- Must be valid email format | To'g'ri email formatida bo'lishi kerak
- Maximum length: 100 | Maksimal uzunligi: 100

#### Password

- Required | Majburiy
- Minimum length: 6 | Minimal uzunligi: 6

---

### Product Validation | Product validatsiyasi

#### Name | Nomi

- Required | Majburiy
- Minimum length: 2 | Minimal uzunligi: 2
- Maximum length: 50 | Maksimal uzunligi: 50

#### Price | Narxi

- Required | Majburiy
- Must be positive number | Musbat son bo'lishi kerak
- Minimum value: 1 | Minimal qiymati: 1
- Maximum value: 1000000 | Maksimal qiymati: 1000000

---

## Environment Variables | Muhit o'zgaruvchilari

Create `.env` file in project root.  
| Loyihaning asosiy papkasida `.env` fayl yarating.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/nest_prisma_db?schema=public"

JWT_SECRET="your-secret-key"
```

---

### Uploads Folder

Uploaded images are stored inside the `uploads/` folder and served using `ServeStaticModule`.

| Yuklangan rasmlar `uploads/` papkasida saqlanadi va `ServeStaticModule` yordamida brauzerga uzatiladi.

---

## Installation | O'rnatish

Install dependencies:

```bash
npm install
```

---

## Prisma Commands | Prisma buyruqlari

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev

```

Open Prisma Studio

```bash
npx prisma studio
```

Check Prisma version

```bash
npx prisma -v
```

---

## Run Project | Loyihani ishga tushirish

Development mode

```bash
npm run start:dev
```

Production build

```bash
npm run build
npm run start:prod
```

---

# Screenshots | Screenshotlar

## Authentication

### Register Success

![Register Success](screenshots/auth/01-register-success.png)

### Email Already Exists

![Register Email Exists](screenshots/auth/02-register-email-exists.png)

### Login Success

![Login Success](screenshots/auth/03-login-success.png)

### Invalid Password

![Invalid Password](screenshots/auth/04-login-invalid-password.png)

### User Profile

![Profile](screenshots/auth/05-profile-success.png)

### Unauthorized

![Unauthorized](screenshots/auth/06-profile-unauthorized.png)

---

## Users CRUD

### Get All Users

![Get All Users](screenshots/users/03-get-all-users.png)

### Get User By ID

![Get User By ID](screenshots/users/04-get-user-by-id.png)

### Update User

![Update User](screenshots/users/05-update-user.png)

### Delete User

![Delete User](screenshots/users/06-delete-user.png)

### User Not Found

![User Not Found](screenshots/users/07-user-not-found.png)

### Upload User Image

![Upload User Image](screenshots/users/08-upload-user-image.png)

### User Image Browser

![User Image Browser](screenshots/users/09-user-image-browser.png)

---

## Products CRUD

### Create Product

![Create Product](screenshots/products/01-post-product-success.png)

### Validation Error

![Validation Error Product](screenshots/products/02-product-validation-error.png)

### Get All Products

![Get All Products](screenshots/products/03-get-all-products.png)

### Get Product By ID

![Get Product By ID](screenshots/products/04-get-product-by-id.png)

### Update Product

![Update Product](screenshots/products/05-update-product.png)

### Delete Product

![Delete Product](screenshots/products/06-delete-product.png)

### Product Not Found

![Product Not Found](screenshots/products/07-product-not-found.png)

### Upload Product Image

![Upload Product Image](screenshots/products/08-upload-product-image.png)

### Product Image Browser

![Product Image Browser](screenshots/products/09-product-image-browser.png)

### Search Product (contains)

![Search Product](screenshots/products/10-product-search-contains.png)

### Filter Product (Minimum Price)

![Filter Min Price](screenshots/products/11-product-filter-min-price.png)

### Filter Product (Maximum Price)

![Filter Max Price](screenshots/products/12-product-filter-max-price.png)

### Sort Products (Ascending)

![Sort ASC](screenshots/products/13-product-sort-asc.png)

### Pagination Page 1

![Pagination Page 1](screenshots/products/14-product-pagination-page-1.png)

### Pagination Page 2

![Pagination Page 2](screenshots/products/15-product-pagination-page-2.png)

### Pagination Page 3

![Pagination Page 3](screenshots/products/16-product-pagination-page-3.png)

### Pagination Page 4

![Pagination Page 4](screenshots/products/17-product-pagination-page-4.png)

### Pagination Page 5

![Pagination Page 5](screenshots/products/18-product-pagination-page-5.png)

---

## Prisma Studio & Database

### User Table

![Prisma User Table](screenshots/prisma/01-prisma-user-table.png)

### Product Table

![Prisma Product Table](screenshots/prisma/02-prisma-product-table.png)

### User Product Relation

![User Product Relation](screenshots/prisma/03-user-product-relation.png)

---

# Swagger API Documentation

Swagger UI is available after starting the project.

```
http://localhost:3000/api
```

---

## Swagger Home

![Swagger Home](screenshots/swagger/01-swagger-home.png)

---

## Authentication

### Profile Endpoint

![Profile](screenshots/swagger/02-auth-profile.png)

### Register & Login

![Register Login](screenshots/swagger/03-auth-login-register.png)

---

## Users Endpoints

### Get Users

![Users Get](screenshots/swagger/04-users-get.png)

### Update User

![Users Update](screenshots/swagger/05-users-update.png)

### Delete User & Upload Image

![Users Delete Upload](screenshots/swagger/06-users-delete-upload.png)

### Upload User Image

![Users Upload Image](screenshots/swagger/07-users-upload-image.png)

---

## Products Endpoints

### Get Products

![Products Get](screenshots/swagger/08-products-get.png)

### Create Product

![Products Create](screenshots/swagger/09-products-create.png)

### Get Product By ID

![Products Get By ID](screenshots/swagger/10-products-get-by-id.png)

### Update Product

![Products Update](screenshots/swagger/11-products-update.png)

### Delete Product & Upload Image

![Products Delete Upload](screenshots/swagger/12-products-delete-upload.png)

### Upload Product Image

![Products Upload](screenshots/swagger/13-products-upload-image.png)

---

## DTO Schemas

![Schemas](screenshots/swagger/14-schemas.png)

## Author | Muallif

**Davron Jurayev**
