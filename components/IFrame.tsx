import React from "react";

function IFrame({ src, width = "100%", aspectRatio = "1/1", minWidth }: any) {
  //console.log(src);
  //console.log(aspectRatio);
  return (
    <iframe
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        width: width,
        minWidth: minWidth,
        aspectRatio: aspectRatio,
      }}
      src={src}
    ></iframe>
  );
}

export default IFrame;
