import { useState   } from "react"
import { useAuth } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus } from "lucide-react"
import { OverlayLoader } from "./OverlayLoader"
import { FetchAlert } from "./DashboardComponents/FetchAlert"

export function AddNewSiteModal() {

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [url,setUrl] = useState("");
  const [open,setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {getToken} = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    const normalized = `https://${url}`
    setLoading(true);
    setError(null)
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/uptime/url`,{
        method: "POST",
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ url: normalized })
      });
      const json = await response.json();
      if(!response.ok){
        setError(json.msg); //set alert = json.msg
        return;
      }
      console.log(json) //Succeed Tick etc
    } catch (error) {
      console.log("Error :", error);
    }finally {
        setLoading(false)
      }
    setOpen(false)
  }

  return (
  
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button className="
              mr-4
              active:bg-custom-accent/80 
              transition
              cursor-pointer
              text-xs
              md:text-base
              "
          >
              <CirclePlus/>Create New Monitor
          </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <OverlayLoader loading={loading}>
        <DialogHeader >
          <DialogTitle>Add Uptime Check</DialogTitle>
          <DialogDescription>
            Create a new uptime check by providing the URL you want us to monitor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="new-url" className="cursor-pointer" >URL</Label>
            <div className="flex items-stretch rounded-3xl border">
              <span className="inline-flex items-center px-3 text-sm text-gray-500 select-none">
                https://
              </span>
              <Input
                name="new-url"
                className="flex-1 border-none focus:ring-0"
                placeholder="new-domain.com"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            {error && (
        <FetchAlert
          error={error}
        />
      )}
          </div>
        </div>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button 
          type="submit"
          className="                            
              active:bg-custom-accent/80 
              transition
              cursor-pointer"
          >
              Save changes
          </Button>
        </DialogFooter>
        </OverlayLoader>
        </form>
      </DialogContent>

    </Dialog>
  )
}
