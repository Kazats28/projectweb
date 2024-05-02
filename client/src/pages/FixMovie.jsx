import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { updateMovie, getMovieDetails } from "../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { useParams } from "react-router-dom";
const labelProps = {
  mt: 1,
  mb: 1,
};
const FixMovie = () => {
  const movieId = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    movieId: movieId,
    title: "",
    description: "",
    posterUrl: "",
    backgroundUrl: "",
    videoUrl: "",
    releaseDate: ""
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [mons, setMons] = useState([]);
  const [mon, setMon] = useState("");
  const [tues, setTues] = useState([]);
  const [tue, setTue] = useState("");
  const [weds, setWeds] = useState([]);
  const [wed, setWed] = useState("");
  const [thus, setThus] = useState([]);
  const [thu, setThu] = useState("");
  const [fris, setFris] = useState([]);
  const [fri, setFri] = useState("");
  const [sats, setSats] = useState([]);
  const [sat, setSat] = useState("");
  const [suns, setSuns] = useState([]);
  const [sun, setSun] = useState("");
  const [backdrops, setBackdrops] = useState([]);
  const [backdrop, setBackdrop] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setGlobalLoading(true));
    getMovieDetails(movieId) 
      .then((res) => {
        inputs.title = res.movie.title;
        inputs.description = res.movie.description;
        inputs.posterUrl = res.movie.posterUrl;
        inputs.backgroundUrl = res.movie.backgroundUrl;
        inputs.videoUrl = res.movie.videoUrl;
        inputs.releaseDate = res.movie.releaseDate;
        setActors(res.movie.actors);
        setGenres(res.movie.genres);
        setMons(res.movie.mons);
        setTues(res.movie.tues);
        setWeds(res.movie.weds);
        setThus(res.movie.thus);
        setFris(res.movie.thus);
        setSats(res.movie.sats);
        setSuns(res.movie.suns);
        setBackdrops(res.movie.backdrops);
      })
      .catch((err) => console.log(err))
    dispatch(setGlobalLoading(false));
  }, [movieId]);
  const handChange = (event, index, arrayName) => {
    const { value } = event.target;
    switch (arrayName) {
      case 'mons':
        setMons(prevMons => {
          const updatedMons = [...prevMons];
          updatedMons[index] = value;
          return updatedMons;
        });
        break;
      case 'tues':
        setTues(prevTues => {
          const updatedTues = [...prevTues];
          updatedTues[index] = value;
          return updatedTues;
        });
        break;
      case 'weds':
        setWeds(prevWeds => {
          const updatedWeds = [...prevWeds];
          updatedWeds[index] = value;
          return updatedWeds;
        });
        break;
      case 'thus':
        setThus(prevThus => {
          const updatedThus = [...prevThus];
          updatedThus[index] = value;
          return updatedThus;
        });
        break;
      case 'fris':
        setFris(prevFris => {
          const updatedFris = [...prevFris];
          updatedFris[index] = value;
          return updatedFris;
        });
        break;
      case 'sats':
        setSats(prevSats => {
          const updatedSats = [...prevSats];
          updatedSats[index] = value;
          return updatedSats;
        });
        break;
      case 'suns':
        setSuns(prevSuns => {
          const updatedSuns = [...prevSuns];
          updatedSuns[index] = value;
          return updatedSuns;
        });
        break;
      case 'actors':
      setActors(prevActors => {
        const updatedActors = [...prevActors];
        updatedActors[index] = value;
        return updatedActors;
      });
      break;
      case 'genres':
      setGenres(prevGenres => {
        const updatedGenres = [...prevGenres];
        updatedGenres[index] = value;
        return updatedGenres;
      });
      break;
      case 'backdrops':
      setBackdrops(prevBackdrops => {
        const updatedBackdrops = [...prevBackdrops];
        updatedBackdrops[index] = value;
        return updatedBackdrops;
      });
      break;
      default:
        break;
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    updateMovie({ ...inputs, actors, backdrops, genres, mons, tues, weds, thus, fris, sats, suns})
      .then((res) => {console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={{xs: "100%", sm: "80%", md: "50%"}}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"0px 0px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            <b>SỬA PHIM</b>
          </Typography>
          <FormLabel sx={labelProps}>Tên phim</FormLabel>
          <TextField
              value={inputs.title}
              onChange={handleChange}
              name="title"
              color="success"
              sx={{ width: "100%" }}
              autoFocus
          />
          <FormLabel sx={labelProps}>Giới thiệu</FormLabel>
          <TextField
              value={inputs.description}
              onChange={handleChange}
              name="description"
              color="success"
              sx={{ width: "100%" }}
              autoFocus
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
              value={inputs.posterUrl}
              onChange={handleChange}
              name="posterUrl"
              color="success"
              sx={{ width: "100%" }}
              autoFocus
          />
          <FormLabel sx={labelProps}>Background URL</FormLabel>
          <TextField
              value={inputs.backgroundUrl}
              onChange={handleChange}
              name="backgroundUrl"
              color="success"
              sx={{ width: "100%" }}
              autoFocus
          />
          <FormLabel sx={labelProps}>Video URL</FormLabel>
          <TextField
              value={inputs.videoUrl}
              onChange={handleChange}
              name="videoUrl"
              color="success"
              sx={{ width: "100%" }}
              autoFocus
          />
          <FormLabel sx={labelProps}>Backdrop URL</FormLabel>
            <Box display={"flex"} >
              <TextField
                value={backdrop}
                name="backdrop"
                onChange={(e) => setBackdrop(e.target.value)}
                color="success"
                sx={{ width: "50%" }}
                autoFocus
              />
              <Button
                onClick={() => {
                  setBackdrops([...backdrops, backdrop]);
                  setBackdrop("");
                }}
              >
                Thêm
              </Button>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              {backdrops && backdrops.map((backdrop, index) => (
                <Box display={"flex"} flexDirection={"row"}>
                <TextField
                  value={backdrop}
                  name="backdrop"
                  onChange={(e) => handChange(e, index, "backdrops")}
                  color="success"
                  sx={{ width: "30%" }}
                  autoFocus
                  size="small"
                />
                <Button
                  onClick={() => {
                    setBackdrops(backdrops.filter((item, key) => key != index));
                  }}
                >
                  Xóa
                </Button>
                </Box>
              ))}
            </Box>
          <FormLabel sx={labelProps}>Ngày phát hành</FormLabel>
          <TextField
              type={"date"}
              value={inputs.releaseDate}
              onChange={handleChange}
              name="releaseDate"
              color="success"
              sx={{ width: "100%" }}
              autoFocus
          />
          <FormLabel sx={labelProps}>Diễn viên</FormLabel>
          <Box display={"flex"} >
            <TextField
              value={actor}
              name="actor"
              onChange={(e) => setActor(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {actors && actors.map((actor, index) => (
              <Box display={"flex"} flexDirection={"row"}>
              <TextField
                value={actor}
                name="actor"
                onChange={(e) => handChange(e, index, "actors")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
              <Button
                onClick={() => {
                  setActors(actors.filter((item, key) => key != index));
                }}
              >
                Xóa
              </Button>
              </Box>
            ))}
          </Box>
          <FormLabel sx={labelProps}>Thể loại</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={genre}
              name="genre"
              onChange={(e) => setGenre(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setGenres([...genres, genre]);
                setGenre("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {genres && genres.map((genre, index) => (
              <Box display={"flex"} flexDirection={"row"}>
              <TextField
                value={genre}
                name="genre"
                onChange={(e) => handChange(e, index, "genres")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
              <Button
                onClick={() => {
                  setGenres(genres.filter((item, key) => key != index));
                }}
              >
                Xóa
              </Button>
              </Box>
            ))}
          </Box>
          <FormLabel sx={labelProps}>Lịch chiếu phim</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={mon}
              name="mon"
              placeholder="Thứ hai"
              onChange={(e) => setMon(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setMons([...mons, mon]);
                setMon("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {mons && mons.map((mon, index) => (
              <TextField
                value={mon}
                name="mon"
                onChange={(e) => handChange(e, index, "mons")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
            ))}
          </Box>
          <Box display={"flex"} marginTop={1}>
            <TextField
              value={tue}
              name="tue"
              placeholder="Thứ ba"
              onChange={(e) => setTue(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setTues([...tues, tue]);
                setTue("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {tues && tues.map((tue, index) => (
              <Box display={"flex"} flexDirection={"row"}>
              <TextField
                value={tue}
                name="tue"
                onChange={(e) => handChange(e, index, "tues")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
              <Button
                onClick={() => {
                  setTues(tues.filter((item, key) => key != index));
                }}
              >
                Xóa
              </Button>
              </Box>
            ))}
          </Box>
          <Box display={"flex"} marginTop={1}>
            <TextField
              value={wed}
              name="wed"
              placeholder="Thứ tư"
              onChange={(e) => setWed(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setWeds([...weds, wed]);
                setWed("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {weds && weds.map((wed, index) => (
              <Box display={"flex"} flexDirection={"row"}>
              <TextField
                value={wed}
                name="wed"
                onChange={(e) => handChange(e, index, "weds")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
              <Button
                onClick={() => {
                  setWeds(weds.filter((item, key) => key != index));
                }}
              >
                Xóa
              </Button>
              </Box>
            ))}
          </Box>
          <Box display={"flex"} marginTop={1}>
            <TextField
              value={thu}
              name="thu"
              placeholder="Thứ năm"
              onChange={(e) => setThu(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setThus([...thus, thu]);
                setThu("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {thus && thus.map((thu, index) => (
              <Box display={"flex"} flexDirection={"row"}>
              <TextField
                value={thu}
                name="thu"
                onChange={(e) => handChange(e, index, "thus")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
              <Button
                onClick={() => {
                  setThus(thus.filter((item, key) => key != index));
                }}
              >
                Xóa
              </Button>
              </Box>
            ))}
          </Box>
          <Box display={"flex"} marginTop={1}>
            <TextField
              value={fri}
              name="fri"
              placeholder="Thứ sáu"
              onChange={(e) => setFri(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setFris([...fris, fri]);
                setFri("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {fris && fris.map((fri, index) => (
              <Box display={"flex"} flexDirection={"row"}>
              <TextField
                value={fri}
                name="fri"
                onChange={(e) => handChange(e, index, "fris")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
              <Button
                onClick={() => {
                  setFris(fris.filter((item, key) => key != index));
                }}
              >
                Xóa
              </Button>
              </Box>
            ))}
          </Box>
          <Box display={"flex"} marginTop={1}>
            <TextField
              value={sat}
              name="sat"
              placeholder="Thứ bảy"
              onChange={(e) => setSat(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setSats([...sats, sat]);
                setSat("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {sats && sats.map((sat, index) => (
              <Box display={"flex"} flexDirection={"row"}>
              <TextField
                value={sat}
                name="sat"
                onChange={(e) => handChange(e, index, "sats")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
              <Button
                onClick={() => {
                  setSats(sats.filter((item, key) => key != index));
                }}
              >
                Xóa
              </Button>
              </Box>
            ))}
          </Box>
          <Box display={"flex"} marginTop={1}>
            <TextField
              value={sun}
              name="sun"
              placeholder="Chủ nhật"
              onChange={(e) => setSun(e.target.value)}
              color="success"
              sx={{ width: "50%" }}
              autoFocus
            />
            <Button
              onClick={() => {
                setSuns([...suns, sun]);
                setSun("");
              }}
            >
              Thêm
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {suns && suns.map((sun, index) => (
              <Box display={"flex"} flexDirection={"row"}>
              <TextField
                value={sun}
                name="sun"
                onChange={(e) => handChange(e, index, "suns")}
                color="success"
                sx={{ width: "30%" }}
                autoFocus
                size="small"
              />
              <Button
                onClick={() => {
                  setSuns(suns.filter((item, key) => key != index));
                }}
              >
                Xóa
              </Button>
              </Box>
            ))}
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
              marginTop: 4
            }}
          >
            SỬA PHIM
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default FixMovie;
