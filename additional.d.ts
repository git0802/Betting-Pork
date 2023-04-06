
export type PropsChildren = {
    children?: React.ReactNode
};

declare module "react" {
    function forwardRef<P = {}>(
        render: (props: P, ref: React.Ref) => React.ReactElement | null
    ): (props: P & React.RefAttributes) => React.ReactElement | null;
}