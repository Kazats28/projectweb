import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const MediaVideo = ({ Url }) => {
  const iframeRef = useRef();

  useEffect(() => {
    console.log("ifram");
    const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [Url]);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        src={Url}
        ref={iframeRef}
        width="100%"
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
};

const MediaVideosSlide = ({ URL }) => {
  return (
    <MediaVideo Url={URL} />
  );
};

export default MediaVideosSlide;