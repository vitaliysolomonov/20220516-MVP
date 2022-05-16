import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const TopBar = ({user, setUser}) => {

    //Avatar functions
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        let firstLetter = name.split(' ')[0][0];
        let secondLetter = '';
        if (name.split(' ')[1])
            secondLetter = name.split(' ')[1][0];


        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: firstLetter + secondLetter
        };
    }

    // End of Avatar functions


    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={0}>
                            <Grid component={Box} item xs={0} sm={2} display={{ xs: "none", sm: "block" }} textAlign={"left"} paddingLeft={"2em"}>
                                <img src={"/favicon.ico"} alt="Logo" width="35" height="35"/>
                            </Grid>
                            <Grid item xs={6} sm={8}>
                                <Typography fontSize="1.5em" textAlign={"center"} className="title" variant="h6"
                                            component="div" sx={{flexGrow: 1}}>
                                    Battalion S1 Mail Room
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                {
                                    user.name ?
                                        <Stack direction="row" justifyContent="end" paddingRight={"1em"}>
                                            <Avatar {...stringAvatar(user.name)} />
                                            <Button className={"logout"}
                                                    color="inherit"
                                                    onClick={() => setUser({})}
                                            >Log Out</Button>
                                        </Stack>
                                        :
                                        <> </>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default TopBar;