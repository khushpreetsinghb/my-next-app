import Link from "next/link";
import { Container, Typography, Box, Card, CardContent, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const blogPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "Next.js is a powerful React framework that enables server-side rendering...",
    tags: ["Next.js", "React", "Tutorial"]
  },
  {
    slug: "react-hooks-explained",
    title: "React Hooks Explained",
    excerpt: "React Hooks revolutionized how we write React components...",
    tags: ["React", "Hooks", "JavaScript"]
  },
  {
    slug: "tailwind-css-tips",
    title: "Tailwind CSS Tips and Tricks",
    excerpt: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes...",
    tags: ["CSS", "Tailwind", "Design"]
  }
];

export default function BlogPage() {
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" component="h1" className="mb-8 text-center">
        Blog Posts
      </Typography>
      
      <Typography variant="body1" className="mb-8 text-center text-gray-600">
        Click on any blog post to see dynamic metadata in action. Check the browser tab title 
        and page source to see how metadata changes based on the post.
      </Typography>

      <Box className="space-y-6">
        {blogPosts.map((post) => (
          <Card key={post.slug} elevation={2} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Box className="flex justify-between items-start mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex justify-between items-start w-full text-blue-600 hover:text-blue-800 no-underline"
                >
                  <Typography variant="h5" component="h2" className="mb-2">
                    {post.title}
                  </Typography>

                  <ArrowForwardIcon />
                </Link>
              </Box>
              {/* useRouter - Best For:
                  Programmatic navigation (after form submission, authentication)
                  Conditional navigation (redirects, logic-based routing)
                  Event handlers (button clicks, dropdowns)
                  Mobile menu navigation with additional logic */}
              
              <Typography variant="body2" color="text.secondary" className="mb-4">
                {post.excerpt}
              </Typography>
              
              <Box className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    className="text-xs"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box className="mt-12 p-6 bg-gray-50 rounded-lg">
        <Typography variant="h6" className="mb-3">
          📌 SEO Metadata Demonstration
        </Typography>
        <Typography variant="body2" className="mb-2">
          <strong>Static Metadata:</strong> Home page has fixed metadata
        </Typography>
        <Typography variant="body2" className="mb-2">
          <strong>Dynamic Metadata:</strong> Each blog post generates unique metadata based on content
        </Typography>
        <Typography variant="body2">
          <strong>Test it:</strong> Navigate to different blog posts and observe the browser tab title changing!
        </Typography>
      </Box>
    </Container>
  );
}
