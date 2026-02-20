# Next.js Project Organization

## Directory Structure

### Frontend Components (Active)
- `components/basics/` - Basic React components
- `components/ui/` - UI components
- `components/hooks/` - Custom React hooks
- `components/todos/` - Todo-related components
- `components/examples/` - Example components (excluding backend-related)
- `components/nextjs/` - Next.js specific components
  - `DynamicRoutesExample.tsx` - Dynamic routing examples
  - `RouteGroupsExample.tsx` - Route group examples
  - `ImageOptimizationDemo.tsx` - Image optimization demo
  - `RenderingComparison.tsx` - Rendering method comparisons
  - `SSRExample.tsx` - Server-side rendering examples

### Backend Components (Moved)
- `components/_backend/` - Backend-related components moved here
  - `RouteHandlersDemo.jsx` - API route handlers demo
  - `FileUploadDemo.jsx` - File upload functionality
  - `AuthenticationExplanation.tsx` - Authentication components
  - `ErrorTestButton.tsx` - Error testing component

### Next.js Backend (Deprecated)
- `app/_deprecated/api/` - Entire Next.js API backend moved here
  - `customers/` - Customer CRUD operations
  - `upload/` - File upload operations
  - `middleware.ts` - Next.js middleware
  - `middleware/` - Middleware configurations
  - All other API routes

### Next.js Pages (Organized)
- `app/nextjs/` - Next.js learning pages
  - `page.tsx` - Main Next.js demos page
  - `rendering/` - Rendering methods and caching
    - `ssr-demo/` - Server-Side Rendering demo
    - `ssg-demo/` - Static Site Generation demo
    - `isr-demo/` - Incremental Static Regeneration demo
    - `tag-revalidation-demo/` - Tag-based revalidation demo
  - `routing/` - Routing examples
    - `demo/` - Dynamic route examples
    - `middleware-test/` - Middleware testing

## Migration Notes

### Customers Page (`app/customers/page.js`)
All API calls have been commented with migration notes:
- Fetch customers: Replace `/api/customers` with `http://localhost:3001/api/customers`
- Upload files: Replace `/api/upload` with `http://localhost:3001/api/upload`
- Create/Update customers: Replace `/api/customers` with `http://localhost:3001/api/customers`
- Delete customers: Replace `/api/customers?id=${id}` with `http://localhost:3001/api/customers?id=${id}`

### Home Page (`app/page.tsx`)
Cleaned up to remove backend-related components:
- Removed `ErrorTestButton`
- Removed `RouteHandlersDemo`
- Removed `FileUploadDemo`
- Removed `AuthenticationExplanation`
- Removed middleware testing section

### API Routes
All Next.js API routes have been commented out and replaced with placeholder responses:
- `app/_deprecated/api/customers/route.js` - Customer CRUD operations
- `app/_deprecated/api/upload/route.js` - File upload operations

### Middleware
Next.js middleware moved to deprecated:
- `app/_deprecated/api/middleware.ts` - Main middleware file
- `app/_deprecated/api/middleware/` - Middleware configurations

## Next Steps for Express Backend

1. Create Express server with the following endpoints:
   - `GET /api/customers` - Get all customers
   - `GET /api/customers?id={id}` - Get single customer
   - `POST /api/customers` - Create customer
   - `PUT /api/customers` - Update customer
   - `DELETE /api/customers?id={id}` - Delete customer
   - `POST /api/upload` - Upload file
   - `DELETE /api/upload?publicId={id}` - Delete file

2. Update the customers page API calls to point to Express server:
   - Change all `/api/` calls to `http://localhost:3001/api/`

3. Move database operations from `config/crudOpereations.js` to Express backend

4. Move Cloudinary configuration from `config/cloudinary.js` to Express backend

5. Move file upload utilities from `utils/fileUpload.js` to Express backend

6. Implement Express middleware to replace Next.js middleware functionality

## Updated Directory Structure

```
my-next-app/
├── app/
│   ├── page.tsx                    # Clean home page
│   ├── nextjs/                    # Next.js learning pages
│   │   ├── page.tsx               # Next.js demos hub
│   │   ├── rendering/             # Rendering methods
│   │   │   ├── ssr-demo/
│   │   │   ├── ssg-demo/
│   │   │   ├── isr-demo/
│   │   │   └── tag-revalidation-demo/
│   │   └── routing/              # Routing examples
│   │       ├── demo/
│   │       └── middleware-test/
│   ├── _deprecated/              # All deprecated Next.js backend
│   │   └── api/                 # Entire API folder moved here
│   │       ├── customers/
│   │       ├── upload/
│   │       ├── middleware.ts
│   │       └── middleware/
│   └── customers/               # Ready for Express integration
├── components/
│   ├── nextjs/                 # Next.js specific components
│   ├── _backend/               # Backend components
│   └── ... (other folders)
└── ORGANIZATION.md             # Updated documentation
```
