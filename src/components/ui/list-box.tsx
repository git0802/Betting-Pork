import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector, HiCheck } from "react-icons/hi";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
type Option = {
	name: string;
	value: string;
};

export default function ListBox({ options }: { options: Option[] }) {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const currentSelectedItem = query?.sort_by
		? options.find((o) => o.value === query.sort_by)!
		: options[0];
	const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);
	useEffect(() => {
		setSelectedItem(currentSelectedItem);
	}, [query?.sort_by]);
	function handleItemClick(values: Option) {
		setSelectedItem(values);
		const { sort_by, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(values.value !== options[0].value
						? { sort_by: values.value }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	return (
		<Listbox value={selectedItem} onChange={handleItemClick}>
			{({ open }) => (
				<div className="relative ms-2 lg:ms-0 z-10 min-w-[180px]">
					<Listbox.Button className="input-border-yellow text-left px-3">
						<span className="text-left uppercase">{t(selectedItem.name)}</span>
						<span className="absolute right-2 inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
							<HiOutlineSelector
								className="w-5 h-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						show={open}
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options
							static
							className="absolute w-full py-1 mt-1 overflow-auto bg-backgroundDefault-100 backgroundDefault-100 border border-borderDefault-100 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
						>
							{options?.map((option, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`${active ? "text-whiteDefault-100" : "text-whiteDefault-60"}
                          cursor-default select-none relative p-3 ps-10 pe-4 uppercase`
									}
									value={option}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`${
													selected ? "font-medium" : "font-normal"
												} block truncate`}
											>
												{t(option.name)}
											</span>
											{selected ? (
												<span
													className={`${active ? "text-whiteDefault-100" : ""}
                                check-icon absolute right-2 inset-y-0 start-0 flex items-center ps-3`}
												>
													<HiCheck className="w-5 h-5" aria-hidden="true" />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
}
