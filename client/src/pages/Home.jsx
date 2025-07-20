import LayoutUnauth from "../components/LayoutUnauth";
import SplitText from "@/reactBits/SplitText";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const HomePage = () => {

    const navigate = useNavigate();
    const {getToken} = useAuth();

    useEffect(()=>{
        const checkIfAuth = async ()=>{
            const token = await getToken();
            console.log(token);
            if(token!==null){
                navigate("/console")
            }
        }
        checkIfAuth();
    },[])

    return(
        <LayoutUnauth>
            <div className="flex flex-col">
        <SplitText
            text={`Keep Your Services Up & Running!`}
            className="text-xl md:text-4xl xl:text-6xl font-bold text-center text-white mb-[2rem]"                
            duration={1}
            delay={10}
            ease="elastic.out(1,0.3)"
            splitType="chars"
            // from={{ opacity: 0, y: 40 }}
            // to={{ opacity: 1, y: 0 }}
            // threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
        />
                <SplitText
              text={
    <>
      Monitor up to 5 URLs every 5 minutes<br/>
      with real‑time updates and historical charts.
    </>
              }
            className=" text-xs md:text-xl xl:text-3xl text-center text-white mb-[2rem]"                
            duration={1}
            delay={10}
            ease="power3.out"
            splitType="chars"
            // from={{ opacity: 0, y: 40 }}
            // to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
        />
            <div className="flex justify-center">            
                <Button onClick={()=>{navigate("/sign-up")}} style={{color:"#FFFFFF"}} className="mb-[30vh] w-[20%]">Sign Up</Button>
</div>
            </div>
        </LayoutUnauth>
    )

}

export default HomePage