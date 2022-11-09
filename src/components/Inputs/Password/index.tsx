import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = () => {
  return (
    <FormControl variant="standard" fullWidth sx={{ marginBottom: 3 }}>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
        aria-label="input for password"
        id="password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleOnClickShowPassword}
              onMouseDown={handleOnMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChange('password', event)
        }
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        error={fieldError.hasOwnProperty('password')}
        onBlur={() => handleOnBlur('password')}
      />
      <FormHelperText
        id="component-error-text"
        aria-labelledby="password"
        error={fieldError.hasOwnProperty('password')}
      >
        {fieldError.password}
      </FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
