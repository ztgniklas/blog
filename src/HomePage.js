import {Box, Container, Divider, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import FeaturedCard from "./FeaturedCard";
import HeroItem from "./HeroItem";
import Post from "./RecentPost";
import SideBar from "./SideBar";

const randomImgUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 100 + 1)}/200/300`;

const useStyles = makeStyles((theme) => ({
    grid: {},
    root: {
        flexGrow: 1,
    },
}));

export default function HomePage(props) {
    const classes = useStyles();
    const {postsData} = props;
    const [md, setMd] = useState("");
    const [heroList, setHeroList] = useState([]);
    const [featuredList, setFeaturedList] = useState([]);

    useEffect(async () => {
        let resp = await fetch('/hero.json', {
            mode: "no-cors"
        });
        let data = await resp.json();
        setHeroList(data);

        resp = await fetch('/featured.json');
        data = await resp.json();
        setFeaturedList(data);
    }, []);

    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Carousel>
                    {heroList.map((item, idx) => (
                        <HeroItem key={idx} src={item.src}/>
                    ))}
                </Carousel>
            </Grid>
            {featuredList.length === 2 ? (<><Grid item xs={12} md={6}>
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
                <SideBar />
            </Grid>
        </Grid>

    );
}

