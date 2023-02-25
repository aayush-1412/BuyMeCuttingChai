import styled from "styled-components";
import Image from "next/image";
import { ethers } from "ethers";
import ChaiFactory from "../artifacts/contracts/Chai.sol/ChaiFactory.json";
import Chai from "../artifacts/contracts/Chai.sol/Chai.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Card,
  InputLabel,
  TextField,
} from "@mui/material";
import Footer from "../components/layout/Footer";

export default function Detail({ Data, DonationsData }) {
  const [mydonations, setMydonations] = useState([]);
  const [bio, setBio] = useState("");
  const [amount, setAmount] = useState();
  const [change, setChange] = useState(false);

  useEffect(() => {
    const Request = async () => {
      let bioData;

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const contract = new ethers.Contract(Data.address, Chai.abi, provider);

      fetch("https://crowdfunding.infura-ipfs.io/ipfs/" + Data.bioUrl)
        .then((res) => res.text())
        .then((data) => (bioData = data));

      const MyDonations = contract.filters.donated(Address);
      const MyAllDonations = await contract.queryFilter(MyDonations);

      setMydonations(
        MyAllDonations.map((e) => {
          return {
            donar: e.args.donar,
            amount: ethers.utils.formatEther(e.args.amount),
            timestamp: parseInt(e.args.timestamp),
          };
        })
      );

      setBio(bioData);
    };

    Request();
  }, [change]);
  const router = useRouter();
  //link grabber
  const[linkgrab,setLinkgrab]=useState("")
  const HandleClick = (e) => {
    if (typeof window !== "undefined") {
      const hostname = window.location.href;
      setLinkgrab(hostname)
    }
  };

  const DonateFunds = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(Data.address, Chai.abi, signer);

      const transaction = await contract.donate({
        value: ethers.utils.parseEther(amount),
      });
      await transaction.wait();

      setChange(true);
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <Card
          sx={{
            borderRadius: "35px",
            maxWidth: 375,
            display: "grid",
            gridTemplateRows: "1fr",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto",
            backgroundColor: "#202151",
          }}
        >
          <CardActionArea>
            <CardMedia
              alt="crowdfunding dapp"
              component="img"
              height="375"
              image={"https://crowdfunding.infura-ipfs.io/ipfs/" + Data.image}
            />
            <CardContent sx={{ backgroundColor: "#202151" }}>
              <Typography
                sx={{ color: "#f8dc9a" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {bio}
              </Typography>
              <Typography variant="body2" color="#f8dc9a">
                {Data.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div>
        <div>
          <InputLabel
            sx={{
              mt: 3,
              fontSize: "20px",
              color: "#f8dc9a9b",
              fontFamily: "Ubuntu",
            }}
          >
            Cutting Chai Price
          </InputLabel>
          <TextField
            value={Data.amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            margin="normal"
            placeholder="Cutting chai price"
            sx={{ backgroundColor: "#1f204e", borderRadius: "15px" }}
          />
          <Button
            sx={{
              left: "25px",
              top: "-2px",
              height: "52px",
              backgroundColor: "#facb60",
              mt: 2.5,
              borderRadius: 2,

              color: "#202151",
              ":hover": {
                bgcolor: "#202151",
                color: "#f8dc9a",
              },
            }}
            variant="contained"
            color="secondary"
            onClick={DonateFunds}
          >
            Donate For My ☕
          </Button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <InputLabel
              sx={{
                mt: 3,
                fontSize: "20px",
                color: "#f8dc9a9b",
                fontFamily: "Ubuntu",
              }}
            >
              Recent Chai
            </InputLabel>
            {DonationsData.map((e) => {
              return (
                <Card
                  key={e.timestamp}
                  sx={{
                    borderRadius: "20px",
                    left: "90px",
                    width: 300,
                    minHeight: 100,
                    display: "grid",
                    gridTemplateRows: "1fr",
                    justifyContent: "space-between",
                    alignItems: "center",

                    backgroundColor: "#1f204e",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      color: "#f8dc9a",
                      margin: "70px",
                    }}
                  >
                    <div>
                      {e.donar.slice(0, 6)}...{e.donar.slice(39)}
                    </div>
                    <div>{e.amount} Matic</div>
                    <div>{new Date(e.timestamp * 1000).toLocaleString()}</div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Button
        sx={{
          backgroundColor: "#facb60",
          mt: 2.5,
          borderRadius: 2,

          color: "#202151",
          ":hover": {
            bgcolor: "#202151",
            color: "#f8dc9a",
          },
          width: "200px",
          margin: "auto",
          top: "25px",
        }}
        onClick={HandleClick}
      >
        Get my Url
      </Button>
      <InputLabel
              sx={{
                mt: 3,
                fontSize: "20px",
                color: "#f8dc9a9b",
                fontFamily: "Ubuntu",
              }}
            >
              {linkgrab}
            </InputLabel>
            
    </div>
  );
}

export async function getStaticPaths() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    ChaiFactory.abi,
    provider
  );

  const getAllChais = contract.filters.chaiCreated();
  const AllChais = await contract.queryFilter(getAllChais);

  return {
    paths: AllChais.map((e) => ({
      params: {
        address: e.args.chaiAddress.toString(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    context.params.address,
    Chai.abi,
    provider
  );

  const title = await contract.title();
  const requiredAmount = await contract.requiredAmount();
  const image = await contract.image();
  const bioUrl = await contract.bio();
  const owner = await contract.owner();
  const receivedAmount = await contract.receivedAmount();

  const Donations = contract.filters.donated();
  const AllDonations = await contract.queryFilter(Donations);

  const Data = {
    address: context.params.address,
    title,
    requiredAmount: ethers.utils.formatEther(requiredAmount),
    image,
    receivedAmount: ethers.utils.formatEther(receivedAmount),
    bioUrl,
    owner,
  };

  const DonationsData = AllDonations.map((e) => {
    return {
      donar: e.args.donar,
      amount: ethers.utils.formatEther(e.args.amount),
      timestamp: parseInt(e.args.timestamp),
    };
  });

  return {
    props: {
      Data,
      DonationsData,
    },
    revalidate: 10,
  };
}

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 98%;
`;
