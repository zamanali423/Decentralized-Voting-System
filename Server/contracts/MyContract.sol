// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PollContract {
    event PollCreated(
        uint256 pollId,
        string question,
        string description,
        string[] options,
        address creator
    );

    event VoteCast(
        uint256 pollId,
        address voter,
        uint256 optionIndex
    );

    struct Poll {
        string question;
        string description;
        string[] options;
        address creator;
        uint256[] votes;
    }

    Poll[] public polls;

    function createPoll(
        string memory question,
        string memory description,
        string[] memory options
    ) public {
        uint256 pollId = polls.length;
        uint256[] memory initialVotes = new uint256[](options.length);
        polls.push(Poll(question, description, options, msg.sender, initialVotes));
        emit PollCreated(pollId, question, description, options, msg.sender);
    }

    function vote(uint256 pollId, uint256 optionIndex) public {
        require(pollId < polls.length, "Poll does not exist");
        require(optionIndex < polls[pollId].options.length, "Invalid option");
        
        polls[pollId].votes[optionIndex]++;
        emit VoteCast(pollId, msg.sender, optionIndex);
    }

    function getPoll(uint256 pollId) public view returns (Poll memory) {
        require(pollId < polls.length, "Poll does not exist");
        return polls[pollId];
    }
}
