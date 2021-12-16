import { getAllPostIds, getPostData } from "../../lib/PostUtils";
import React from "react";
import {Box} from "@material-ui/core";
import PageLayout from '../../src/PageLayout';

export default function Post({ postData }) {
    return (
        <PageLayout>
            <div>
                {postData.title}
                <br />
                {postData.date}
                <br/>
                <Box
                    dangerouslySetInnerHTML={{
                        __html: postData.contentHtml,
                    }}
                    mb={2}
                    mt={1}
                />
            </div>
        </PageLayout>

    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
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