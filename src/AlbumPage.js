import { Box, Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { graphql, useStaticQuery } from "gatsby";
import React, {useState} from "react";
import Layout from "../components/Layout";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const headers2Dir = {
    calligraphy: "书法",
    "playing-in-shanghai": "无产者的上海范儿",
    suzhou: "苏州行",
};

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        "&:hover": {
            cursor: "pointer"
        }
    }
}));

export default function AlbumPage({ pageContext }) {
    const { dir2Imgs } = pageContext;
    console.log(dir2Imgs);
    return (
        <Layout>
            <Grid container spacing={2}>
                {Object.keys(dir2Imgs).map((title, idx) => (
                    <ImgList
                        title={headers2Dir[title] || title}
                        imgs={dir2Imgs[title]}
                        key={idx}
                    />
                ))}
            </Grid>
        </Layout>
    );
}

function ImgList(props) {
    const { title, imgs } = props;
    const classes = useStyles();
    const [showImgs, setShowImgs] = useState(false);

    function handleClickTitle(e) {
        setShowImgs(!showImgs);
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Box onClick={handleClickTitle} className={classes.titleContainer} bgcolor="info.main" color="info.contrastText" pl={2} pr={2} pt={1} pb={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">{title}</Typography>
                    <ArrowForwardIosRoundedIcon />
                </Box>
            </Grid>
            {imgs.map((img, idx) => (
                <Grid item xs={6} md={3} key={idx} style={{display: showImgs ? "block" : "none"}}>
                    <ImageItem img={img} />
                </Grid>
            ))}
        </React.Fragment>
    );
}

function ImageItem(props) {
    const { img } = props;

    return (
        <React.Fragment>
            <Box
                borderRadius={8}
                boxShadow={3}
                pt="100%"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            />
        </React.Fragment>
    );
}