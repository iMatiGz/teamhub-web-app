import { Avatar, Badge } from '@mui/material';
import { BlackTooltipSmall } from '../../../shared/mui-styles/tooltip-styles';

export const UserAvatar = ({ avatar, status, description }) => {
  return (
    <Badge
      overlap='circular'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <BlackTooltipSmall title={description} placement='top'>
          <Avatar
            src={`/icons/user-status/${status}.png`}
            sx={{ width: 16, height: 'auto', border: '3px solid #222327', bgcolor: '#222327' }}
          />
        </BlackTooltipSmall>
      }
    >
      <Avatar src={avatar ? avatar : '/images/no-profile-pic.jpg'} sx={{ width: 32, height: 'auto' }} />
    </Badge>
  );
};
