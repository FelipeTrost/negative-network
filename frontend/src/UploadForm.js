import { useState } from "react";
import {  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import client from './feathers';

function UploadForm({modal, setModal, name, setName, own, setOwn}) {
  const [message, setMessage] = useState("");
  const [imageField, setImageField] = useState("");

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

            <img className="comment-image" src={imageField} alt={imageField && "Not found"} />
        </DialogContent>

        <DialogActions>
            <Button onClick={() => setModal(false)} color="primary">Cancel</Button>

            <Button onClick={upload} color="secondary">Noooo</Button>
        </DialogActions>
    </Dialog>
  );
}

export default UploadForm;
