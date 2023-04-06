import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid"

interface Props {
  data: { pathname?: string; label: string}[],
  backgroundColor?: string
}

const Breadcrumbs = ({ data, backgroundColor }: Props) => {
  return (
    <nav className={`rounded-md flex items-center justify-center p-5 lg:w-fit w-full text-sm h-10 ${backgroundColor || 'bg-nileBlue-100'}`}>
      <ol className="list-reset flex items-center h-5">
        {data.map((item, index) => {
          if (index !== data.length - 1) {
            return (
              <div key={index} className="flex items-center text-whiteDefault-60 font-medium">
                <li><Link className="hover:text-whiteDefault-100" href={item.pathname ?? ""}>{item.label}</Link></li>
                <li><span className="mx-2"><ChevronRightIcon className="h-5 w-5" /></span></li>
              </div>
            )
          }
          return <li key={index} className="text-whiteDefault-100 font-bold">{item.label}</li>
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs;