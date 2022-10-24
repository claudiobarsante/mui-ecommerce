import { toast, Toaster, ToastBar } from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Box
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const Toast = () => {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              {icon}
              {message}
              {t.type !== 'loading' && (
                <IconButton
                  onClick={() => toast.dismiss(t.id)}
                  aria-label="dismiss message"
                >
                  <ClearIcon
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: -8,
                      fontSize: 15
                    }}
                  />
                </IconButton>
              )}
            </Box>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default Toast;
