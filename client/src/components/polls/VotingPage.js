import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import PollArtifact from "../../build/contracts/PollContract.json";
import { userContext } from "../../context/userContext/userContext";

const VotingPage = () => {
  const [allResults, setAllResults] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [pollContract, setPollContract] = useState(null);
  const { account, setAccount, user } = useContext(userContext);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      window.ethereum.enable().then(async () => {
        // Fetch the current account
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }

        const contract = new web3Instance.eth.Contract(
          PollArtifact.abi,
          PollArtifact.networks[5777].address
        );
        setPollContract(contract);
      });
    }
  }, []);

  const pollResult = async () => {
    try {
      const id = user?._id; // Optional chaining to handle cases where user is undefined
      if (!id) {
        throw new Error("User ID is not available.");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await fetch(
        `http://localhost:3001/polls/results/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer token format
          },
        }
      );

      if (!response.ok) {
        console.error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Fetched poll results:", result);

      // Check if result is an array or contains data in result.data
      setAllResults(Array.isArray(result) ? result : result.data || []);
    } catch (error) {
      console.error("Error fetching poll results:", error.message);
    }
  };

  useEffect(() => {
    pollResult();
  }, []);

  const verifyOnBlockchain = async (pollIndex) => {
    if (web3 && pollContract) {
      try {
        // Log the contract address and method call for debugging
        console.log("Contract Address:", pollContract.options.address);
        console.log("Calling getPoll with index:", pollIndex);

        const pollData = await pollContract.methods.getPoll(pollIndex).call();
        console.log("Blockchain Poll Data:", pollData);

        // Ensure pollData is in expected format
        if (Array.isArray(pollData)) {
          console.log("Poll Data:", pollData);
        } else {
          console.error("Unexpected data format:", pollData);
        }
      } catch (error) {
        console.error("Error verifying poll on blockchain:", error.message);
        console.error("Stack trace:", error.stack);
      }
    } else {
      console.error("Web3 or pollContract is not initialized");
    }
  };

  return (
    <div className="mainTable">
      <div className="header mt-5">
        E-VOTING <span className="text-dark">ELECTION RESULTS</span>{" "}
        <span className="live">Live</span>
      </div>
      <table className="mt-3">
        <thead>
          <tr className="text-info">
            <th>ID</th>
            <th>Candidate Name</th>
            <th>Vote Count</th>
            <th>Blockchain Verification</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allResults) &&
            allResults.map((result, pollIndex) =>
              result.options.map((option, optionIndex) => (
                <tr key={optionIndex}>
                  <td>{optionIndex + 1}</td>
                  <td>{option.option}</td>
                  <td>{option.voteCount}</td>
                  <td>
                    <button onClick={() => verifyOnBlockchain(pollIndex)}>
                      Verify
                    </button>
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>
      <div className="account">
        <strong className="fs-5">YOUR ACCOUNT:</strong>{" "}
        {account || "Not connected"}
      </div>
    </div>
  );
};

export default VotingPage;
