import { HStack, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux } from 'react-icons/fa';
import { BsNintendoSwitch } from 'react-icons/bs';
import { SiSega } from 'react-icons/si';
import {
  getParentPlatforms,
  ParentPlatform,
  Platform,
} from '../services/platforms';

const ICONS: Record<ParentPlatform, IconType> = {
  pc: FaWindows,
  playstation: FaPlaystation,
  xbox: FaXbox,
  nintendo: BsNintendoSwitch,
  mac: FaApple,
  linux: FaLinux,
  sega: SiSega,
};

interface PlatformIconListProps {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: PlatformIconListProps) => {
  return (
    <HStack gap={2} my={2}>
      {getParentPlatforms(platforms).map((parent) => (
        <Icon key={parent} as={ICONS[parent]} color="gray.500" />
      ))}
    </HStack>
  );
};

export default PlatformIconList;
