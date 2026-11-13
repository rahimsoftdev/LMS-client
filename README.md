# DataPollex LMS — Frontend

Student and admin interface for the DataPollex Learning Management System (LMS).

- **Live demo:** [https://data-pollex-lms.vercel.app/](https://data-pollex-lms.vercel.app/)
- **Backend API:** [https://data-polles-lms-server.vercel.app](https://data-polles-lms-server.vercel.app)
- **Backend documentation:** [`../server/README.md`](../server/README.md)

---

## What is this project?

DataPollex LMS is a simplified Learning Management System built for the DataPollex industrial training recruitment task. This repository contains the frontend: a responsive React single-page application with two experiences.

- **Student panel** — browse courses published by the admin, open course details, and watch lecture videos.
- **Admin dashboard** — create, edit, and delete courses; add and delete lectures; view platform statistics.

All course and lecture content is loaded from the backend API and stored in MongoDB. Nothing student-facing is hardcoded.

---

## Why this project?

The project demonstrates practical frontend engineering skills:

- Building a complete multi-page application with React Router.
- Integrating a frontend with a real REST API and session-based authentication.
- Implementing role-based access control for admin routes.
- Handling loading, empty, error, and not-found states properly.
- Building a responsive, consistent interface with Tailwind CSS.
- Separating API access into services and reusable data-fetching hooks.

---

## Features

### Public and student experience

- Home page with hero banner, featured courses, “Why choose us” section, and FAQ accordion.
- Course catalogue loaded from the database, with cover image, description, price, and lecture count.
- Course details page with full course information and its lecture list.
- Lecture page with an embedded YouTube or Vimeo player.
- Related lectures sidebar for navigating within a course.
- Friendly fallback when a video cannot be embedded.
- Price formatting in BDT (`৳`).
- Responsive navigation with a mobile menu and footer.

### Authentication

- Login and registration forms with client-side validation.
- Show/hide password controls and password-strength hints.
- Better Auth session handling with cookies.
- Role-based redirect after login:
  - `admin` → `/admin`
  - `user` → `/courses`
- Logout from both the public navbar and the admin sidebar.

### Admin dashboard

- Protected `/admin` routes with a session and role check.
- Dashboard statistics: total courses, total lectures, total students.
- Recent courses list with refresh and error retry.
- Course management page with course cards.
- Create course page with thumbnail URL preview.
- Edit course modal.
- Delete course confirmation modal; deleting a course also deletes its lectures on the backend.
- Admin course details page listing all lectures.
- Add lecture modal with title, description, and video URL.
- Delete lecture confirmation modal.
- Responsive admin sidebar with a mobile drawer.

### UI states and accessibility

- Loading skeletons and spinners for course, lecture, and dashboard data.
- Empty states for no courses and no lectures.
- Error states with retry actions.
- Not-found page for unknown routes.
- Semantic headings, labels, `aria-*` attributes, and keyboard-friendly controls.
- Responsive layouts for mobile, tablet, laptop, and desktop.

---

## Technology

| Layer | Technology |
| --- | --- |
| UI library | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| HTTP client | Axios |
| Authentication | Better Auth React client |
| Icons | Lucide React |
| Linting | ESLint |
| Deployment | Vercel |

---

## Project structure

```text
client/
├── public/
├── src/
│   ├── components/
│   │   ├── course/         # Course cards, grid, edit/delete modals
│   │   ├── layout/         # Navbar, footer, admin sidebar
│   │   ├── lecture/        # Video embed, lecture list, related lectures
│   │   ├── public/         # Banner, featured courses, FAQ, why choose us
│   │   └── ui/             # Page heading, loading, empty, error states
│   ├── hooks/
│   │   ├── useCourses.ts
│   │   ├── useCourseDetails.ts
│   │   └── useLectureDetails.ts
│   ├── layouts/
│   │   ├── AdminLayout.tsx   # Admin guard + sidebar layout
│   │   ├── AuthLayout.tsx
│   │   └── PublicLayout.tsx
│   ├── lib/
│   │   ├── api.ts            # Axios instance
│   │   └── auth-client.ts    # Better Auth client
│   ├── pages/
│   │   ├── admin/            # Dashboard, courses, create, details
│   │   ├── auth/             # Login, register
│   │   └── public/           # Home, courses, details, lecture, 404
│   ├── routes/
│   │   └── router.tsx        # All application routes
│   ├── services/
│   │   ├── course.service.ts
│   │   └── lecture.service.ts
│   ├── types/
│   ├── utils/
│   │   ├── errors.ts
│   │   ├── format.ts
│   │   └── video.ts
│   ├── index.css
│   └── main.tsx
├── .env.example
├── package.json
├── vite.config.ts
└── vercel.json
```

---

## Run locally

### Prerequisites

- Node.js 20 or newer
- npm
- The backend API running on `http://localhost:5000` (see [`../server/README.md`](../server/README.md))

### 1. Install dependencies

```bash
cd client
npm install
```

### 2. Create the environment file

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

For local development against the local backend:

```env
VITE_API_URL=http://localhost:5000/api
VITE_AUTH_URL=http://localhost:5000
```

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL for course, lecture, and admin API requests. |
| `VITE_AUTH_URL` | Base URL for Better Auth requests. Auth endpoints live at `/api/auth`. |

Alternatively, leave `VITE_API_URL=/api` and let the Vite dev proxy forward `/api` to `http://localhost:5000`. The proxy is configured in `vite.config.ts`.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Build for production

```bash
npm run lint
npm run build
npm run preview
```

### Available scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `vite` | Start the dev server with HMR |
| `npm run build` | `tsc -b && vite build` | Type-check and build for production |
| `npm run lint` | `eslint .` | Run ESLint |
| `npm run preview` | `vite preview` | Preview the production build |

### Creating an admin account

The frontend registers normal `user` accounts. To access `/admin`:

1. Register at `/register`.
2. Promote that user to `admin` in the `datapollex` database:
   ```js
   db.user.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```
3. Sign out and sign in again.

No demo credentials are committed to this repository.

---

## Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Home page |
| `/courses` | Public | Course catalogue |
| `/courses/:courseId` | Public | Course details and lecture list |
| `/courses/:courseId/lectures/:lectureId` | Public | Lecture video page |
| `/login` | Public | Login |
| `/register` | Public | Registration |
| `/admin` | Admin | Dashboard |
| `/admin/courses` | Admin | Manage courses |
| `/admin/courses/new` | Admin | Create a course |
| `/admin/courses/:courseId` | Admin | Manage lectures for a course |
| `/admin/courses/:courseId/lectures/:lectureId` | Admin | Lecture page inside admin layout |
| `*` | Public | Not-found page |

`AdminLayout` calls `authClient.useSession()`. While the session is loading it shows a checking state; if there is no session it redirects to `/login`; if the user is not an admin it redirects to `/courses`.

---

## How the frontend works with the API

### Data flow

```text
Page / component
    -> custom hook (useCourses, useCourseDetails, useLectureDetails)
        -> service (course.service.ts, lecture.service.ts)
            -> Axios instance (src/lib/api.ts)
                -> Express API
                    -> MongoDB
```

- **`src/lib/api.ts`** creates an Axios client with `baseURL` from `VITE_API_URL` and `withCredentials: true`, so session cookies are sent with every request.
- **`src/lib/auth-client.ts`** creates the Better Auth React client using `VITE_AUTH_URL` and `credentials: "include"`.
- **Services** contain the HTTP calls and unwrap the `{ success, message, data }` response envelope.
- **Hooks** manage loading, error, not-found, and reload state for each page.
- **Admin mutations** (create/update/delete course, add/delete lecture) currently use `fetch` with `credentials: "include"` and are triggered from modals and forms.

### Authentication and authorization

1. `authClient.signUp.email()` creates an account.
2. `authClient.signIn.email()` signs in and sets the session cookie.
3. `authClient.useSession()` provides the current session and user role across the app.
4. The public navbar shows the admin link only for admins.
5. `AdminLayout` blocks non-admin users from all `/admin` routes.
6. The backend independently verifies the session and admin role on every `/api/admin/*` request.

### Endpoints consumed

| Frontend page / feature | Method | Endpoint |
| --- | --- | --- |
| Home featured courses, course catalogue | `GET` | `/api/courses` |
| Course details | `GET` | `/api/courses/:courseId` |
| Course lecture list | `GET` | `/api/courses/:courseId/lectures` |
| Lecture page | `GET` | `/api/lectures/:lectureId` |
| Login / register / session / logout | `ALL` | `/api/auth/*` |
| Admin dashboard | `GET` | `/api/admin/overview` |
| Create course | `POST` | `/api/admin/courses` |
| Edit course | `PATCH` | `/api/admin/courses/:courseId` |
| Delete course | `DELETE` | `/api/admin/courses/:courseId` |
| Add lecture | `POST` | `/api/admin/courses/:courseId/lectures` |
| Delete lecture | `DELETE` | `/api/admin/courses/:courseId/lectures/:lectureId` |

### Video embedding

`src/utils/video.ts` converts supported URLs into embed URLs:

- `youtu.be/<id>`
- `youtube.com/watch?v=<id>`
- `youtube.com/embed/<id>`
- `vimeo.com/<id>`
- `player.vimeo.com/video/<id>`

Unsupported URLs show a fallback card with an “Open video in a new tab” link.

### Error handling

- Axios errors are normalized in `src/utils/errors.ts`.
- `404` responses switch pages into a not-found state.
- Other failures show an error state with a retry action.
- Forms show inline validation and API error messages.

---

## Live deployment

- Frontend: [https://data-pollex-lms.vercel.app/](https://data-pollex-lms.vercel.app/)
- Backend: [https://data-polles-lms-server.vercel.app](https://data-polles-lms-server.vercel.app)

### Deploying to Vercel

`vercel.json` rewrites `/api/*` requests to the live backend:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://data-polles-lms-server.vercel.app/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

Build settings:

- Build command: `npm run build`
- Output directory: `dist`

For production, use same-origin API paths:

```env
VITE_API_URL=/api
VITE_AUTH_URL=https://data-pollex-lms.vercel.app
```

The `/api` rewrite keeps browser requests on the frontend origin while the backend handles them.

---

## Known limitations

- Lectures can be added and deleted but not edited; there is no lecture update UI or backend endpoint.
- Student registration exists, but enrollment, payments, PDF uploads, and progress tracking are intentionally out of scope.
- The FAQ and “Why choose us” content is static marketing copy, not database content.
- The `sonner` package is installed but not currently used.

---

## License

This project was built as a recruitment task for DataPollex Ltd.
