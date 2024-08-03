// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Poll {
    struct Option {
        string name;
        uint voteCount;
    }

    struct Vote {
        address voter;
        uint optionIndex;
    }

    struct PollData {
        string question;
        string description;
        Option[] options;
        Vote[] votes;
    }

    PollData[] public polls;

    function createPoll(string memory question, string memory description, string[] memory optionNames) public {
        PollData storage newPoll = polls.push();
        newPoll.question = question;
        newPoll.description = description;
        for (uint i = 0; i < optionNames.length; i++) {
            newPoll.options.push(Option({
                name: optionNames[i],
                voteCount: 0
            }));
        }
    }

    function castVote(uint pollIndex, uint optionIndex) public {
        PollData storage poll = polls[pollIndex];
        poll.votes.push(Vote({
            voter: msg.sender,
            optionIndex: optionIndex
        }));
        poll.options[optionIndex].voteCount++;
    }

    function getPoll(uint pollIndex) public view returns (PollData memory) {
        return polls[pollIndex];
    }

    function getPollCount() public view returns (uint) {
        return polls.length;
    }
}
