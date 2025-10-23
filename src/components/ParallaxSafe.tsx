import { useMemo } from 'react';
import { Parallax } from 'react-scroll-parallax';
import type { ComponentProps } from 'react';
import { isIOSDevice } from '../utils/device';

type ParallaxProps = ComponentProps<typeof Parallax>;

const ParallaxSafe = (props: ParallaxProps) => {
  const isIOS = useMemo(() => isIOSDevice(), []);

  // On iOS, render children directly without Parallax wrapper
  // since ParallaxProvider is not available
  if (isIOS) {
    return <>{props.children}</>;
  }

  // On non-iOS devices, use Parallax normally
  return <Parallax {...props} />;
};

export default ParallaxSafe;
