'use client';

import Link from 'next/link';
import React from 'react';

import { Interview } from '@prisma/client';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Clock, CopyCheck, Edit2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { ModalDeleteInterview } from './ModalDeleteInterview';

type Props = {
  interview: Interview;
};

const HistoryComponent = ({ interview }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Card className="flex items-center justify-between p-4">
        <div className="flex items-center ">
          {interview.interviewType === 'SINGLE_SELECTION' ? (
            <CopyCheck className="mr-3" />
          ) : (
            <Edit2 className="mr-3" />
          )}
          <div className="ml-4 space-y-2">
            <Link
              className="text-base font-medium leading-none underline"
              href={`/dashboard/result/${interview.id}`}
            >
              {interview.topic}
            </Link>
            <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(interview.timeEnded ?? 0).toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {interview.interviewType}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsVerticalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem>Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>

      {open && (
        <ModalDeleteInterview
          open={open}
          setOpen={setOpen}
          interviewId={interview?.id}
          interviewTopic={interview?.topic}
        />
      )}
    </>
  );
};

export default HistoryComponent;
