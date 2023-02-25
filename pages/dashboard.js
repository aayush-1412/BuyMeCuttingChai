


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Footer from '../components/layout/Footer';

import { ethers } from 'ethers';
import ChaiFactory from '../artifacts/contracts/Chai.sol/ChaiFactory.json'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {









    const [chaisData, setChaisData] = useState([]);

    useEffect(() => {process
      
      const Request = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = Web3provider.getSigner();
        const Address = await signer.getAddress();
  
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );
    
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_ADDRESS,
          ChaiFactory.abi,
          provider
        );
    
        const getAllChais = contract.filters.chaiCreated(null, null, Address);
        const AllChais = await contract.queryFilter(getAllChais);
        const AllData = AllChais.map((e) => {
        return {
          title: e.args.title,
          image: e.args.imgURI,
          owner: e.args.owner,
          timeStamp: parseInt(e.args.timestamp),
          amount: ethers.utils.formatEther(e.args.requiredAmount),
          address: e.args.chaiAddress
        }
        })  
        setChaisData(AllData)
      }
      Request();
    }, [])
  











  return (
    <>

{ chaisData.map((e) => {
     return  (
      
      <Card  key={e.title} sx={{ maxWidth: 375,display:"grid",gridTemplateRows:"1fr", justifyContent:"space-between",alignItems:"center", margin:"auto"  }}>
      <div   >

    
      <CardActionArea  >
        <CardMedia
          component="img"
          height="375"
          image={"https://crowdfunding.infura-ipfs.io/ipfs/" + e.image}
          alt="green iguana"
        />
        <CardContent  sx={{backgroundColor:"#202151"}} >
          <Typography sx={{color:"#f8dc9a"}} gutterBottom variant="h5" component="div">
          {e.title}
          </Typography>
          
          <Typography sx={{color:"#f8dc9a",margin:1}}component="div">
          {e.amount} Matic
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{backgroundColor:"#141632"}} >
      <Link passHref href={'/' + e.address}><Button>
            See My Chai 
          </Button></Link>
      </CardActions>
      </div>
      </Card>)
    })}
    <Footer/>
   </>
  );
}