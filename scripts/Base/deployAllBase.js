// This script will deploy all the base implementation contracts, Token, Timelock and Governor
async function deployAllBase() {
 
 // Token Deployment
 const Token = await ethers.getContractFactory("Token");
 const token = await Token.deploy();
 await token.deployed();

 const tokenAddress = token.address;

 console.log("Token address:", tokenAddress);
 console.log("Successfully deployed token!");
  
 // Timelock Deployment
 const Timelock = await ethers.getContractFactory("Timelock");
 const timelock = await Timelock.deploy();
 await timelock.deployed();
 
 const timelockAddress = timelock.address;

 console.log("TimeLock address:", timelockAddress); 
 console.log("Successfully deployed Timelock!")

 // GovernorAlpha Deployment 
 const GovernorAlpha = await ethers.getContractFactory("GovernorAlpha");
  const governorAlpha = await GovernorAlpha.deploy();
  await governorAlpha.deployed();

  const governorAddress = governorAlpha.address;
  console.log("The governor address:", governorAddress);
  console.log("Successfully deployed Governor!")

}

deployAllBase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });