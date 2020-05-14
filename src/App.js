import React from "react";
import {
  CssBaseline,
  AppBar,
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Badge,
} from "@material-ui/core";

import { JokeCard, Spinner } from "./components";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(null);

  const [jokesToShow, setJokesToShow] = React.useState([]);
  const [favoriteJokes, setFavoriteJokes] = React.useState([]);

  React.useEffect(() => {
    getJokes();
    // eslint-disable-next-line
  }, [currentPage]);

  React.useEffect(() => {
    getFavoriteJokesFromLS();
  }, []);

  const getJokes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://icanhazdadjoke.com/search?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      setTotalPages(data.total_pages);
      setJokesToShow([...jokesToShow, ...data.results]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getFavoriteJokesFromLS = () => {
    const favoriteJokes = JSON.parse(localStorage.getItem("favorites"));
    setFavoriteJokes(favoriteJokes || []);
  };

  const changeTab = (e, value) => {
    setCurrentTab(value);
  };

  const addToFavoriteJokes = (id) => {
    const joke = jokesToShow.find((j) => j.id === id);
    const newFavoriteJokes = [joke, ...favoriteJokes];
    setFavoriteJokes(newFavoriteJokes);
    localStorage.setItem("favorites", JSON.stringify(newFavoriteJokes));
  };

  const removeFromFavoriteJokes = (id) => {
    const newFavoriteJokes = favoriteJokes.filter((j) => j.id !== id);
    setFavoriteJokes(newFavoriteJokes);
    localStorage.setItem("favorites", JSON.stringify(newFavoriteJokes));
  };

  const addMoreJokes = () => {
    if (currentPage < totalPages)
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const observeElement = (element) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          addMoreJokes();
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );

    observer.observe(element);
  };

  React.useEffect(() => {
    const lastJokeEl = document.getElementById(
      `joke-${jokesToShow.length - 1}`
    );
    observeElement(lastJokeEl);
    // eslint-disable-next-line
  }, [jokesToShow]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container style={{ maxWidth: 1000 }}>
        <Typography
          variant="h1"
          align="center"
          style={{ margin: "4rem 0", fontSize: "4rem" }}
        >
          Jokes App
        </Typography>
        <AppBar position="sticky" color="default">
          <Tabs
            value={currentTab}
            onChange={changeTab}
            variant="fullWidth"
            centered
          >
            <Tab label="Jokes" id="jokes-tab" aria-controls="jokes-panel" />
            <Tab
              label={
                <Badge
                  color="secondary"
                  badgeContent={
                    favoriteJokes.length > 0 ? favoriteJokes.length : null
                  }
                >
                  Favorites<span>&emsp;</span>
                </Badge>
              }
              id="favorites-tab"
              aria-controls="favorites-panel"
            />
          </Tabs>
        </AppBar>
        <Box role="tabpanel" hidden={currentTab !== 0} my={4}>
          {/* Joke Cards */}
          {/* eslint-disable-next-line */}
          {jokesToShow.map((joke, index) => (
            <JokeCard
              id={`joke-${index}`}
              key={joke.id}
              joke={joke}
              favorite={favoriteJokes.some((j) => j.id === joke.id)}
              addToFavoriteJokes={addToFavoriteJokes}
              removeFromFavoriteJokes={removeFromFavoriteJokes}
            />
          ))}
          {loading && <Spinner />}
        </Box>
        <Box role="tabpanel" hidden={currentTab !== 1} my={4}>
          {favoriteJokes.map((joke) => (
            <JokeCard
              key={joke.id}
              joke={joke}
              favorite={favoriteJokes.some((j) => j.id === joke.id)}
              addToFavoriteJokes={addToFavoriteJokes}
              removeFromFavoriteJokes={removeFromFavoriteJokes}
            />
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
