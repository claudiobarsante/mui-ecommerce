import { Box, Typography } from '@mui/material';
import { Colors } from 'styles/theme/colors';

type Props = {
  text: string;
  color: keyof typeof Colors; //⚡When the type of the object is not known --> const temp = someObj[field as keyof typeof someObj]
};
const FormHeader = ({ text, color }: Props) => {
  return (
    <Box
      sx={{
        borderLeft: `0.4rem solid ${Colors[color]}`,
        paddingLeft: '0.5rem',
        position: 'absolute',
        top: '8.5rem',
        left: 0
      }}
    >
      <Typography sx={{ fontWeight: '500' }} variant="h5">
        {text}
      </Typography>
    </Box>
  );
};

export default FormHeader;
