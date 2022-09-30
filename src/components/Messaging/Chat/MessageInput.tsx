import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

// export const MessageInput = ({ value, onChange, onSubmit }: { onChange: any; value: string; onSubmit: () => void }) => {
export const MessageInput = () => {
  return (
    <form onSubmit={() => null}>
      <InputGroup>
        <Input placeholder={'Send Message'} type="text" />
        <IconButton variant="outline" colorScheme="orange" aria-label="Send email" icon={<ArrowForwardIcon />} />
      </InputGroup>
    </form>
  );
};
{
  /*<Input placeholder={'Send Message'} type="text" value={value} onChange={(e) => onChange(e.target.value)} />*/
}
