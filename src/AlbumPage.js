import {Box, Grid, Paper, makeStyles, Typography, Backdrop, Dialog} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import {Image} from "@material-ui/icons";
import {fetchAPI} from "../lib/api";
import {getStrapiMedia, getStrapiMediaByUrl} from "../lib/media";

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    picDisplay: {
        color: "black"
    }
}));

export default function AlbumPage(props) {
    const [albums, setAlbums] = useState([]);
    const [openPic, setOpenPic] = useState(false);
    const [imgLink, setImgLink] = useState("");
    const classes = useStyles();

    useEffect(async () => {
        //let resp = await fetch('albums.json');
        let data = await fetchAPI('/album-categories', {populate: '*'})

        //let data = await resp.json();
        setAlbums(data.data.map(e => {
            return {title: e.attributes.text, imgs: e.attributes.imgs.data}
        }));
    }, []);

    function handleClickPreview(link) {
        setImgLink(link)
        setOpenPic(true);
    }

    function handleClickFullImgPage() {
        setOpenPic(false)
    }

    return (
        <Grid container spacing={2}>
            {albums.map((album, idx) => (
                <ImgList
                    title={album.title}
                    imgs={album.imgs}
                    key={idx}
                    onClick={handleClickPreview}
                />
            ))}
            <Dialog fullScreen open={openPic} className={classes.picDisplay}>
                <FullImg img={imgLink} handleClickFullImgPage={handleClickFullImgPage} />
            </Dialog>
        </Grid>
    );
}

function ImgList(props) {
    const {title, imgs, onClick} = props;
    const classes = useStyles();
    const [showImgs, setShowImgs] = useState(false);

    function handleClickTitle(e) {
        setShowImgs(!showImgs);
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Box onClick={handleClickTitle} className={classes.titleContainer} bgcolor="black"
                     color="info.contrastText" pl={2} pr={2} pt={1} pb={1} display="flex" flexDirection="row"
                     justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">{title}</Typography>
                    <ArrowForwardIosRoundedIcon/>
                </Box>
            </Grid>
            {imgs.map((img, idx) => (
                <Grid item xs={6} md={3} key={idx} style={{display: showImgs ? "block" : "none", cursor: "pointer"}} onClick={() => onClick(getStrapiMediaByUrl(img.attributes.url))}>
                    <ImageItem img={getStrapiMediaByUrl(img.attributes.formats.small.url)}/>
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

function FullImg(props) {
    const {img, handleClickFullImgPage} = props
    return (
        <Box style={{height: "100vh", width:"100vw"}}
             onClick={handleClickFullImgPage}
             display="flex"
             justifyContent={"center"}
             alignItems={"center"}>
            <img
                style={{
                    maxHeight: "95%",
                    maxWidth: "95%",
                    height: "auto",
                    width: "auto",
                    objectFit: "cover",
                }}
                src={img}
            />
        </Box>
    )
}