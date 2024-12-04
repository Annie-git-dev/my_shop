import { Checkbox, FormControlLabel, Rating, Typography } from '@mui/material'
import { useState } from 'react';

function RatingComponent({ text, rate, changeRate, setAllRatings, checked }) {
    const [rateIsChanged, setRateIsChanged] = useState(false)

    return (
        <>
            <div className='flex flex-col'>
                <span className="text-gray-500 text-[14px]">{text}</span>
                <Rating
                    name="simple-controlled"
                    value={rate}
                    onChange={(event, newRate) => {
                        changeRate(newRate)
                        setRateIsChanged(true)
                    }}
                />
                {setAllRatings && <FormControlLabel
                    control={
                        <Checkbox
                            color="default"
                            checked={checked}
                            onChange={() => setAllRatings()}
                            name="exampleCheckbox"
                        />
                    }
                    label={
                        <Typography className='text-[#424242]'>Show all ratings</Typography>
                    }
                />}
            </div>
        </>
    )
}

export default RatingComponent