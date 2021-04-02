import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import { Container, Fab, List } from '@material-ui/core';
import {useLocalStorage} from "react-use-storage";
import client from './feathers';
import { TransitionGroup } from 'react-transition-group';

import Cookies from './Cookies';
import Comment from "./Comment";
import UploadForm from "./UploadForm";
import FaqButton from "./FaqButton";

const asyncLiked = "dislikeNetwork";
const asyncName = "dislikeNetwork-name";
const asyncOwn = "dislikeNetwork-own";

const useStyles = makeStyles({
  pageTitle:{
    position: "sticky",
    letterSpacing: 10 ,
    fontFamily: "Bungee",
    textAlign: "center",
    margin: 15
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
  info:{
    padding: 20
  }

});

function App() {
  const [liked, setLiked] = useLocalStorage(asyncLiked, {});
  const [own, setOwn] = useLocalStorage(asyncOwn, {});
  const [name, setName] = useLocalStorage(asyncName, "");

  const [comments, setComments] = useState([]);
  const [modal, setModal] = useState(false);
  const classes = useStyles();

  useEffect(()=>{
    client.service('comment').watch().find().subscribe(data => setComments(data.reverse()))
  }, [])

  return (
    <Container maxWidth="sm">
      <h1 className={classes.pageTitle} id="page-title">Negative <br /> Network</h1>

      <FaqButton classes={classes} />

        <TransitionGroup component={List}>
          {comments.map(c => (
              <Comment key={c._id} classes={classes} comment={c} own={own[c._id]} disliked={liked[c._id]} liked={liked} setLiked={setLiked} />
          ))}
        </TransitionGroup>

      <Fab onClick={() => setModal(true)} className={classes.fab}>
        <Add color="primary" className={classes.Fab} />
      </Fab>

      <UploadForm name={name} setName={setName} modal={modal} setModal={setModal} own={own} setOwn={setOwn} />

      <Cookies />
      </Container>
  );
}

export default App;
