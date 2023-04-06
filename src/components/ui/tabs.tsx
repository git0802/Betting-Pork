import "react-tabs/style/react-tabs.css";
import {
  Tabs as TabsReactTabs,
  Tab as TabReactTabs,
  TabList as TabListReactTabs,
  TabPanel as TabPanelReactTabs,
  TabPanelProps,
  TabListProps,
  TabProps,
  TabsProps,
  ReactTabsFunctionComponent,
} from "react-tabs";

export const Tabs: ReactTabsFunctionComponent<TabsProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <TabsReactTabs
      {...otherProps}
      selectedTabClassName={`${otherProps?.selectedTabClassName ? otherProps?.selectedTabClassName : "bg_tab_active font-semibold rounded px-3"}`}
      className={`${otherProps?.className ? otherProps?.className : "text-sm font-semibold "}`}
    >
      {children}
    </TabsReactTabs>
  );
};

Tabs.tabsRole = "Tabs";

export const Tab: ReactTabsFunctionComponent<TabProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <TabReactTabs
      {...otherProps}
      className={`react-tabs__tab focus:after:hidden ${otherProps?.className ? otherProps?.className : "px-3"}`}
    >
      {children}
    </TabReactTabs>
  );
};

Tab.tabsRole = "Tab";

export const TabList: ReactTabsFunctionComponent<TabListProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <TabListReactTabs 
      {...otherProps}
      className={`${otherProps?.className ? otherProps?.className : ""} `}
    >
      {children}
    </TabListReactTabs>
  );
};

TabList.tabsRole = "TabList";

export const TabPanel: ReactTabsFunctionComponent<TabPanelProps> = ({
  children,
  ...otherProps
}) => {
  return <TabPanelReactTabs {...otherProps}>{children}</TabPanelReactTabs>;
};

TabPanel.tabsRole = "TabPanel";
