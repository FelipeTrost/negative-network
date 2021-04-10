import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import {
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Card,
  ListItem,
  Grid,
  Fade,
} from "@material-ui/core";
import client from "./feathers";

const date2string = (d) => {
  const date = new Date(d);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

function Comment({ classes, comment, disliked, own, liked, setLiked }) {
  const like = async (id) => {
    if (liked[id]) {
      setLiked({ ...liked, [id]: false });
      client.service("comment").patch(id, { dislike: false });
    } else {
      setLiked({ ...liked, [id]: true });
      client.service("comment").patch(id, { dislike: true });
    }
  };

  return (
    <ListItem>
      <Fade in={true} timeout={800}>
        <Card className={classes.root}>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography
                className={classes.title}
                color={own ? "error" : "textSecondary"}
                gutterBottom
              >
                {comment.name || "Mr/Ms NoName"}
              </Typography>

              {comment.createdAt && (
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {date2string(comment.createdAt)}
                </Typography>
              )}
            </Grid>

            <Typography variant="h5" component="h2">
              {comment.message}
            </Typography>

            {comment.picture && (
              <img
                className="comment-image"
                src={comment.picture}
                alt={comment.message}
              />
            )}
          </CardContent>

          <CardActions>
            <IconButton
              color={disliked ? "primary" : "default"}
              onClick={() => like(comment._id)}
            >
              <ThumbDownAltIcon />
            </IconButton>

            {comment.dislikes}
          </CardActions>
        </Card>
      </Fade>
    </ListItem>
  );
}

export default Comment;
