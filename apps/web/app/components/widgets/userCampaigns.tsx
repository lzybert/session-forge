import { Heading, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { ICampaign } from '../../../models/Campaign';
import { css } from '../../styled-system/css';
import UserCampaignListItem from '../lists/userCampaignListItem';
import AddCampaignOverlay from '../overlays/addCampaignOverlay';
import AddSessionOverlay from '../overlays/addSessionOverlay';

const headerClass = css({
  color: 'stormy-blue-300',
  marginBottom: '1em',
});

const UserCampaignsWidget = () => {
  const { data } = useSession();
  const user = data?.user;
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    const userCampaigns = async () => {
      const data = await fetch('/api/campaign?showUpcoming=true').then(
        (response) => response.json(),
      );
      setCampaigns(data?.data);
    };
    userCampaigns().catch(console.error);
  }, []);

  return (
    <>
      <Heading className={headerClass}>My Campaigns</Heading>
      {campaigns.length > 0 &&
        campaigns.map((campaign) => (
          <UserCampaignListItem
            campaign={campaign}
            key={campaign._id as string}
          />
        ))}
      <HStack>
        <AddCampaignOverlay />
        <AddSessionOverlay campaigns={campaigns} />
      </HStack>
    </>
  );
};

export default UserCampaignsWidget;
