import React from 'react'
import Link from 'next/link'


export default function Posts({post}) {
  return (
    <div class = 'card'>
        <img src={post.frontmatter.cover_image} alt='' />
        <div className = "post-date"> Posted on {post.frontmatter.date}</div>

        <h3>{post.frontmatter.title}</h3>

        <p>{post.frontmatter.excerpt}</p>

        <Link href={`/blog/${post.slug}`}>
          <span className='btn'>Read More</span>
        </Link>
    </div>
  )
}
