import './WizdomLogo.css'

const wizdomLogoPath = "http://127.0.0.1:5173/public/wizdom_logo.svg"

export function WizdomFullLogo(){
    return <div className="wizdom-logo">
        <img  src={wizdomLogoPath} alt="wizdom logo" className="wizdom-svg" />
        <span className="name">wizdom</span>
    </div>
}

export function WizdomLogo(){
    return <img  src={wizdomLogoPath} alt="wizdom logo" className="wizdom-svg" />
}