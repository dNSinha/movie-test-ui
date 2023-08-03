import Rating from '@mui/material/Rating';

type Props = {
  value: number;
}

export const ReadOnlyRating = (props: Props) => <Rating name="read-only" value={props.value} readOnly />
