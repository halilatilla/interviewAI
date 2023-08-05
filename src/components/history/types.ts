type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IModalDeleteInterview {
  open: boolean;
  setOpen: SetState<boolean>;
  interviewId: string;
  interviewTopic: string;
}
