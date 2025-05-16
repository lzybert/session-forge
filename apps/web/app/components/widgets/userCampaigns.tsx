import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  Portal,
  Stack,
  Tag,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Key, useEffect, useState } from 'react';

import { ICampaign } from '../../../models/Campaign';
import { css } from '../../styled-system/css';
import { CreateCampaignForm } from '../forms/createCampaign';
import { CreateSessionForm } from '../forms/createSession';

const headerClass = css({
  color: 'stormy-blue-300',
  marginBottom: '1em',
});

const campaignCardClass = css({
  padding: '1em',
  backgroundColor: 'deep-ocean-600/80',
  width: '100%',
  borderRadius: '5px',
  marginBottom: '0.5em',
});

const systemLabelClass = css({
  color: 'stormy-blue-300',
});

const addCampaignBtnClass = css({
  backgroundColor: 'deep-ocean-600/80',
  color: 'stormy-blue-300',
  textTransform: 'capitalize',
});

const smallText = css({
  fontSize: '12px',
});

const UserCampaignsWidget = () => {
  const { data } = useSession();
  const user = data?.user;
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    const userCampaigns = async () => {
      const data = await fetch('/api/campaign').then((response) =>
        response.json(),
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
          <Box
            className={campaignCardClass}
            key={campaign._id as unknown as Key}>
            <Heading>{campaign.title}</Heading>
            <Tag.Root colorPalette="teal">
              <Tag.Label className={systemLabelClass}>
                {campaign.system}
              </Tag.Label>
            </Tag.Root>
            <Stack
              direction="row"
              h="20"
              justifyContent="space-between"
              alignItems="flex-start">
              <Box className={smallText}>Next session </Box>
              <Box className={smallText}>Status </Box>
              <Box className={smallText}>Team </Box>
            </Stack>
          </Box>
        ))}
      <HStack>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline" size="sm" className={addCampaignBtnClass}>
              Quick add campaign
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Add new campaign</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <CreateCampaignForm />
                </Dialog.Body>
                <Dialog.Footer></Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline" size="sm" className={addCampaignBtnClass}>
              Quick add session
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Add new session</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <CreateSessionForm campaigns={campaigns} />
                </Dialog.Body>
                <Dialog.Footer></Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </HStack>
    </>
  );
};

export default UserCampaignsWidget;
