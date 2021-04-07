import { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import PublicIcon from '@material-ui/icons/Public';
import { Button, Container, Fab, Fade, Grow, List, Grid, Avatar, Badge, IconButton } from '@material-ui/core';
import {useLocalStorage} from "react-use-storage";
import client from './feathers';

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

  const [lang, setLang] = useState('');
  const watchRef = useRef(null);

  const setLangW = la => {
    setComments([])
    setLang(la)
  }

  useEffect(()=>{
    watchRef.current && watchRef.current.unsubscribe()

    if(!lang)
      watchRef.current = client.service('comment').watch().find().subscribe(data => setComments(data.reverse()))
    else
      watchRef.current = client.service('comment').watch().find({query: {lang}}).subscribe(data => setComments(data.reverse()))
    // console.log("finding lang");
  }, [lang])

  useEffect(()=>{
    return () =>  watchRef.current.unsubscribe();
  }, [])

  return (
    <Container maxWidth="sm">
      <Grow in={true} timeout={1000}>
        <h1 className={classes.pageTitle} id="page-title">Negative <br /> Network</h1>
      </Grow>

      <Grid
        direction="row"
        wrap="nowrap"
        justify="center"
        container
      >
        <FaqButton classes={classes} />

        <IconButton onClick={() => setLangW()} style={{backgroundColor:'transparent'}} disableRipple>
            <Badge anchorOrigin={{vertical: 'bottom', horizontal: 'right',}} variant="dot" color="primary"
                  invisible={lang}
              >
              <PublicIcon/>
            </Badge>
        </IconButton>

        <Button
          style={{padding:0, backgroundColor:'transparent'}}
          color="transparent"
          disableRipple
          onClick={() => setLangW('es')}
          startIcon={
            <Badge anchorOrigin={{vertical: 'bottom', horizontal: 'right',}} variant="dot" color="primary"
              invisible={lang !== 'es'}
            >
              <Avatar style={{width:22, height:22}} src={'http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg'} />
            </Badge>
          }
          />

        <Button
          style={{padding:0,backgroundColor:'transparent'}}
          size="small"
          disableRipple
          color="transparent"
          onClick={() => setLangW('de')}
          startIcon={
            <Badge anchorOrigin={{vertical: 'bottom', horizontal: 'right',}} variant="dot" color="primary"
              invisible={lang !== 'de'}
            >
              <Avatar style={{width:22, height:22}} src={'http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg'} />
            </Badge>
          }
          />
      </Grid>

      <List>
        {comments.map(c => (
          <Comment key={c._id} classes={classes} comment={c} own={own[c._id]} disliked={liked[c._id]} liked={liked} setLiked={setLiked} />
        ))}
      </List>

      <Fab onClick={() => setModal(true)} className={classes.fab}>
        <Add color="primary" className={classes.Fab} />
      </Fab>

      <UploadForm name={name} setName={setName} modal={modal} setModal={setModal} own={own} setOwn={setOwn} lang={lang} />

      <Cookies />
      </Container>
  );
}

export default App;
