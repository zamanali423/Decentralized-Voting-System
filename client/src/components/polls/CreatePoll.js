import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Web3 from "web3";
import { userContext } from "../../context/userContext/userContext";
import PollArtifact from "../../build/contracts/PollContract.json";

const socket = io("http://localhost:3001");

const CreatePoll = ({ setshowVotingPage, setShowCreatePoll }) => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([""]);
  const [votes, setVotes] = useState([0]);
  const [pollData, setPollData] = useState([]);
  const { user } = useContext(userContext);
  const [web3, setWeb3] = useState(null);
  const [pollContract, setPollContract] = useState(null);
  const { account } = useContext(userContext);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      window.ethereum.enable().then(() => {
        const contract = new web3Instance.eth.Contract(
          PollArtifact.abi,
          PollArtifact.networks[5777].address
        );
        setPollContract(contract);
      });
    }
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleVoteChange = (index, value) => {
    const newVotes = [...votes];
    newVotes[index] = parseInt(value, 10) || 0;
    setVotes(newVotes);
  };

  const addOption = () => {
    setOptions([...options, ""]);
    setVotes([...votes, 0]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    const newVotes = votes.filter((_, i) => i !== index);
    setVotes(newVotes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      options.some((option) => option.trim() === "") ||
      votes.some((vote) => vote <= 0)
    ) {
      alert("All options and votes must be filled out.");
      return;
    }
    const optionsData = options.map((option, i) => ({
      option,
      voteCount: votes[i],
    }));

    const votesData = options.map((_, index) => ({
      userId: user._id,
      optionIndex: index,
      blockchainTransactionId: account,
    }));

    const pollData = {
      question,
      description,
      options: optionsData,
      creator: user.username,
      createdAt: new Date(),
      votes: votesData,
      blockchainTransactionId: account,
      endTime: new Date().getTime(),
    };

    if (web3 && pollContract) {
      const accounts = await web3.eth.getAccounts();
      try {
        const gasEstimate = await pollContract.methods
          .createPoll(
            question,
            description,
            options.map((opt) => opt)
          )
          .estimateGas({ from: accounts[0] });

        await pollContract.methods
          .createPoll(
            question,
            description,
            options.map((opt) => opt)
          )
          .send({ from: accounts[0], gas: gasEstimate });
      } catch (error) {
        console.error("Transaction failed:", error.message);
        alert("Transaction failed. See console for details.");
      }
    }

    socket.emit("createPoll", pollData);
    setShowCreatePoll(false);
    setshowVotingPage(true);
  };

  const checkBalance = async (web3, account) => {
    try {
      const balance = await web3.eth.getBalance(account);
      console.log(
        `Balance of ${account}: ${web3.utils.fromWei(balance, "ether")} ETH`
      );
    } catch (error) {
      console.error("Error checking balance:", error);
    }
  };

  checkBalance(web3, account);

  useEffect(() => {
    socket.on("savePoll", (data) => {
      setPollData((prevPolls) => [...prevPolls, data]);
    });

    return () => socket.off("savePoll");
  }, []);

  return (
    <div className="containerPoll">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="title">Create a Poll</h1>
        <div className="field">
          <label className="label">Question</label>
          <input
            type="text"
            className="input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="label">Description</label>
          <textarea
            className="textarea"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Options and Votes</label>
          {options.map((option, index) => (
            <div key={index} className="option-vote-field">
              <input
                type="text"
                className="input option-input"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder="Option"
                required
              />
              <input
                type="number"
                className="input vote-input"
                value={votes[index]}
                onChange={(e) => handleVoteChange(index, e.target.value)}
                placeholder="Votes"
                required
              />
              <div className="text-danger">
                Please note that vote once recorded cannot be changed!
              </div>
              {options.length > 1 && (
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeOption(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-option-button"
            onClick={addOption}
          >
            Add Option
          </button>
        </div>
        <button type="submit" className="submit-button">
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
