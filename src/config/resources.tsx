import type { IResourceItem } from "@refinedev/core";

import {
  DashboardOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "twiiter",
    meta: {
      label: "Twitter Scrapping",
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <TwitterOutlined  />,
    },
  },

  {
    name: "tweets-by-username",
    list: "/twitter/tweets-by-profile",
    meta: {
      label: "Retrieve tweets based on user profiles",
      parent: "twiiter",
    },
  },
  {
    name: "get-tweets-by-hashtag",
    list: "/twitter/tweets-by-hashtag",
    meta: {
      label: "Get tweets by hashtag",
      parent: "twiiter",
    },
  },
  {
    name: "get-trending-hashtags",
    list: "/twitter/get-trending-hashtags",
    meta: {
      label: "Get trending hashtag",
      parent: "twiiter",
    },
  },
  {
    name: "get-tweets-by-post-id",
    list: "/twitter/get-tweets-by-id",
    // show: "/companies/:id",
    // create: "/companies/create",
    // edit: "/companies/edit/:id",
    meta: {
      label: "Get tweets by post id",
      parent: "twiiter",
    },
  },
  {
    name: "get-tweets-comments-by-post-id",
    list: "/twitter/get-comments-for-tweet/",
    // show: "/companies/:id",
    // create: "/companies/create",
    // edit: "/companies/edit/:id",
    meta: {
      label: "Get tweets comments by post id",
      parent: "twiiter",
    },
  }
];
