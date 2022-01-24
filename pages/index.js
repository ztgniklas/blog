import Head from 'next/head'
import React from "react";
import PageLayout from '../src/PageLayout';
import HomePage from "../src/HomePage";
import {getSortedPostsData} from "../lib/PostUtils";

export default function Home({allPostsData}) {

    return (
        <PageLayout>
            <HomePage postsData={allPostsData} />
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