/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

interface Props {
  data: object[];
}

interface LanguageType {
  id: string;
  name: string;
  image_url: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ListLanguage = [
  { id: "id", name: "indonesia", image_url: "/images/flag/id.png" },
  // { id: "en", name: "english", image_url: "/images/flag/en.png" },
];

type SwitchLanguageProps = {
  background?: string;
  flagSize?: string;
  padding?: string;
  showText?: boolean;
  position?: "bottom" | "top";
};

export default function SwitchLanguage({
  background = "bg_switch_lang",
  flagSize = "h-6 w-6",
  padding = "py-2 pl-3 pr-5",
  showText = true,
  position = "bottom"
}: SwitchLanguageProps) {
  const router = useRouter();
  const query = router;

  const [selected, setSelected] = useState<LanguageType>({
    id: "",
    name: "",
    image_url: "",
  });

  const handleLocaleChange = (event: any) => {
    setSelected({
      ...selected,
      name: event.name,
      image_url: event.image_url,
    });
    const value = event.id;
    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  useMemo(() => {
    const selected = ListLanguage.filter(
      (item) => item.id === query.locale?.toLocaleLowerCase()
    );
    setSelected(selected[0]);
  }, [query.locale]);

  return (
    <Listbox value={router.locale} onChange={handleLocaleChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1 w-full">
            <Listbox.Button
              className={`${background} relative w-full rounded-md ${padding} text-left shadow-sm focus:outline-none focus:ring-0 sm:text-sm uppercase text-whiteDefault-60 hover:text-whiteDefault-100 cursor-pointer group`}
            >
              <span className="flex items-center">
                <div className={`${flagSize} relative`}>
                  <Image
                    alt=""
                    src={
                      selected?.image_url
                        ? selected?.image_url
                        : "/images/flag/id.png"
                    }
                    quality={100}
                    layout="fill"
                  />
                </div>
                {showText ?
                  <span className="text-xs group-active:text-[13px] transition-all duration-200 ease-in-out xl:text-sm capitalize ml-3 block truncate">
                    {selected?.name ? selected?.name : "indonesia"}
                  </span>
                  : null
                }
              </span>
              <span className={`${showText ? "ml-3" : "ml-1"} pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2`}>
                {position == "top" ?
                  <AiOutlineCaretDown
                    className={`w-3 h-3 ${open ? "rotate-0" : "-rotate-180"
                      } transition-all ease-in-out duration-200`}
                  />
                  :
                  <AiOutlineCaretDown
                    className={`w-3 h-3 ${open ? "-rotate-180" : "rotate-0"
                      } transition-all ease-in-out duration-200`}
                  />
                }
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={`bg_switch_lang_list absolute ${position == "top" ? "-top-[46px]" : undefined} z-10 mt-1 max-h-56 w-full overflow-auto rounded-md pl-0 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                {ListLanguage.map((item: any) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg_switch_lang_list_item_active"
                          : "bg_switch_lang_list_item",
                        "relative cursor-pointer select-none py-2 px-3 text-xs xl:text-sm capitalize list-none"
                      )
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <div
                          className={`${selected ? "text-wwhite bg-bluePrimary" : ""
                            } flex items-center`}
                        >
                          <div className={`${flagSize} relative`}>
                            <Image
                              alt=""
                              src={item?.image_url}
                              quality={100}
                              layout="fill"
                            />
                          </div>
                          {showText ?
                            <span
                              className={classNames(
                                selected ? "font-semibold " : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {item?.name}
                            </span>
                            : null
                          }
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
