import React from "react";
import Header from "./Header";
import {Container} from "@material-ui/core";
import Head from "next/head";


const categories = [
    { name: "Home" },
    { name: "Posts" },
    { name: "Album" },
    { name: "Books" },
    { name: "About" },
];

export default function Layout({ children, title }) {
    return (

        <Container maxWidth="lg">
            <Head>
                <title>{title || "Tiger's Blog"}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header title="Tiger's Blog" categories={categories} />
            {children}
        </Container>

    );
}