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

const useStyles = makeStyles((theme) => ({
    desc: {
        height: "20vh",
    },
}));

export default function FeaturedCard(props) {
    const classes = useStyles();
    const { data } = props;
    const { image, title, date, desc } = data;
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
                        {desc}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        了解更多
                    </Typography>
                </Grid>
                <Grid
                    item
                    component={CardMedia}
                    xs={4}
                    image={image}
                    title={title}
                />
            </Grid>
        </CardActionArea>
    );
}
