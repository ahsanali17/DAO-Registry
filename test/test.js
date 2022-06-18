const { assert } = require("chai");

describe("DAO contract tests", function() {
  let member1;
  let member2;
  let member3;
  const allMembers = [];
  
  before(async () => {
    //create 3 different accounts
    member1 = await ethers.provider.getSigner(0).getAddress();
    member2 = await ethers.provider.getSigner(1).getAddress();
    member3 = await ethers.provider.getSigner(2).getAddress();
    
    //add to array allMembers
    allMembers.push(member1,member2,member3);
  });

  it("should load every account with 1 TestCoin", async function() {
    let one = ethers.utils.parseEther("1").toString();

    //get and deploy contract
    const Dao = await ethers.getContractFactory("DAO");
    const daoContract = await Dao.deploy(3, "TestCoin", "TC", allMembers);
    await daoContract.deployed();
    
    //get all 3 balances of member accounts
    let member1Balance = await daoContract.balanceOf(member1);
    let member2Balance = await daoContract.balanceOf(member2);
    let member3Balance = await daoContract.balanceOf(member3);

    console.log("the first address balance is "+ member1Balance);
    assert.equal(member1Balance,one);
    console.log("the second address balance is "+ member2Balance);
    assert.equal(member2Balance,one);
    console.log("the third address balance is "+ member2Balance);
    assert.equal(member3Balance,one);
  });

  it("should revert a transaction where there are not enough coins for everybody", async function() {
    //get and deploy contract
    //TODO: figure out how to test for it reverting so that it passes the test 
    console.log("This should revert");
    const Dao = await ethers.getContractFactory("DAO");
    const daoContract = await Dao.deploy(2, "TestCoin", "TC", allMembers);
    await daoContract.deployed();
  });

  it("should make sure the name of the coin is the inputted name", async function() {
    const Dao = await ethers.getContractFactory("DAO");
    const daoContract = await Dao.deploy(3, "TestCoin", "TC", allMembers);
    await daoContract.deployed();

    const coinName = await daoContract.nameOfCoin();

    console.log("The name of the coin is " + coinName);

    assert.equal(coinName,"TestCoin");
  });

  it("should make sure the symbol of the coin is the inputted symbol", async function() {
    const Dao = await ethers.getContractFactory("DAO");
    const daoContract = await Dao.deploy(3, "TestCoin", "TC", allMembers);
    await daoContract.deployed();

    const coinSymbol = await daoContract.coinSymbol();

    console.log("The name of the symbol is " + coinSymbol);

    assert.equal(coinSymbol,"TC");
  });
});