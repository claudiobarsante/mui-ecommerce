import { Colors } from 'styles/theme/colors';
import * as S from './styles';

export type SpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  color?: keyof typeof Colors;
};

const Spinner = ({ size = 'medium', color = 'primary' }: SpinnerProps) => (
  <S.Wrapper
    fontSize={size}
    viewBox="-3 -3 42 42"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#2cb19e"
    customcolor={color}
    role="alert"
    aria-live="polite"
    aria-busy="true"
  >
    <title>Loading...</title>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)" strokeWidth="3">
        <circle strokeOpacity=".2" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </S.Wrapper>
);

export default Spinner;
