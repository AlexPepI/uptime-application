import LayoutUnauth from "../components/LayoutUnauth"
import { Button } from "@/components/ui/button"

const HomePage = () => {

    return(
        <LayoutUnauth>
            Home Page
            <Button className="rounded-full text-custom-color">Click Me</Button>
        </LayoutUnauth>
    )

}

export default HomePage