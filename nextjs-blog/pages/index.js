import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
//import styles from '@/styles/Home.module.css'
import Post from '../components/Post'
import {sortByDate} from '../utils'

export default function Home({posts}) {
  return (
    <>
      <Head>
        <title>Dev Blog</title>
        <meta name="description" content="Next JS Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='posts'>
        {posts.map((post, index) => (
            <Post post={post} />
        ))}
      </div>
    </>
  )
}

export async function getStaticProps () {
   // Get files from the posts directory
  const files = fs.readdirSync(path.join('posts'))
    
  // Get slug and front matter from posts
  const posts = files.map(filename => {
    // Create slug 
    const slug = filename.replace('.md', '')

    //Get front matter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename), 
      'utf-8'
    )

    matter(markdownWithMeta)
    
    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,

    }
  })


  return {
    props: {
      posts: posts.sort(sortByDate),
    }
  }
}