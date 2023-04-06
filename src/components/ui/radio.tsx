import React from "react";
import { useTranslation } from "next-i18next";
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelKey?: string;
  label?: string | any;
}

const notificationMethods = [
  { id: "email", title: "Email" },
  { id: "sms", title: "Phone (SMS)" },
  { id: "push", title: "Push notification" },
];
export const CheckBox = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ labelKey, label, ...rest }, ref) => {
    const { t } = useTranslation();
    return (
      // <label className="group flex items-center text-heading text-sm cursor-pointer">
      // 	<input
      // 		type="checkbox"
      // 		className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading"
      // 		ref={ref}
      // 		{...rest}
      // 	/>
      // 	<span className="ms-4 -mt-0.5">{labelKey ? t(labelKey) : label}</span>
      // </label>
      <div>
        <label className="text-base font-medium text-gray-900">
          Notifications
        </label>
        <p className="text-sm leading-5 text-gray-500">
          How do you prefer to receive notifications?
        </p>
        <fieldset className="mt-4">
          <legend className="sr-only">Notification method</legend>
          <div className="space-y-4">
            {notificationMethods.map((notificationMethod) => (
              <div key={notificationMethod.id} className="flex items-center">
                <input
                  id={notificationMethod.id}
                  name="notification-method"
                  type="radio"
                  defaultChecked={notificationMethod.id === "email"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor={notificationMethod.id}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {notificationMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }
);
