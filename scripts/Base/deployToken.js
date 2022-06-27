// Script that deploys the Token base contract
async function deployToken() {
  
  // Token Deployment
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  
  const tokenAddress = token.address;
 
  console.log("Token address:", tokenAddress);
  console.log("Successfully deployed token!");
}

deployToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });