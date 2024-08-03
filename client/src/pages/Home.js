import React, { useContext, useState } from "react";
import CreatePoll from "../components/polls/CreatePoll";
import { userContext } from "../context/userContext/userContext";
import VotingPage from "../components/polls/VotingPage";

const Home = () => {
  const { isLogin } = useContext(userContext);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [showVotingPage, setshowVotingPage] = useState(true);
  const handleCreatePoll = () => {
    setShowCreatePoll(true);
    setshowVotingPage(false);
  };
  return (
    <>
      {isLogin ? (
        <>
          <button
            className="btn btn-primary ms-3 mt-4"
            onClick={handleCreatePoll}
          >
            Create Poll
          </button>
          {showCreatePoll ? (
            <CreatePoll
              setShowCreatePoll={setShowCreatePoll}
              setshowVotingPage={setshowVotingPage}
            />
          ) : (
            <VotingPage />
          )}
        </>
      ) : (
        <h1>
          You are not authenticate user so do login or sigup for vote casting
        </h1>
      )}
    </>
  );
};

export default Home;
