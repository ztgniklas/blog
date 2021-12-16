import {Box, Container, Divider, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import FeaturedCard from "./FeaturedCard";
import HeroItem from "./HeroItem";
import Post from "./RecentPost";
import SideBar from "./SideBar";

const randomImgUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 100 + 1)}/200/300`;

const heroList = [{src: randomImgUrl}, {src: randomImgUrl}];

const featuredList = [
    {
        image: randomImgUrl,
        title: "标题",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus facilis corporis ut sapiente quasi ipsa eveniet vero quo eum quisquam, optio, voluptate consectetur nobis quis numquam qui totam pariatur ratione.",
        date: "2020-06-01",
    },
    {
        image: randomImgUrl,
        title: "标题",
        desc: "lorem ddkfdajsj",
        date: "2020-06-01"
    },
];

const useStyles = makeStyles((theme) => ({
    grid: {},
    root: {
        flexGrow: 1,
    },
}));

export default function HomePage() {
    const classes = useStyles();
    const [md, setMd] = useState("");

    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Carousel>
                    {heroList.map((item, idx) => (
                        <HeroItem key={idx} src={item.src}/>
                    ))}
                </Carousel>
            </Grid>
            <Grid item xs={12} md={6}>
                <FeaturedCard data={featuredList[0]}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FeaturedCard data={featuredList[1]}/>
            </Grid>
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

