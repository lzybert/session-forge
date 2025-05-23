import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

import { ICampaign } from '../../../models/Campaign';
import { css } from '../../styled-system/css';
import { CreateSessionForm } from '../forms/createSession';

const addCampaignBtnClass = css({
  backgroundColor: 'deep-ocean-600/80',
  color: 'stormy-blue-300',
  textTransform: 'capitalize',
});

interface AddSessionOverlayProps {
  campaigns: ICampaign[];
}

const AddSessionOverlay = ({ campaigns }: AddSessionOverlayProps) => {
  return (
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
  );
};

export default AddSessionOverlay;
