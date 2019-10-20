import React from 'react'
import colors from '../Utils/colors'

const PlayNumber = ({number, status}) => {
    return (
        <button 
            className="number"
            style={{ backgroundColor: colors[status]}}
            onClick={() => console.log(number)}
        >
            {number}
        </button>
    )
}

export default PlayNumber