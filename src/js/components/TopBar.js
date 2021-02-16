import {AppBar, Link, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    link: {
        margin: `${theme.spacing(1)}px auto`,
    },
    title: {
        color: theme.palette.primary.contrastText,
        paddingBottom: 3,
        fontSize: "3rem",
    },
    offset: theme.mixins.toolbar,
}));

export const TopBar = () => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Link className={classes.link} component={RouterLink} to="/">
                        <Typography className={classes.title} variant="h1">
                            {t("appName")}
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}/>
        </Fragment>
    );
};

export default TopBar;