import { useSelector } from 'react-redux';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { RootState } from '@/redux/rootReducer';
import { toggleTheme } from '@/redux/themeSlice';

export default function HomeScreen() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{
    //     light: '#A1CEDC', dark: '#1D3D47'
    //   }}
    //   headerImage={
    //     <Image
    //       source={PartialReactLogo}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type='title'>Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText> to see changes.
    //       Press{' '}
    //       <ThemedText type='defaultSemiBold'>
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12'
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type='defaultSemiBold'>npm run reset-project</ThemedText> to get a fresh{' '}
    //       <ThemedText type='defaultSemiBold'>app</ThemedText> directory. This will move the current{' '}
    //       <ThemedText type='defaultSemiBold'>app</ThemedText> to{' '}
    //       <ThemedText type='defaultSemiBold'>app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
    <View style={[styles.container, {
      backgroundColor: theme.colors.background 
    }]}>
      <Text style={[styles.text, {
        color: theme.colors.text 
      }]}>
        Welcome to the Themed App!
      </Text>
      <Button
        title='Enable Dark Mode'
        onPress={() => dispatch(toggleTheme())}
        color={theme.colors.primary}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
// reactLogo: {
//   height: 178,
//   width: 290,
//   bottom: 0,
//   left: 0,
//   position: 'absolute',
// },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
