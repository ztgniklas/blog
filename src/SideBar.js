import React from 'react';
import { Paper, Typography, makeStyles, Divider, Chip, Box } from '@material-ui/core';
// import PersonCard from './PersonCard';
// import PopularTags from './PopularTags';

const useStyle = makeStyles((theme) => ({

}));

export default function SideBar(props) {
    const classes = useStyle();
    const {tags} = props;
    return (
        <React.Fragment>
            {/*<PersonCard />*/}
            {/*<PopularTags tags={tags} />*/}
        </React.Fragment>
    )
}
