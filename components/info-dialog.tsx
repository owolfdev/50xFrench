import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogCloseButton,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import explanations from "@/data/french-phrase-explanations.json";

export function InfoDialog({ phrase }: { phrase: any }) {
  const explanation = explanations.find((item) => item.id === phrase.id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>
            <span className="text-2xl">About</span>
          </DialogTitle>
          <DialogDescription>{phrase.phrase}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-xl">
          <ReactMarkdown>{explanation?.explanation}</ReactMarkdown>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Exit</Button> */}
          <DialogCloseButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
