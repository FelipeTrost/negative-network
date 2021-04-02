
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import {useLocalStorage} from "react-use-storage";

const asyncCookies = "dislikeNetwork-cookies";

function App() {
  const [cookieAgreement, setCookieAgreement] = useLocalStorage(asyncCookies, false);

  return (
    <Dialog
        open={!cookieAgreement}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">Cookies</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            In order to work, this page uses <b>only</b> essential cookies.
        </DialogContentText>
        </DialogContent>
        <DialogActions>

        <Button onClick={() => setCookieAgreement(true)} color="primary" autoFocus>
            Agree
        </Button>
        </DialogActions>
    </Dialog>
  );
}

export default App;
