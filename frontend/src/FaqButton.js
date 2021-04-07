import { useState } from "react";
import InfoIcon from '@material-ui/icons/Info';
import { IconButton, Popover, Typography } from '@material-ui/core';

function FaqButton({ classes }) {
  const [infoAnchor, setInfoanchor] = useState(null)

  return (
    <>
        <IconButton style={{backgroundColor:'transparent'}} onClick={e => setInfoanchor(e.target)}> <InfoIcon /> </IconButton>

        <Popover
            id='mouse-over-popover'
            open={Boolean(infoAnchor)}
            anchorEl={infoAnchor}
            onClose={() => setInfoanchor(null)}

            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}

            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Typography className={classes.info}>You can only dislike 😁</Typography>
        </Popover>
    </>
  );
}

export default FaqButton;
