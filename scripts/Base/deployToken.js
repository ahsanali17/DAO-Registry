// Script that deploys the Token and Timelock base contracts provided the users address.
async function deployToken() {
  const interactor = "0x06122e6170114667780765E0Fc91f5A7F81142C4";
  
  // Token Deployment
  const Token = await ethers.getContractFactory("Token");
  console.log("1");
  const token = await Token.deploy();
  console.log("2");
  await token.deployed();
  console.log("3");
  
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