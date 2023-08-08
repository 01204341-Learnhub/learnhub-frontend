import { useState } from "react";

function useTemplate(showText: string) {
    const [text] = useState(showText);
    return text
}

export { useTemplate };
