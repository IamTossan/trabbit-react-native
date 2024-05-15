import '../translation';

import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { PortalProvider, TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';
import { database } from '../model';

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <PortalProvider shouldAddRootHost>
        <Stack />
      </PortalProvider>
    </TamaguiProvider>
  );
}
