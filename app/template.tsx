// import TemplateInput from "@/components/examples/TemplateInput";

// This line and next line are equivalent
// export default function Template({children}: {children: React.ReactNode}) {
export default function Template({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <>
      {/* <TemplateInput /> */}
      {children}
    </>
  );
}

// I want to ask one thing, how the template component was rendering, when we have not added that to the layout?
// How the template component was added after the layout one, how it finds where to add that?
// Great question! This is a key concept in Next.js App Router. The template component works automatically through Next.js's rendering hierarchy, not through manual imports.

// How Template Works Automatically
// Next.js Rendering Order:
// Root Layout (app/layout.tsx) - Always renders first
// Template (app/template.tsx) - Renders automatically if it exists
// Page (app/page.tsx) - Renders last
// The Magic Behind It:
// Next.js automatically detects and composes these files in this specific order:

// app/
// ├── layout.tsx     ← Root layout (wraps everything)
// ├── template.tsx   ← Template (auto-detected, wraps pages)
// └── page.tsx       ← Page (actual content)
// Rendering Flow:
// <RootLayout>
//   <Template>
//     <Page />
//   </Template>
// </RootLayout>
// Key Points:
// No Import Needed: You don't import template in layout - Next.js handles it
// Auto-Detection: Next.js automatically finds template.tsx in the same directory
// Nested Structure: Template wraps the page content automatically
// Hierarchy: Layout → Template → Page
// Why This Design:
// Separation of Concerns: Layout for persistent UI, Template for resettable UI
// Convention over Configuration: File names determine behavior
// Automatic Composition: Next.js handles the nesting
// If You Remove Template:
// The page renders directly inside layout:

// <RootLayout>
//   <Page />
// </RootLayout>
// This is Next.js's file-based convention system - the framework automatically composes components based on their filenames and location in the directory structure.
