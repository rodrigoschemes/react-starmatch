import React, { useState } from 'react'
import utils from '../Utils/utils';
import PlayNumber from './PlayNumber';
import PlayAgain from './PlayAgain';
import StarsDisplay from './StarsDisplay';

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9))
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9))
    const [candidateNums, setCandidateNums] = useState([])

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameIsDone = availableNums.length === 0

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const resetGame = () => {
        setStars(utils.random(1, 9))
        setAvailableNums(utils.range(1, 9))
        setCandidateNums([])
    }

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === 'used') {
            return;
        }

        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
        </div>
            <div className="body">
                <div className="left">
                    {
                        gameIsDone ? (
                            <PlayAgain onClick={resetGame}/>
                        ) : (
                            <StarsDisplay count={stars} />
                        )
                    }
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            onClick={onNumberClick}
                            number={number}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
};

export default StarMatch