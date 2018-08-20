import React from "react";
import { View, NavigationBar, Icon, Title } from "@shoutem/ui";

const CollectionsScreen = () => {
  return (
    <View>
      <NavigationBar
        leftComponent={<Icon name="sidebar" />}
        centerComponent={<Title>Collections</Title>}
      />
      {/* <Button onPress={() => props.navigation.navigate("Achievements")}>
        <Text>Go to achievements</Text>
      </Button> */}
    </View>
  );
};

export default CollectionsScreen;
