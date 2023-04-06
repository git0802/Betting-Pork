import { getAuthPin } from "@framework/utils/get-AuthPin";
import { getHasPin } from "@framework/utils/get-haspin";
import { getToken } from "@framework/utils/get-token";
import { saveConfigToCookie } from "@utils/functionutil";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect } from "react";

export interface State {
  title: string;
  template: number;
  instantDepo: boolean;
  liveEvent: boolean;
  isReady: boolean;
  isAuthorized: boolean;
  displaySidebar: boolean;
  displayFilter: boolean;
  displayModal: boolean;
  displayShop: boolean;
  displayCart: boolean;
  displaySearch: boolean;
  modalView: string;
  modalData: any;
  drawerView: string | null;
  toastText: string;
  lobbyUrl: string;
  lobbyResultUrl: string;
  countNotification: number;
  isPinVerified: boolean;
  hasPin: boolean | null;
  localFilterQuery: ParsedUrlQuery;
}

const initialState = {
  title: "home",
  template: 0,
  instantDepo: true,
  liveEvent: false,
  isReady: false,
  isAuthorized: false,
  displaySidebar: false,
  displayFilter: false,
  displayModal: false,
  displayShop: false,
  displayCart: false,
  displaySearch: false,
  modalView: "LOGIN_VIEW",
  drawerView: null,
  modalData: null,
  toastText: "",
  lobbyUrl: "",
  lobbyResultUrl: "",
  countNotification: 0,
  isPinVerified: false,
  hasPin: null,
  localFilterQuery: {},
};

type Action =
  | {
      type: "SET_READY";
    }
  | {
      type: "SET_AUTHORIZED";
    }
  | {
      type: "SET_UNAUTHORIZED";
    }
  | {
      type: "SET_NO_PIN";
    }
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "OPEN_CART";
    }
  | {
      type: "CLOSE_CART";
    }
  | {
      type: "OPEN_SEARCH";
    }
  | {
      type: "CLOSE_SEARCH";
    }
  | {
      type: "SET_TOAST_TEXT";
      text: ToastText;
    }
  | {
      type: "OPEN_FILTER";
    }
  | {
      type: "CLOSE_FILTER";
    }
  | {
      type: "OPEN_SHOP";
    }
  | {
      type: "CLOSE_SHOP";
    }
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: MODAL_VIEWS;
    }
  | {
      type: "SET_DRAWER_VIEW";
      view: DRAWER_VIEWS;
    }
  | {
      type: "SET_MODAL_DATA";
      data: any;
    }
  | {
      type: "SET_HAS_PIN";
      status: boolean;
    }
  | {
      type: "SET_USER_AVATAR";
      value: string;
    }
  | {
      type: "SET_LOBBY_URL";
      text: LobbyUrl;
    }
  | {
      type: "SET_LOBBY_RESULT_URL";
      text: LobbyUrl;
    }
  | {
      type: "SET_COUNT_NOTIFICATION";
      text: CountNotification;
    }
  | {
      type: "SET_PIN_VERIFIED";
      status: boolean;
    }
  | {
      type: "SET_LOCAL_FILTER_QUERY";
      query: ParsedUrlQuery;
    };

type MODAL_VIEWS =
  | "SIGN_UP_VIEW"
  | "LOGIN_VIEW"
  | "FORGET_PASSWORD"
  | "PIN_VERIFICATION"
  | "PRODUCT_VIEW"
  | "WITHDRAWAL_CONFIRM_VIEW";
type DRAWER_VIEWS = "CART_SIDEBAR" | "MOBILE_MENU";
type ToastText = string;
type LobbyUrl = string;
type CountNotification = number;

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_READY": {
      return {
        ...state,
        isReady: true,
      };
    }
    case "SET_AUTHORIZED": {
      return {
        ...state,
        isAuthorized: true,
      };
    }
    case "SET_UNAUTHORIZED": {
      return {
        ...state,
        isAuthorized: false,
      };
    }
    case "SET_PIN_VERIFIED": {
      return {
        ...state,
        isPinVerified: action.status,
      };
    }
    case "SET_HAS_PIN": {
      return {
        ...state,
        hasPin: action.status,
      };
    }
    case "SET_NO_PIN": {
      return {
        ...state,
        isHasPin: false,
      };
    }
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
        drawerView: null,
      };
    }
    case "OPEN_CART": {
      return {
        ...state,
        displayCart: true,
      };
    }
    case "CLOSE_CART": {
      return {
        ...state,
        displayCart: false,
      };
    }
    case "OPEN_SEARCH": {
      return {
        ...state,
        displaySearch: true,
      };
    }
    case "CLOSE_SEARCH": {
      return {
        ...state,
        displaySearch: false,
      };
    }
    case "OPEN_FILTER": {
      return {
        ...state,
        displayFilter: true,
      };
    }
    case "CLOSE_FILTER": {
      return {
        ...state,
        displayFilter: false,
      };
    }
    case "OPEN_SHOP": {
      return {
        ...state,
        displayShop: true,
      };
    }
    case "CLOSE_SHOP": {
      return {
        ...state,
        displayShop: false,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case "SET_DRAWER_VIEW": {
      return {
        ...state,
        drawerView: action.view,
      };
    }
    case "SET_MODAL_DATA": {
      return {
        ...state,
        modalData: action.data,
      };
    }
    case "SET_TOAST_TEXT": {
      return {
        ...state,
        toastText: action.text,
      };
    }
    case "SET_USER_AVATAR": {
      return {
        ...state,
        userAvatar: action.value,
      };
    }
    case "SET_LOBBY_URL": {
      return {
        ...state,
        lobbyUrl: action.text,
      };
    }
    case "SET_LOBBY_RESULT_URL": {
      return {
        ...state,
        lobbyResultUrl: action.text,
      };
    }
    case "SET_COUNT_NOTIFICATION": {
      return {
        ...state,
        countNotification: action.text,
      };
    }
    case "SET_LOCAL_FILTER_QUERY": {
      return {
        ...state,
        localFilterQuery: action.query,
      };
    }
  }
}

export const useUI = () => {
  const context = React.useContext(UIContext);

  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = (props: any) => {
  useEffect(() => {
    saveConfigToCookie(props?.pageProps?.config);
  }, []);

  initialState.template = props?.pageProps?.config?.config?.template;
  initialState.title = props?.pageProps?.config?.config?.title;
  initialState.instantDepo = props?.pageProps?.config?.config?.instant_deposit;
  initialState.liveEvent = props?.pageProps?.config?.config?.live_event;

  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const setReady = () => dispatch({ type: "SET_READY" });
  const authorize = () => dispatch({ type: "SET_AUTHORIZED" });
  const unauthorize = () => dispatch({ type: "SET_UNAUTHORIZED" });
  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: "CLOSE_SIDEBAR" })
      : dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: "CLOSE_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });
  const toggleCart = () =>
    state.displaySidebar
      ? dispatch({ type: "CLOSE_CART" })
      : dispatch({ type: "OPEN_CART" });
  const closeCartIfPresent = () =>
    state.displaySidebar && dispatch({ type: "CLOSE_CART" });

  const openFilter = () => dispatch({ type: "OPEN_FILTER" });
  const closeFilter = () => dispatch({ type: "CLOSE_FILTER" });

  const openShop = () => dispatch({ type: "OPEN_SHOP" });
  const closeShop = () => dispatch({ type: "CLOSE_SHOP" });

  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });
  const openSearch = () => dispatch({ type: "OPEN_SEARCH" });
  const closeSearch = () => dispatch({ type: "CLOSE_SEARCH" });

  const setUserAvatar = (_value: string) =>
    dispatch({ type: "SET_USER_AVATAR", value: _value });

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: "SET_MODAL_VIEW", view });
  const setDrawerView = (view: DRAWER_VIEWS) =>
    dispatch({ type: "SET_DRAWER_VIEW", view });
  const setModalData = (data: any) =>
    dispatch({ type: "SET_MODAL_DATA", data });
  const setHasPin = (status: boolean) =>
    dispatch({ type: "SET_HAS_PIN", status });
  const setLobbyUrl = (text: string) =>
    dispatch({ type: "SET_LOBBY_URL", text });
  const setLobbyResultUrl = (text: string) =>
    dispatch({ type: "SET_LOBBY_RESULT_URL", text });
  const setCountNotification = (text: number) =>
    dispatch({ type: "SET_COUNT_NOTIFICATION", text });
  const setPinVerified = (status: boolean) =>
    dispatch({ type: "SET_PIN_VERIFIED", status });
  const setLocalFilterQuery = (query: ParsedUrlQuery) =>
    dispatch({ type: "SET_LOCAL_FILTER_QUERY", query });

  const value = React.useMemo(
    () => ({
      ...state,
      setReady,
      authorize,
      unauthorize,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openCart,
      closeCart,
      toggleCart,
      closeCartIfPresent,
      openFilter,
      closeFilter,
      openShop,
      closeShop,
      openModal,
      closeModal,
      openSearch,
      closeSearch,
      setModalView,
      setDrawerView,
      setUserAvatar,
      setModalData,
      setLobbyUrl,
      setLobbyResultUrl,
      setCountNotification,
      setPinVerified,
      setHasPin,
      setLocalFilterQuery,
    }),
    [state]
  );

  useEffect(() => {
    if (getToken()) authorize();
    const setAuthPin = getAuthPin() === "true" ? true : false;
    if (getAuthPin()) setPinVerified(setAuthPin);
    const setInitialHasPin = getHasPin() === "true" ? true : false;
    if (getHasPin()) setHasPin(setInitialHasPin);
    window.addEventListener("keydown", (e) => {
      if (e.code == "Escape") {
        closeModal();
      }
    });
    setReady();
  }, []);

  return <UIContext.Provider value={value} {...props} />;
};
