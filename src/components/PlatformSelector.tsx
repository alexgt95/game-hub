import { Button, Menu, Portal } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import usePlatforms from '../hooks/usePlatforms';
import { Platform } from '../types/Platform';

interface PlatformSelectorProps {
  selectedPlatform: Platform | null;
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) => {
  const { data: platforms } = usePlatforms();

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {selectedPlatform?.name ?? 'Platforms'} <BsChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {platforms.map((platform) => (
              <Menu.Item
                key={platform.id}
                value={platform.slug}
                onClick={() => onSelectPlatform(platform)}
                fontWeight={platform.id === selectedPlatform?.id ? 'bold' : 'normal'}
              >
                {platform.name}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default PlatformSelector;
