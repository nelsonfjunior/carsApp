import { DrawerNavigationProp } from "@react-navigation/drawer";

export type RootDrawerParamList = {
    "screens/Home": undefined;
    "screens/Model": { marcaCodigo: string; };
    "screens/docEdificacao": { id: string };
    "index": undefined;
  };

export type HomeNavigationProp = DrawerNavigationProp<RootDrawerParamList,
  "screens/Home"
>;

export type ModelNavigationProp = DrawerNavigationProp<RootDrawerParamList,
  "screens/Model"
>;

export type IndexNavigationProp = DrawerNavigationProp<RootDrawerParamList,
  "index"
>;