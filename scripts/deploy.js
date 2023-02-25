const hre = require('hardhat');

async function main() {

    const ChaiFactory = await hre.ethers.getContractFactory("ChaiFactory")
    const chaiFactory = await ChaiFactory.deploy();

    await chaiFactory.deployed();

    console.log("Factory deployed to:", chaiFactory.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });