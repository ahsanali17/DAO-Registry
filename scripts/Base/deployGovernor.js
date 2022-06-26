// Script that will deploy only the governor base contract
async function deployGovernor() {
 // GovernorAlpha Deployment 
 const GovernorAlpha = await ethers.getContractFactory("GovernorAlpha");
  const governorAlpha = await GovernorAlpha.deploy();
  await governorAlpha.deployed();

  const governorAddress = governorAlpha.address;
  console.log("The governor address:", governorAddress);
  console.log("Successfully deployed Governor!")

}

deployGovernor()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });