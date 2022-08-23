import { getAllPostIds, getPostData } from "../../lib/PostUtils";
import React from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import PageLayout from '../../src/PageLayout';
import {fetchAPI} from "../../lib/api";

const useStyles = makeStyles((theme) => ({
    post: {
        '& img': {
            width: '70%'
        },
        '& p': {
            fontSize: '20px'
        }
    },

}));

export default function Post({ postData }) {
    const classes = useStyles();
    return (
        <PageLayout>
            <div>
                <Typography variant="h4">
                    {postData.title}
                </Typography>
                <Typography variant="h6">
                    {postData.date}
                </Typography>
                <Box
                    dangerouslySetInnerHTML={{
                        __html: postData.content,
                    }}
                    mb={2}
                    mt={1}
                    className={classes.post}
                />
            </div>
        </PageLayout>

    );
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}