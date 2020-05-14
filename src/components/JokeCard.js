import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    marginBottom: 20,
  },
  cardContent: {
    paddingRight: 0,
  },
});

function JokeCard({
  joke,
  favorite,
  addToFavoriteJokes,
  removeFromFavoriteJokes,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card} {...rest}>
      <Box
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-end", sm: "center" }}
      >
        <CardContent className={classes.cardContent}>
          <Typography variant="body1">{joke.joke}</Typography>
        </CardContent>
        <CardActions>
          {favorite ? (
            <IconButton
              aria-label="unfavorite"
              color="secondary"
              onClick={() => removeFromFavoriteJokes(joke.id)}
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="favorite"
              color="secondary"
              onClick={() => addToFavoriteJokes(joke.id)}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
        </CardActions>
      </Box>
    </Card>
  );
}

JokeCard.propTypes = {
  joke: PropTypes.object.isRequired,
  favorite: PropTypes.bool.isRequired,
  addToFavoriteJokes: PropTypes.func.isRequired,
  removeFromFavoriteJokes: PropTypes.func.isRequired,
};

export default JokeCard;
