import { Chip, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Colors } from 'styles/theme/colors';

type Props = {
  qty: number;
};
export default function Availability({ qty }: Props) {
  qty = 0;
  return (
    <>
      <Typography variant="subtitle1">
        Availability:{' '}
        {qty > 0 ? (
          <Chip
            icon={<CheckCircleIcon />}
            label="In stock"
            variant="outlined"
            color="primary"
          />
        ) : (
          <Chip
            icon={<DoNotDisturbOnIcon />}
            label="Out of stock"
            variant="outlined"
            color="error"
          />
        )}
      </Typography>
    </>
  );
}
