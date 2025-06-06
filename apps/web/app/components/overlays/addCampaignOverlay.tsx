import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

import { css } from '../../styled-system/css';
import { CreateCampaignForm } from '../forms/createCampaign';

const addCampaignBtnClass = css({
  backgroundColor: 'deep-ocean-600/80',
  color: 'stormy-blue-300',
  textTransform: 'capitalize',
});

const AddCampaignOverlay = () => {
  return (
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
  );
};

export default AddCampaignOverlay;
