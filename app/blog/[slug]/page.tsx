import { Metadata } from "next";
import { Container, Typography, Box, Paper } from "@mui/material";

// Simulated blog posts data
const blogPosts = {
  "getting-started-with-nextjs": {
    title: "Getting Started with Next.js",
    content: "Next.js is a powerful React framework that enables server-side rendering, static site generation, and many other features out of the box.",
    author: "John Doe",
    date: "2024-01-15",
    tags: ["Next.js", "React", "Tutorial"]
  },
  "react-hooks-explained": {
    title: "React Hooks Explained",
    content: "React Hooks revolutionized how we write React components, allowing us to use state and other React features without writing a class.",
    author: "Jane Smith",
    date: "2024-01-20",
    tags: ["React", "Hooks", "JavaScript"]
  },
  "tailwind-css-tips": {
    title: "Tailwind CSS Tips and Tricks",
    content: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.",
    author: "Mike Johnson",
    date: "2024-01-25",
    tags: ["CSS", "Tailwind", "Design"]
  }
};

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} - Next.js Learning Blog`,
    description: post.content.substring(0, 160) + "...",
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160) + "...",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content.substring(0, 160) + "...",
    },
  };
}
// generateMetadata Function Usage
// Clarification: The generateMetadata function is automatically used by Next.js - you don't need to call it manually
// How it works: Next.js automatically calls generateMetadata before rendering the page to generate SEO metadata
// When it runs: Every time the page is requested, Next.js executes this function to create dynamic metadata


export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography variant="h4" component="h1" className="text-center mb-4">
          Blog Post Not Found
        </Typography>
        <Typography variant="body1" className="text-center">
          The requested blog post could not be found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper elevation={3} className="p-8">
        <Typography variant="h3" component="h1" className="mb-4">
          {post.title}
        </Typography>
        
        <Box className="mb-6">
          <Typography variant="subtitle2" color="text.secondary">
            By {post.author} • {post.date}
          </Typography>
        </Box>

        <Box className="mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </Box>

        <Typography variant="body1" className="leading-relaxed">
          {post.content}
        </Typography>

        <Box className="mt-8 pt-6 border-t border-gray-200">
          <Typography variant="h6" className="mb-2">
            Dynamic Metadata Example:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page demonstrates dynamic metadata generation. Check the page title, 
            description, and meta tags in your browser's developer tools. They change 
            based on the blog post slug.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
