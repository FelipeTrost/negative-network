import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { SearchContextManager } from "@giphy/react-components";

import GiphyModal from "./GiphyModal";
import client from "./feathers";

function UploadForm({ modal, setModal, name, setName, own, setOwn, lang }) {
  const [message, setMessage] = useState("");
  const [imageField, setImageField] = useState("");
  const [giphyModal, setGiphyModal] = useState("");

  const upload = async () => {
    if (!message || !name) {
      alert("Message and Name can't be blank");
      return;
    }

    setModal(false);
    const creating = { message, name, lang, picture: imageField };
    console.log(creating);
    const brandNew = await client.service("comment").create(creating);

    setOwn({ ...own, [brandNew._id]: true });
    setMessage("");
    setImageField("");
  };

  return (
    <>
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="add-comment"
      >
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
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Comment"
            margin="dense"
            // multiline
            fullWidth
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/*
          <Grid
            direction="row"
            wrap="nowrap"
            alignItems="baseline"
            justify="space-between"
            container
          >
            <TextField
              margin="dense"
              label="Image link (optional)"
              type="text"
              value={imageField}
              onChange={(e) => setImageField(e.target.value)}
              style={{ width: "60%" }}
            />

            <Typography>Or</Typography> */}

          <br />
          <br />
          <Button
            styles={{ margin: "16px" }}
            onClick={() => setGiphyModal(true)}
            style={{ width: "20%" }}
            variant="contained"
            color="secondary"
          >
            Giphy
          </Button>
          {/* </Grid> */}

          <img
            className="comment-image"
            src={imageField}
            alt={imageField && "Not found"}
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

      <SearchContextManager apiKey={"sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh"}>
        <GiphyModal
          open={giphyModal}
          close={() => setGiphyModal(false)}
          setImage={setImageField}
        />
      </SearchContextManager>
    </>
  );
}

export default UploadForm;
