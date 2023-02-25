import React from "react";
import { Typography, Button } from "@mui/material";
import bg from "../public/tea.png";
import Image from "next/image";

import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography id="textId" style={{ fontSize: 36 }}>
        Buy Me A Cutting Chai!
      </Typography>
      <Image alt="s" src={bg} style={{ minWidth: "300px", maxWidth: "35%" }} />
      <Button
        onClick={() => router.push("/createchai")}
        sx={{ color: "#facb60" }}
      >
        {" "}
        Get Started
      </Button>
    </div>
  );
};

export default Home;
