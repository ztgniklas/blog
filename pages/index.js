import Head from 'next/head'
import React from "react";
import PageLayout from '../src/PageLayout';
import HomePage from "../src/HomePage";

export default function Home() {

    return (
        <PageLayout>
            <HomePage />
        </PageLayout>
    )
}
