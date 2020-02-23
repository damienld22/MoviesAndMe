import React from "react";
import { StyleSheet, View, Platform } from "react-native";

export default function Test() {
  return (
    <View style={styles.main_container}>
      <View style={styles.subview_container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  subview_container: {}
});
