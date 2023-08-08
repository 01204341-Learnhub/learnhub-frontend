import { useTemplate } from "../hooks/useTemplate"

function Template() {
    const text = useTemplate("LearnHUB")
    return (
        <h1 className=" flex justify-center items-center h-screen font-bold text-7xl">Hello {text}</h1>
    )
}

export default Template