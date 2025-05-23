import {
  Box,
  Collapsible,
  Heading,
  IconButton,
  Stack,
  Tag,
} from '@chakra-ui/react';
import { RiArrowDropDownFill } from 'react-icons/ri';

import { ICampaign } from '../../../models/Campaign';
import { ISession } from '../../../models/Session';
import { css } from '../../styled-system/css';

const campaignCardClass = css({
  padding: '0.5em 1em',
  backgroundColor: 'deep-ocean-600/80',
  width: '100%',
  borderRadius: '5px',
  marginBottom: '0.5em',
  '& button[data-state=open] button.chakra-button': {
    transform: 'rotate(180deg)',
  },
});

const smallText = css({
  fontSize: '12px',
});

const smallerText = css({
  fontSize: '10px',
});

const systemLabelClass = css({
  color: 'stormy-blue-300',
});

interface UserCampaignListItemProps {
  campaign: ICampaign;
}

const UserCampaignListItem = ({ campaign }: UserCampaignListItemProps) => {
  const sessions = campaign.sessions as unknown as ISession[];
  return (
    <Collapsible.Root className={campaignCardClass}>
      <Collapsible.Trigger css={{ cursor: 'pointer' }}>
        <Stack direction="row" alignItems="center">
          <Heading>{campaign.title}</Heading>
          <Tag.Root colorPalette="teal">
            <Tag.Label className={systemLabelClass}>
              {campaign.system}
            </Tag.Label>
          </Tag.Root>
          <IconButton variant="ghost" aria-label="drop-down">
            <RiArrowDropDownFill />
          </IconButton>
        </Stack>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Box className={smallText}>Upcoming session(s)</Box>
        {sessions.length > 0 &&
          sessions.map((session) => (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start">
              <Box className={smallerText}>{session.name} </Box>
              <Box className={smallerText}>
                {new Date(session.date).toLocaleDateString()}{' '}
                {new Date(session.date).toLocaleTimeString()}
              </Box>
            </Stack>
          ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default UserCampaignListItem;
