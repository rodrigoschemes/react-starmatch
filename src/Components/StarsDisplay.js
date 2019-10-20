import React from 'react'
import utils from '../Utils/utils'

const StarsDisplay = ({count}) => (
    <>
        {utils.range(1, count).map(starId =>
            <div key={starId} className="star" />
        )}
    </>
)

export default StarsDisplay