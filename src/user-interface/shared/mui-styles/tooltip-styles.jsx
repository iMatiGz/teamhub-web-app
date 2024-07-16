import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const BlackTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#111',
    padding: '10px 15px',
    fontFamily: 'Montserrat',
    fontSize: 15,
    borderRadius: 5,
    width: 'max-content',
    maxWidth: 200,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#111',
  },
});
