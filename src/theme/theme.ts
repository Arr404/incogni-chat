import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#00ADB5',
        },
        background: {
            default: '#222831',
            paper: '#393E46'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#CCCCCC'
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif'
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00ADB5',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00ADB5',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00ADB5',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#CCCCCC',
                    '&.Mui-focused': {
                        color: '#00ADB5',
                    },
                },
            },
        },
    }
});
