import {Box, Grid, Paper, makeStyles, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        "&:hover": {
            cursor: "pointer"
        }
    }
}));

export default function AlbumPage(props) {
    const [albums, setAlbums] = useState([]);

    useEffect(async () => {
        let resp = await fetch('albums.json');
        let data = await resp.json();
        console.log(data)
        setAlbums(data);
    }, []);

    return (
        <Grid container spacing={2}>
            {albums.map((album, idx) => (
                <ImgList
                    title={album.name}
                    imgs={album.images}
                    key={idx}
                />
            ))}
        </Grid>
    );
}

function ImgList(props) {
    const {title, imgs} = props;
    const classes = useStyles();
    const [showImgs, setShowImgs] = useState(false);

    function handleClickTitle(e) {
        setShowImgs(!showImgs);
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Box onClick={handleClickTitle} className={classes.titleContainer} bgcolor="info.main"
                     color="info.contrastText" pl={2} pr={2} pt={1} pb={1} display="flex" flexDirection="row"
                     justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">{title}</Typography>
                    <ArrowForwardIosRoundedIcon/>
                </Box>
            </Grid>
            {imgs.map((img, idx) => (
                <Grid item xs={6} md={3} key={idx} style={{display: showImgs ? "block" : "none"}}>
                    <ImageItem img={img.small}/>
                </Grid>
            ))}
        </React.Fragment>
    );
}

function ImageItem(props) {
    const {img} = props;

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