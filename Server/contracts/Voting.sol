// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Poll {
        string question;
        string[] options;
        mapping(uint => uint) votes;
        address creator;
        uint endTime;
        bool exists;
    }

    mapping(uint => Poll) public polls;
    uint public pollCount;

    event PollCreated(uint pollId, string question, string[] options, address creator, uint endTime);
    event VoteCasted(uint pollId, uint optionIndex, address voter);

    function createPoll(string memory question, string[] memory options, uint duration) public {
        pollCount++;
        Poll storage poll = polls[pollCount];
        poll.question = question;
        poll.options = options;
        poll.creator = msg.sender;
        poll.endTime = block.timestamp + duration;
        poll.exists = true;

        emit PollCreated(pollCount, question, options, msg.sender, poll.endTime);
    }

    function vote(uint pollId, uint optionIndex) public {
        require(polls[pollId].exists, "Poll does not exist");
        require(block.timestamp < polls[pollId].endTime, "Poll has ended");

        polls[pollId].votes[optionIndex]++;
        emit VoteCasted(pollId, optionIndex, msg.sender);
    }

    function getVotes(uint pollId, uint optionIndex) public view returns (uint) {
        require(polls[pollId].exists, "Poll does not exist");
        return polls[pollId].votes[optionIndex];
    }
}
