import { ToggleButton } from "../cmps/ToggleButton.jsx"
import { getBaseUrl } from "../services/util.service.js"

const { useState } = React

export function Home() {
    
    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home">
            <h1>Todo's R Us!</h1>
            <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src={`${getBaseUrl()}/assets/img/${'todo'}.png`} alt="" />}
        </section>
    )
}