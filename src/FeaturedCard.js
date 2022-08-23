import React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import RouterLink from 'next/link';
import {getStrapiMedia} from "../lib/media";

const useStyles = makeStyles((theme) => ({
    moreLink: {
        textDecoration: "none",
        color: "#123456",
        fontSize: "medium"
    },

}));

export default function FeaturedCard(props) {
    const classes = useStyles();
    const {attributes:data, id} = props.data;
    console.log(props)
    const {cover, title, date, excerpt} = data;

    return (
        <CardActionArea>
            <Grid container component={Card}>
                <Grid item component={CardContent} xs={8}>
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {date}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        paragraph
                        className={classes.desc}
                    >
                        {excerpt + '...'}
                    </Typography>

                    <RouterLink
                        href={`/posts/${id}`}
                        className={classes.more}
                    >
                        <a className={classes.moreLink}>了解更多</a>
                    </RouterLink>
                </Grid>
                <Grid
                    item
                    component={CardMedia}
                    xs={4}
                    image={getStrapiMedia(cover)}
                    title={title}
                />
            </Grid>
        </CardActionArea>
    );
}
