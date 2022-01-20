import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
const article = ({ article }) => {

    return (
        <>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br />
            <Link href="/" >Go back</Link>
        </>


    )
};

export const getServerSideProps = async (context) => {
    console.log(context.params.id)
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
    const article = await res.json();
    console.log(article);
    return {
        props: {
            article
        }
    }
}

export const getStaticPath = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const articles = res.json();
    const ids = articles.map(article => article.id)
    const paths = ids.map(id => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false
    }
}

export default article;
