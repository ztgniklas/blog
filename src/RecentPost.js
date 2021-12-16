import { Typography, Box, Divider } from "@material-ui/core";
import React from "react";
// import "./sakura.css";

export default function Post(props) {
    const { html, title, date } = props;
    return (
        <Box mt={2}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle1">{date}</Typography>
            <Box
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            ></Box>
            <Divider />
        </Box>
    );
}
