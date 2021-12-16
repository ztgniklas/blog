import React from "react";
import PageLayout from '../src/PageLayout';
import {getSortedPostsData} from "../lib/PostUtils";
import PostsPage from "../src/PostsPage";

export default function Posts({allPostsData}) {

    return (
        <PageLayout>
            <PostsPage postsData={allPostsData} />
        </PageLayout>
    )
}

export async function getStaticProps() {
    const allPostsData = await getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}