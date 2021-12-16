import React from "react";
import Header from "./Header";
import {Container} from "@material-ui/core";

const categories = [
    { name: "Home" },
    { name: "Posts" },
    { name: "Album" },
    { name: "Books" },
    { name: "About" },
];

export default function Layout({ children }) {
    return (

        <Container maxWidth="lg">
            <Header title="Tiger's Blog" categories={categories} />
            {children}
        </Container>

    );
}