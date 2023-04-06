import Link from "@components/ui/link";
// import Link from "next/link";

interface Props {
  href: string;
  className?: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
  children?: JSX.Element 
}

const AuthMenu: React.FC<Props> = ({
  isAuthorized,
  href,
  className,
  btnProps,
  children
}) => {
  return isAuthorized ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <button {...btnProps} />
  );
};

export default AuthMenu;
