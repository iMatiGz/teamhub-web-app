import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const BlackTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    enterDelay={0}
    TransitionComponent={null}
    disableInteractive
    arrow
    classes={{ popper: className }}
  />
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

export const BlackTooltipSmall = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    enterDelay={0}
    TransitionComponent={null}
    disableInteractive
    arrow
    classes={{ popper: className }}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#111',
    padding: '5px 10px',
    fontFamily: 'gg sans Normal',
    fontSize: 15,
    borderRadius: 5,
    color: '#ddd',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#111',
  },
});
