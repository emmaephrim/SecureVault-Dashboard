// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NavigationSign: React.FC<{ children: any, shortcut: string }> = ({ children, shortcut }) => {
    return (
        <>
            <div className="flex items-center mr-2">
                <div className="bg-brand-inverse-primary px-3 border-2 border-brand-primary rounded-md mr-2">
                    {children}
                </div>
                <span className="text-brand-on-surface text-body-sm">{shortcut}</span>
            </div>
        </>
    )
}
