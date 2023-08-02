import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface IModalDeleteInterview {
  open: boolean;
  setOpen: (open: boolean) => void;
  interviewId: string;
  interviewTopic: string;
}

export function ModalDeleteInterview({
  open,
  setOpen,
  interviewId,
  interviewTopic
}: IModalDeleteInterview) {
  const onDeleteInterview = async () => {
    await fetch(`/api/interview/${interviewId}`, {
      method: 'DELETE'
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{interviewTopic}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this interview?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="outline" onClick={onDeleteInterview}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
