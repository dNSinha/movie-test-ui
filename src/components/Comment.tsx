import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReadOnlyRating } from './Rating';

type IComment = {
  comment: string;
  movieId: string;
  rating: number;
  userName: string;
}

type IProps = {
  comments: IComment[];
}

const Comment = (props: IProps) => {
  const { comments } = props;
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {comments.map((comment, index) => {
        return (
          <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {comment?.userName}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}><ReadOnlyRating value={comment?.rating} /></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {comment?.comment}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })};
    </div>
  )
}

export default Comment;