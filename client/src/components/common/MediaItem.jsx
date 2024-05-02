import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import CircularRate from "./CircularRate";

const MediaItem = ({ title, releaseDate, posterUrl, id, rate }) => {
  return (
    <Link to={routesGen.mediaDetail(id)}>
      <Box sx={{
        ...uiConfigs.style.backgroundImage(posterUrl),
        paddingTop: "160%",
        "&:hover .media-info": { opacity: 1, bottom: 0 },
        "&:hover .media-back-drop": { opacity: 1 },
        color: "primary.contrastText"
      }}>
        {/* movie or tv item */}
        {(
          <>
            <Box className="media-back-drop" sx={{
              opacity: { xs: 1, md: 0 },
              transition: "all 0.3s ease",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
            }} />
            <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
                padding: { xs: "10px", md: "2rem 1rem" }
              }}
            >
              <Stack spacing={{ xs: 1, md: 2 }}>
                <CircularRate value={rate} />

                <Typography>Ngày công chiếu: {releaseDate}</Typography>

                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{
                    fontSize: "1rem",
                    ...uiConfigs.style.typoLines(1, "left")
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
          </>
        )}
        {/* movie or tv item */}
      </Box>
    </Link>
  );
};

export default MediaItem;