import styled from "styled-components";

import { createContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import ChaiFactory from "../../artifacts/contracts/Chai.sol/ChaiFactory.json";
import FormCompenents from "./Components/FormCompenents";
import { Button } from "@mui/material";
import Footer from "../layout/Footer";

const FormState = createContext();

const Form = () => {
  const [form, setForm] = useState({
    chaiTitle: "",
    bio: "",
    requiredAmount: "",
  });

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const [bioUrl, setBioUrl] = useState();
  const [imageUrl, setImageUrl] = useState();

  const FormHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [image, setImage] = useState(null);

  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const startChai = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    if (form.chaiTitle === "") {
      toast.warn("Title Field Is Empty");
    } else if (form.bio === "") {
      toast.warn("Bio Field Is Empty");
    } else if (form.requiredAmount === "") {
      toast.warn("Required Amount Field Is Empty");
    } else if (uploaded == false) {
      toast.warn("Files Upload Required");
    } else {
      setLoading(true);

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        ChaiFactory.abi,
        signer
      );

      const ChaiAmount = ethers.utils.parseEther(form.requiredAmount);

      const chaiData = await contract.createChai(
        form.chaiTitle,
        ChaiAmount,
        imageUrl,

        bioUrl
      );

      await chaiData.wait();

      setAddress(chaiData.to);
    }
  };

  return (
    <FormState.Provider
      value={{
        form,
        setForm,
        image,
        setImage,
        ImageHandler,
        FormHandler,
        setImageUrl,
        setBioUrl,
        startChai,
        setUploaded,
      }}
    >
      <div>
        <div>
          {loading == true ? (
            address == "" ? (
              <div>
                <TailSpin height={60} />
              </div>
            ) : (
              <h3>
                <h4>Chai Started Sucessfully!</h4>
                <h4>{address}</h4>
                <Button>Go To Chai boy</Button>
              </h3>
            )
          ) : (
            <FormCompenents />
          )}
        </div>
      </div>
      <Footer/>
    </FormState.Provider>
  );
};



export default Form;
export { FormState };
