import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

const InfoCard = ({title,cases,total,color}) => {
  return (
    <div className='mx-2' style={{borderTop:`7px solid ${color}`, borderRadius:"5px"}}>
      <Card  style={{width:"200px"}} className='shadow text-center mb-4 '>
        <CardContent >
            <Typography variant='subtitle2'>
                {title}
            </Typography>
            <Typography variant='h6'>
                {cases}
            </Typography>
            <Typography variant='subtitle2'>
                {total}
            </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCard;
