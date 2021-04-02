import { useContext } from "react";
import CloseIcon from '@material-ui/icons/Close';
import {  Grid as UIGrid, Dialog, DialogContent,  Toolbar, AppBar, IconButton, makeStyles, Container } from '@material-ui/core';
import { Grid, SearchBar, SearchContext, SuggestionBar } from "@giphy/react-components";


const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: '#393e46'
    },
    appBar: {
      position: 'relative',
      backgroundColor: "#222831"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    marginT:{
        marginTop: 30
    },
    marginB:{
        marginTop: 30,
        marginBottom: 30
    }
  }))

const pxWidth = (percent, max) => {
    const target = window.innerWidth * percent;
    return target > max ? max : target;
}

function GiphyModal({open, close, setImage}) {
    const classes = useStyles();

    const { fetchGifs, term, channelSearch, activeChannel } = useContext(SearchContext);

    return (
        <Dialog fullScreen open={open} onClose={close} aria-labelledby="add-comment" >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <DialogContent className={classes.root}>
                <Container maxWidth="md">
                <SearchBar className={classes.marginB} />

                <SuggestionBar />

                <UIGrid
                    direction="row"
                    justify="center"
                    className={classes.marginT}
                    container
                >
                    <Grid
                        key={`${channelSearch} ${term} ${activeChannel?.user.username}`}
                        width={pxWidth(.8, 800)}
                        columns={pxWidth(.8, 800) >= 700 ? 3 : 2}
                        fetchGifs={fetchGifs}
                        noLink
                        onGifClick={gif => {
                            setImage(gif.images["downsized_large"].url)
                            close()
                        }}
                    />
                </UIGrid>
                </Container>
            </DialogContent>
        </Dialog>
    );
}

export default GiphyModal;
