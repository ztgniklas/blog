import {Box, Container, Divider, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import FeaturedCard from "./FeaturedCard";
import HeroItem from "./HeroItem";
import Post from "./RecentPost";
import SideBar from "./SideBar";
import {fetchAPI} from "../lib/api";
import {getStrapiMedia} from "../lib/media";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Carousel from "react-material-ui-carousel";

const randomImgUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 100 + 1)}/200/300`;

const useStyles = makeStyles((theme) => ({
    grid: {},
    root: {
        flexGrow: 1,
    },
}));

export default function HomePage(props) {
    const classes = useStyles();
    const [md, setMd] = useState("");
    const [heroList, setHeroList] = useState([]);
    const [featuredList, setFeaturedList] = useState([]);

    useEffect(async () => {
        // let resp = await fetch('/hero.json', {
        //     mode: "no-cors"
        // });
        // let data = await resp.json();
        let data = await fetchAPI('/heroes', {populate: '*'})

        setHeroList(data.data.map(d => getStrapiMedia(d.attributes.img)));

        data = await fetchAPI('/featured', {populate: 'deep'});
        setFeaturedList(data.data.attributes.articles.data);
    }, []);

    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Carousel>
                    {heroList.map((src, idx) => (
                        <HeroItem key={idx} src={src}/>
                    ))}
                </Carousel>
            </Grid>
            {featuredList.length >= 2 ? (<><Grid item xs={12} md={6}>
                <FeaturedCard data={featuredList[0]}/>
            </Grid>
                <Grid item xs={12} md={6}>
                    <FeaturedCard data={featuredList[1]}/>
                </Grid></>) : null}

            <Grid item xs={12} md={9}>
                <Typography variant="h4">Recent Articles</Typography>
                <Divider/>


            </Grid>
            <Grid item xs={12} md={3}>
                <SideBar/>
            </Grid>
        </Grid>

    );
}

