import * as React from 'react';
import {blue, green, pink} from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function IconAvatars() {
    return (
        <Stack direction="row" spacing={2}>


            <Avatar sx={{ bgcolor: blue[500] }}>
                <AssignmentIcon />
            </Avatar>
        </Stack>
    );
}
