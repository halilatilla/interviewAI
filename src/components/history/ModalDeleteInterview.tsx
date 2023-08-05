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
import { useDeleteInterview } from '@/hooks/mutations';

import { IModalDeleteInterview } from './types';

export function ModalDeleteInterview({
  open,
  setOpen,
  interviewId,
  interviewTopic
}: IModalDeleteInterview) {
  const deleteInterviewMutation = useDeleteInterview();

  const onDeleteInterview = () => {
    try {
      deleteInterviewMutation(interviewId);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
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
