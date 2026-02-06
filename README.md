<!-- 1. Clonar o repositório

git clone (https://github.com/wom2000/cursosApp.git)
cd cursos

2. Instalar dependências

composer install
npm install

3. Configurar ambiente

cp .env.example .env
php artisan key:generate

Edita o `.env` e configura a base de dados.

4. Preparar base de dados

php artisan migrate

5. Rodar o projeto

Abre dois terminais:

php artisan serve
npm run dev

Acede a `http://localhost:8000`

Como Trabalhar com Git- Criar uma branch para as tuas alterações

git checkout -b nome-da-tua-branch

Fazer commit das alterações

git add .
git commit -m "o que fizeste"

Enviar para o repositório

git push origin nome-da-tua-branch

Depois abre um **Pull Request** no GitHub/GitLab para eu rever. -->

# CursosApp – Course Management Platform

A full-stack course management platform built with **Laravel 12**, **Inertia.js**, and **React**.  
The application allows users to browse and subscribe to courses, track progress on learning materials, and enables instructors and administrators to manage educational content.

This repository follows a **single Inertia app architecture**, with a Laravel backend and a React frontend living in the same codebase.

---

## Table of Contents

- [CursosApp – Course Management Platform](#cursosapp--course-management-platform)
  - [Table of Contents](#table-of-contents)
  - [Project Summary](#project-summary)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Styling \& Build](#styling--build)
  - [Project Structure](#project-structure)
  - [Architecture \& Data Flow](#architecture--data-flow)
    - [Single Inertia Application](#single-inertia-application)
    - [API vs Web](#api-vs-web)
    - [Shared Props](#shared-props)
  - [Architecture \& Data Flow](#architecture--data-flow-1)
    - [Single Inertia Application](#single-inertia-application-1)
    - [API vs Web](#api-vs-web-1)
    - [Shared Props](#shared-props-1)
    - [Status Fields](#status-fields)
  - [Access Control \& Roles](#access-control--roles)
    - [Roles](#roles)
    - [Special Rules](#special-rules)
    - [Helper Methods on `User`](#helper-methods-on-user)
  - [Development Setup](#development-setup)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Environment](#environment)
  - [Running the App](#running-the-app)
    - [Recommended (single command)](#recommended-single-command)
    - [Manual](#manual)
    - [Database](#database)
    - [Storage (file uploads)](#storage-file-uploads)
  - [Common Development Tasks](#common-development-tasks)
    - [Add a New Inertia Page](#add-a-new-inertia-page)
    - [Add an API Endpoint](#add-an-api-endpoint)
  - [Code Patterns \& Conventions](#code-patterns--conventions)
    - [Controllers](#controllers)
    - [Routing](#routing)
  - [Frontend Patterns](#frontend-patterns)
    - [Page Template](#page-template)
    - [Data Fetching](#data-fetching)
  - [File Uploads](#file-uploads)
  - [Testing](#testing)
  - [Common Pitfalls](#common-pitfalls)
  - [Branch \& PR Workflow](#branch--pr-workflow)
  - [Getting More Context](#getting-more-context)

---

## Project Summary

This project is a **Laravel 12 backend with an Inertia.js + React frontend**.  
The application manages:

- Courses (`Curso`)
- Categories (`Categoria`)
- Materials (`Material`)
- User progress (`Progresso`)
- Subscriptions (`Subscricao`)

The frontend lives inside `cursos/resources/js`, while the backend logic resides in `cursos/app`.

---

## Tech Stack

### Backend

- Laravel 12
- Eloquent ORM
- Laravel Sanctum (authentication & API protection)

### Frontend

- React 18
- Inertia.js (single-page experience without a separate SPA)
- Axios (API requests)
- Ziggy (Laravel route helpers in JS)

### Styling & Build

- TailwindCSS
- Bootstrap 5
- Vite

---

## Project Structure

```text
cursos/
├── app/
│ ├── Http/Controllers/
│ │ ├── Api/ # JSON API controllers
│ │ └── ... # Inertia page controllers
│ ├── Models/ # Eloquent models (Portuguese naming)
│ └── Providers/
│ └── AppServiceProvider.php
│
├── database/
│ ├── migrations/ # Database schema (PT field names)
│ └── seeders/
│
├── resources/
│ └── js/
│ ├── Pages/ # Inertia React pages
│ ├── Components/ # Reusable components
│ ├── Layouts/ # MainLayout, GuestLayout
│ └── app.jsx
│
├── routes/
│ ├── web.php # Inertia routes
│ └── api.php # JSON API routes
│
└── storage/
```

## Architecture & Data Flow

### Single Inertia Application

- Laravel controllers render pages using `Inertia::render()`
- React components act as pages (no separate SPA)
- Navigation feels client-side, but routing remains server-driven

### API vs Web

- **Web routes (`routes/web.php`)**
  - Return Inertia pages
  - Used for navigation and layouts

- **API routes (`routes/api.php`)**
  - Return JSON responses
  - Consumed via Axios from React components

### Shared Props

The backend shares common props globally via Inertia:

- `auth.user`
- `subscricao`

Accessible in React using:

```js
const { auth, subscricao } = usePage().props;
```

## Architecture & Data Flow

### Single Inertia Application

- Laravel controllers render pages using `Inertia::render()`
- React components act as pages (no separate SPA)
- Navigation feels client-side, but routing remains server-driven

### API vs Web

- **Web routes (`routes/web.php`)**
  - Return Inertia pages
  - Used for navigation and layouts

- **API routes (`routes/api.php`)**
  - Return JSON responses
  - Consumed via Axios from React components

### Shared Props

The backend shares common props globally via Inertia:

- `auth.user`
- `subscricao`

Accessible in React using:

```js
const { auth, subscricao } = usePage().props;
```

Domain Model

Important: Models, tables, and columns use **Portuguese naming**.

| Model        | Table       | Key Fields                             |
| ------------ | ----------- | -------------------------------------- |
| `User`       | users       | role, cesae_student                    |
| `Categoria`  | categorias  | nome, descricao                        |
| `Curso`      | cursos      | nome, nivel, categoria_id              |
| `Material`   | materiais   | id_curso, id_user, status              |
| `Progresso`  | progressos  | id_user, id_material, status           |
| `Subscricao` | subscricoes | user_id, data_inicio, data_fim, status |

### Status Fields

- Materiais
  - `pendente`
  - `aprovado`
  - `rejeitado`
- Progressos
  - `para_ver`
  - `a_ver`
  - `visto`

These values are defined in migrations and must be used consistently in filters and seeds.

## Access Control & Roles

### Roles

- **Admin**
  - Full system
- **Formador**
  - Manages own courses and materials
- **Admin**
  - Estudante

### Special Rules

- CESAE students (`cesae_student = true`) have free course access
- Subscribed users gain access via active `Subscricao`

### Helper Methods on `User`

Authorization is handled inline using helper methods:

- `isAdmin()`
- `isFormador()`
- `hasAcessoCursos()`
- `podeAprovarMateriais()`

Additional gates are defined in:

```js
app / Providers / AppServiceProvider.php;
```

## Development Setup

### Requirements

- PHP 8.2+
- Composer
- Node.js & npm
- MySQL / MariaDB

### Installation

```js
cd cursos
composer install
npm install
```

### Environment

```js
cp .env.example .env
php artisan key:generate
```

Configure database credentials in `.env.`

## Running the App

### Recommended (single command)

```js
composer dev
```

### Manual

```
php artisan serve     # Backend
npm run dev           # Frontend (Vite)
```

### Database

```js
php artisan migrate
php artisan db:seed
```

### Storage (file uploads)

```js
php artisan storage:link
```

## Common Development Tasks

### Add a New Inertia Page

1. Define route in `routes/web.php`
2. Return page with `Inertia::render('Folder/PageName')`
3. Create component in `resources/js/Pages/Folder/PageName.jsx`
4. Wrap with `MainLayout` or `GuestLayout`

### Add an API Endpoint

1. Add route to `routes/api.php`
2. Create controller in `app/Http/Controllers/Api`
3. Return JSON with `response()->json()`
4. Protect with `auth:sanctum` if needed

## Code Patterns & Conventions

### Controllers

- API controllers → JSON responses
- Web controllers → Inertia renders
- Authorization checks inline

```js
if (!$user->isAdmin()) {
    return response()->json(['message' => 'Forbidden'], 403);
}
```

### Routing

- Frontend navigation: `route('name')` (Ziggy)
- API requests: literal paths (`/api/cursos`)

## Frontend Patterns

### Page Template

```js
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Page() {
  const { auth } = usePage().props;

  return (
    <MainLayout>
      <Head title="Page Title" />
      {/* content */}
    </MainLayout>
  );
}
```

### Data Fetching

- Server props via `usePage().props`
- Dynamic data via `axios.get('/api/...')`

## File Uploads

- Stored using

```js
Storage::disk('public')->putFile(...)
```

- Physical path

```js
storage / app / public;
```

- Public URL

```js
/storage/filename.ext
```

## Testing

```js
composer test
# or
php artisan test
```

## Common Pitfalls

- Portuguese column names must match exactly (`id_curso`, `id_user`, `status`)
- Do not mix Ziggy routes with API endpoints
- New Inertia pages require both a route **and** a React file
- Always check existing JSON response formats before changing APIs

## Branch & PR Workflow

1. Create a feature branch:

```js
git checkout -b feature/brief-description
```

2. Keep commits focused and descriptive
3. Open a Pull Request targeting `main`

## Getting More Context

- Run the app locally and inspect network requests to understand API shapes
- Review existing controllers in `app/Http/Controllers/Api`
- Check migrations to understand database contracts
