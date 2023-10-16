import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductRating = ({ rating, size }) => {

  return (
    <Stack spacing={1}>
      <div className="flex items-center">
        {
          rating === 5 ?
            <Rating
              name="read-only"
              value={rating}
              size={size}
              readOnly
            />
            : <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={5 - rating}
              size={size}
              readOnly
            />
        }
      </div>
    </Stack>
  );
};

export default ProductRating;