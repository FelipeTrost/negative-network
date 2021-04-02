import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { IconButton, Typography, CardContent, CardActions, Card, Container, Fab, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, Grid } from '@material-ui/core';
import {useLocalStorage} from "react-use-storage";
import client from './feathers';
import Cookies from './Cookies';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const asyncLiked = "dislikeNetwork";
const asyncName = "dislikeNetwork-name";
const asyncOwn = "dislikeNetwork-own";

const useStyles = makeStyles({
  pageTitle:{
    position: "sticky",
    letterSpacing: 10 ,
    fontFamily: "Bungee",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  root: {
    width: "100%"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    maxWidth: "40%"
  },
  pos: {
    marginBottom: 12,
  },
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },

});

const date2string = d => {
  const date = new Date(d);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

function App() {
  const [comments, setComments] = useState([]);
  const [liked, setLiked, removeValue] = useLocalStorage(asyncLiked, {});
  const [own, setOwn, removeOwn] = useLocalStorage(asyncOwn, {});
  const [name, setName, removeName] = useLocalStorage(asyncName, "");
  const [message, setMessage] = useState("");
  const [imageField, setImageField] = useState("");
  const [modal, setModal] = useState(false);
  const [showpic, setShowpic] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setShowpic(false);
  }, [imageField])

  useEffect(()=>{
    client.service('comment').watch().find().subscribe(data => setComments(data.reverse()))
  }, [])

  const like = async (id, idx) => {
    if(liked[id]){
      setLiked({...liked, [id]:false});
      client.service('comment').patch(id ,{dislike: false});
    }else{
      setLiked({...liked, [id]:true});
      client.service('comment').patch(id, {dislike: true});
    }
  }

  const upload = async () => {
    if(!message || !name) {
      alert("Message and Name can't be blank");
      return;
    }

    setModal(false);

    const brandNew = await client.service('comment').create({message, name, picture: imageField})

    setOwn({...own, [brandNew._id]: true});
    setMessage("")
    setImageField("")
  }

  return (
    <Container maxWidth="sm">
      <h1 className={classes.pageTitle}>Negative <br /> Network</h1>

      {/* <List> */}
        <TransitionGroup
          component={List}
        >
          {comments.map((c, idx) => (
            <CSSTransition
              className="fade"
              timeout={500}
              key={c._id}
            >
              <ListItem key={c._id}>
                <Card className={classes.root}>
                  <CardContent>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                      <Typography className={classes.title} color={own[c._id] ? "error" : "textSecondary"} gutterBottom>
                        {c.name || "Mr/Ms NoName"}
                      </Typography>

                      {c.createdAt && <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {date2string(c.createdAt)}
                      </Typography>}
                    </Grid>

                    <Typography variant="h5" component="h2">
                      {c.message}
                    </Typography>

                    {c.picture && <img className="comment-image" src={c.picture} />}
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color={liked[c._id] ? "primary" : "default"}
                      onClick={() => like(c._id, idx)}
                    >
                      <ThumbDownAltIcon />
                    </IconButton>
                    {c.dislikes}
                  </CardActions>
                </Card>
              </ListItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      {/* </List> */}

      <Fab onClick={() => setModal(true)} className={classes.fab}>
        <Add color="primary" className={classes.Fab} />
      </Fab>
      <Dialog open={modal} onClose={() => setModal(false)} aria-labelledby="add-comment">
        <DialogTitle id="form-dialog-title">Be stupid</DialogTitle>

        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Comment"
            margin="dense"
            // multiline
            fullWidth
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Image link (optional)"
            type="text"
            value={imageField}
            onChange={e => setImageField(e.target.value)}
            fullWidth
          />

          <img className="comment-image" src={imageField} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={upload} color="secondary">
            Noooo
          </Button>
        </DialogActions>
      </Dialog>
      <Cookies />
      </Container>
  );
}

export default App;
