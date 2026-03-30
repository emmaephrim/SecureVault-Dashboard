import Logo from "../../assets/logo.png";

export default function MainHeader(): React.ReactElement {
    return (
        <>
            <div className="flex items-center">
                <div>
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="ml-3">
                    <h1 className="text-brand-on-surface text-headline-sm-emph">Secure Vault</h1>
                    <span className="text-brand-outline text-body-sm-emph">Enterprise Cloud Security Dashboard</span>
                </div>
            </div>
        </>
    )
}
