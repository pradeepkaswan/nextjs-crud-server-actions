"use client";

import { deleteWorkSession } from "@/app/accounts/actions";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import WorkSessionFormRow from "./work-session-form-row";

type Props = {
  session: {
    id: string;
    accountId: string;
    description: string | null;
    startsOn: Date | null;
    hours: number | null;
  };
};

const WorkSessionRow: React.FC<Props> = ({ session }) => {
  const [editMode, setEditMode] = useState(false);

  if (editMode)
    return (
      <WorkSessionFormRow
        account={{ id: session.accountId }}
        session={session}
        onCancelClick={() => setEditMode(false)}
      />
    );
  return (
    <div key={session.id} className="flex border-b border-slate-200 py-3">
      <div className="flex-1 font-medium">
        {session.startsOn?.toDateString()}
      </div>
      <div className="flex-[3_3_0%]">{session.description}</div>
      <div className="flex-1 text-left">{session.hours}</div>
      <div className="flex flex-1 text-right">
        <Button
          variant="outline"
          size="sm"
          className="text-slate-500"
          onClick={() => setEditMode(true)}
        >
          <PencilIcon size={16} />
        </Button>
        <form action={deleteWorkSession}>
          <input type="hidden" name="id" value={session.id} />
          <Button variant="destructive" size="sm">
            <TrashIcon size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WorkSessionRow;
