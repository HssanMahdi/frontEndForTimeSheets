import React from 'react'
import ProjectForm from "./ProjectForm";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employees() {

    const classes = useStyles();

    return (
        <>
            <div
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <ProjectForm />
            </Paper>
        </>
    )
}