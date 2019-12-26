import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    content: {
        width: `calc(100% - 60px)`,
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    centerGridButton: {
        display: 'flex',
        alignItems: 'center',
    },
    swatch: {
        width: 15,
        height: 15,
        borderRadius: '3px',
        // border: '1px solid ',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        margin: '0 7px',
    },
}));

export default useStyles;