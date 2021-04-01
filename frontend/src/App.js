import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { IconButton, Typography, CardContent, CardActions, Card, Container, Fab, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem } from '@material-ui/core';
import {useLocalStorage} from "react-use-storage";

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
  },
  pos: {
    marginBottom: 12,
  },
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 200,
  },

});

const server = "https://negativitynetwork.herokuapp.com"
// const server = "http://localhost:5000"

function App() {
  const [comments, setComments] = useState([]);
  const [liked, setLiked, removeValue] = useLocalStorage(asyncLiked, {});
  const [own, setOwn, removeOwn] = useLocalStorage(asyncOwn, {});
  const [name, setName, removeName] = useLocalStorage(asyncName, "");
  const [message, setMessage] = useState("Sample message");
  const [modal, setModal] = useState(false);
  const classes = useStyles();

  useEffect(()=>{
    fetchInfo()
  }, [])

  const fetchInfo = () => {
    fetch(`${server}/api/comment`)
    .then(r => r.json())
    .then(r => setComments(r.comments.reverse()))
  }

  const like = async (id, idx) => {
    const copy = [...comments];

    if(liked[id]){
      setLiked({...liked, [id]:false});
      copy[idx].dislikes--;
      setComments(copy);
      await fetch(`${server}/api/like`,{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "DELETE",
          body: JSON.stringify({id})
      })
    }else{
      setLiked({...liked, [id]:true});
      copy[idx].dislikes++;
      setComments(copy);
      await fetch(`${server}/api/like`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({id})
      });
    }
  }

  const upload = async () => {
    const res = await fetch(`${server}/api/comment`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({message, name})
    });

    const { id, success } = await res.json();

    if(!success){
      alert("Nope, there was an error, maybe check your input");
      return;
    }

    fetchInfo();
    setMessage("Sample message")
    setModal(false);
    setOwn({...own, [id]: true});
  }

  return (
    <Container maxWidth="sm">
      <h1 className={classes.pageTitle}>Negative Network</h1>

      <List>
      {comments.map((c, idx) => (
        <ListItem key={c._id}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color={own[c._id] ? "error" : "textSecondary"} gutterBottom>
              {c.name || "Mr/Ms NoName"}
            </Typography>
            <Typography variant="h5" component="h2">
              {c.message}
            </Typography>
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
      ))}
      </List>

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
            // label="Multiline"
            margin="dense"
            multiline
            fullWidth
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
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
      </Container>
  );
}

export default App;
