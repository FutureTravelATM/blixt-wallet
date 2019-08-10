import React, { useEffect } from "react";
import { StyleSheet, StatusBar, ToastAndroid } from "react-native";
import { Container } from "native-base";
import { NavigationScreenProp } from "react-navigation";

import { useStoreState, useStoreActions } from "../../state/store";


interface IProps {
  navigation: NavigationScreenProp<{}>;
}
export default ({ navigation }: IProps) => {
  const actions = useStoreActions((store) => store);
  const appReady = useStoreState((store) => store.appReady);
  const walletCreated = useStoreState((store) => store.walletCreated);

  useEffect(() => {
    (async () => {
      try {
        await actions.initializeApp(undefined);
      }
      catch (e) {
        console.log(e);
        ToastAndroid.show(e.message, ToastAndroid.LONG);
      }
    })();
  }, [actions]);

  if (appReady) {
    if (!walletCreated) {
      setTimeout(() => navigation.navigate("Welcome"), 0);
    }
    else if (walletCreated) {
      setTimeout(() => navigation.navigate("InitLightning"), 0);
    }
  }

  return (
    <Container style={styles.content}>
      <StatusBar
        backgroundColor="transparent"
        hidden={false}
        translucent={true}
        networkActivityIndicatorVisible={true}
        barStyle="light-content"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});