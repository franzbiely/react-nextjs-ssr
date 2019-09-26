import { useRouter } from 'next/router'

function BlogPost() {
  const router = useRouter()
  // `blogId` will be `'how-to-use-dynamic-routes'` when rendering
  // `/blog/how-to-use-dynamic-routes`
  const blogId = router.query.id
  return <main>This is blog post {blogId}.</main>
}

export default BlogPost