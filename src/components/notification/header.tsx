import React, { useEffect } from 'react'
import LinkComponent from "@components/ui/link";
import {
    Notification
} from '@components/icons'
import { fetchUnreadNotification, useUnreadNotificationQuery } from 'src/framework/basic-rest/notification/get-unread';
import { useUI } from '@contexts/ui-context';

const NotificationHeader = () => {
  const { data, refetch, isFetching, isRefetching } =
    useUnreadNotificationQuery();
  const total = data ? data?.data?.total_unread : 0;
  const { setCountNotification, countNotification } = useUI();

  useEffect(() => {
    setCountNotification(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <LinkComponent
      href="/notification"
      className="active:translate-y-1 transition-all duration-200 ease-in-out"
    >
      <div className="relative">
        <Notification />
        <span className="absolute -top-1 -right-1 bg-red-600 rounded-full px-[3px] py-1 min-w-[18px] text-white text-xs text-center tracking-[0px] leading-[10px]">
          {countNotification}
        </span>
      </div>
    </LinkComponent>
  );
};

export default NotificationHeader;
