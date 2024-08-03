const MyContract = artifacts.require("MyContract");

contract("MyContract", (accounts) => {
  let myContractInstance;

  before(async () => {
    myContractInstance = await MyContract.deployed();
  });

  it("should deploy the contract successfully", async () => {
    assert(myContractInstance.address !== "");
  });

  it("should set a value and retrieve it", async () => {
    // Set value in the contract
    await myContractInstance.setValue(42, { from: accounts[0] });

    // Get value from the contract
    const value = await myContractInstance.getValue.call();
    assert.equal(value.toNumber(), 42, "The value 42 was not stored.");
  });

  // Add more tests as needed
});
