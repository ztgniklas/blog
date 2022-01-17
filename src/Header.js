import React, { useState } from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import {
    IconButton,
    Toolbar,
    Typography,
    makeStyles,
    InputBase,
    Box,
    TextField,
    alpha,
    Link,
    Snackbar,
} from "@material-ui/core";
import RouterLink from "next/link";

const useStyles = makeStyles((theme) => ({
    firstRow: {
        flex: 1,
    },
    title: {
        flex: 1,
        paddingLeft: theme.spacing(2),
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
    },
    searchIcon: {
        // border: "1px solid black",
        display: "flex",
        alignItems: "center",
        marginLeft: theme.spacing(2),
    },
    searchInput: {
        padding: theme.spacing(1, 1, 1, 1),
    },
    secondRow: {
        justifyContent: "flex-start",
        overflowX: "auto",
    },
    link: {
        padding: theme.spacing(0, 5),
        textDecoration: "none",
        color: "inherit"
    },
    titleLink: {
        textDecoration: "none",
        color: "inherit"
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const { title, categories } = props;
    const [isSecondRowHidden, setSecondRowHidden] = useState(false);
    const [hasCopiedLink, setCopiedLink] = useState(false);

    function onClickMenuBtn(e) {
        setSecondRowHidden(!isSecondRowHidden);
    }

    function handleClickLinkBtn(e) {
        navigator.clipboard.writeText("https://www.taigezhang.com/blog");
        setCopiedLink(true);
    }

    function handleCloseCopiedSnack(event, reason) {
        if (reason === "clickaway") {
            return;
        }

        setCopiedLink(false);
    }

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={hasCopiedLink}
                autoHideDuration={1000}
                onClose={handleCloseCopiedSnack}
                message="Blog url copied to your clipboard!"
            />
            <Toolbar className={classes.firstRow}>
                <IconButton color="inherit" onClick={onClickMenuBtn}>
                    <MenuIcon />
                </IconButton>

                <Typography
                    color="inherit"
                    className={classes.title}
                    align="left"
                    variant="h6"
                    noWrap
                >
                    <Link
                        component={RouterLink}
                        href="/"
                        underline="none"
                        color="inherit"
                    >
                        <a className={classes.titleLink}>{title}</a>
                    </Link>
                </Typography>

                <Box className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="search..."
                        className={classes.searchInput}
                    />
                </Box>
                <IconButton
                    color="inherit"
                    target="_blank"
                    href="https://www.linkedin.com/in/taige-zhang-94848a145/"
                >
                    <LinkedInIcon />
                </IconButton>
                <IconButton color="inherit">
                    <FacebookIcon />
                </IconButton>
                <IconButton color="inherit">
                    <GitHubIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleClickLinkBtn}>
                    <LinkRoundedIcon />
                </IconButton>
            </Toolbar>
            <Toolbar
                className={classes.secondRow}
                style={{ display: isSecondRowHidden ? "none" : "flex" }}
            >
                {categories.map((cat) => (
                    <RouterLink
                        href={`/${cat.name.toLowerCase()}`}
                        key={cat.name}
                    >
                        <a className={classes.link}>{cat.name}</a>
                    </RouterLink>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}
