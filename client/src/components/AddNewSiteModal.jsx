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


export function AddNewSiteModal() {
  return (
    <Dialog>
      <form>
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
          <DialogHeader>
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
                />
              </div>
            </div>
          </div>
          <DialogFooter>
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
        </DialogContent>
      </form>
    </Dialog>
  )
}
