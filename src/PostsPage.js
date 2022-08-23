import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Link, makeStyles, Typography} from "@material-ui/core";
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import RouterLink from 'next/link';
import {fetchAPI} from "../lib/api";
import {getStrapiMedia} from "../lib/media";

const useStyles = makeStyles((theme) => ({
    itemRoot: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    dateText: {
        marginLeft: theme.spacing(0.5),
    },
}));

function PostsPage(props) {
    const {postsData} = props;
    const [posts, setPosts] = useState([]);
    useEffect(async () => {
        let data = await fetchAPI('/articles', {populate: 'cover', sort: 'date:desc'});
        setPosts(data.data);
    }, []);
    return (
        <Grid container spacing={3}>
            {posts.map((post, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                    <BriefCard post={post} />
                </Grid>
            ))}
        </Grid>
    );
}

function BriefCard(props) {
    const { post } = props;
    const postData = post.attributes;
    const classes = useStyles();
    return (
        <Box
            borderRadius={2}
            boxShadow={3}
            p={2}
            pl={2}
            pr={2}
            className={classes.itemRoot}
        >
            <Typography variant="h5" align="center">
                {postData.title}
            </Typography>

            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
            >
                <CreateRoundedIcon fontSize="small" />
                <Typography variant="subtitle1" className={classes.dateText}>
                    {`Posted on ${postData.date}`}
                </Typography>
            </Box>

            <Box
                dangerouslySetInnerHTML={{
                    __html: postData.excerpt,
                }}
                mb={2}
                mt={1}
            />
            <Link component={RouterLink} href={`/posts/${post.id}`} underline="none" color="inherit">
                <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    endIcon={<ExpandMoreRoundedIcon />}
                >
                    More
                </Button>
            </Link>
        </Box>
    );
}


export default PostsPage;