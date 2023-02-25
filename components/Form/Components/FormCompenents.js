import { TextField, Typography, Button, InputLabel, Box } from "@mui/material";
import React from "react";
import { FormState } from "../Form";


import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { create as IPFSHTTPClient } from "ipfs-http-client";

const projectId = "2MBr0Ghs2nWsh0RAdpooHFPrRW2";
const projectSecret = "aefd23a4080aae3e15fae48949718751";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = IPFSHTTPClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
const FormCompenents = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (Handler.form.bio !== "") {
      try {
        const added = await client.add(Handler.form.bio);
        Handler.setBioUrl(added.path);
      } catch (error) {
        toast.warn(`Error Uploading Bio`);
      }
    }

    if (Handler.image !== null) {
      try {
        const added = await client.add(Handler.image);
        Handler.setImageUrl(added.path);
      } catch (error) {
        toast.warn(`Error Uploading Image`);
      }
    }

    setUploadLoading(false);
    setUploaded(true);
    Handler.setUploaded(true);
    toast.success("Files Uploaded Sucessfully");
  };
  const labelStyles = { mt:3,  fontSize: "20px",color: "#f8dc9a9b", fontFamily:'Ubuntu'}

const buttonStyle={
  backgroundColor:'#facb60',
  mt:2.5,
  borderRadius:2,
  
   color:'#202151',
  ':hover': {
    bgcolor: '#202151', 
    color: '#f8dc9a',
  },
}

  return (
    <div>
      <form>
        <Box
          borderColor="whitesmoke"
          borderRadius={5}
          padding={4}
          margin="auto"
          marginTop={2}
          display="flex"
          flexDirection={"column"}
          minWidth={300}
          maxWidth={800}
          width={"70%"}
          style={{ backgroundColor: "#202151" }}
          boxShadow="20px 20px 35px 0px rgba(0,0,0,0.37);"
          // maxHeight={600}
        >
          <Typography
            fontWeight={"bold"}
            padding={2}
            color="grey"
            variant="h4"
            textAlign={"center"}
            id="textId"
          >
            Create My Chai
          </Typography>
          <InputLabel sx={labelStyles}>Name</InputLabel>
          <TextField
            id="inputId"
            margin="normal"
            variant="outlined"
            placeholder="Your name"
            onChange={Handler.FormHandler}
            value={Handler.form.chaiTitle}
            name="chaiTitle"
          />
          <InputLabel sx={labelStyles}>Bio</InputLabel>
          <TextField
            id="inputId"
            margin="normal"
            variant="outlined"
            placeholder="About me"
            onChange={Handler.FormHandler}
            value={Handler.form.bio}
            name="bio"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              justifyContent: "space-around",
            }}
          ></div>
          <InputLabel sx={labelStyles}>Price for My Cutting chai </InputLabel>
          <TextField
            onChange={Handler.FormHandler}
            value={Handler.form.requiredAmount}
            name="requiredAmount"
            margin="normal"
            variant="outlined"
            id="inputId"
            type="number"
          />
          <InputLabel sx={labelStyles}>Profile Picture</InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            name="splitCategory"
            id="inputId"
            type="file"
            alt="dapp"
            onChange={Handler.ImageHandler}
            placeholder="Set your Dp"
          />
          {uploadLoading == true ? (
            <Button>
              <TailSpin color="#fff" height={20} />
            </Button>
          ) : uploaded == false ? (
            <Button sx={buttonStyle} variant="contained" onClick={uploadFiles}>
              Upload Files to IPFS
            </Button>
          ) : (
            <Button
              sx={buttonStyle}
              variant="contained"
              style={{ cursor: "no-drop" }}
            >
              Files uploaded Sucessfully
            </Button>
          )}
          <Button
            sx={buttonStyle}
            variant="contained"
            color="secondary"
            onClick={Handler.startChai}
          >
            Create My Chai
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default FormCompenents;
