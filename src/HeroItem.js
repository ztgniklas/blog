import { makeStyles, Paper, Box } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "50vh",
        width: "100%"
    },
}));

export default function HeroItem(props) {
    const {src} = props;
    const classes = useStyles();
    return (
        <Box boxShadow={5} borderRadius={8} className={classes.container} style={{backgroundImage: `url('${src}')`}}>

        </Box>
    )
}

HeroItem.defaultProps = {
    src: "./images/default-hero.jpg",
}
