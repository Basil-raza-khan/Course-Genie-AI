import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegEdit } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditCourseBasicInfo({ course,refreshData}) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(course?.courseOutput?.course?.name);
    setDescription(course?.courseOutput?.course?.description);
  }, [course]);

  const onUpdateHandler = async () => {
    course.courseOutput.course.name = name;
    course.courseOutput.course.description = description;
    const result = await db
      .update(CourseList)
      .set({ courseOutput: course?.courseOutput })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });

      refreshData(true)
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <FaRegEdit />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Title & Basic Info</DialogTitle>
            <DialogDescription>
              <div className="mt-3 mb-3">
                <label>Course Title</label>
                <Input
                  defaultValue={course?.courseOutput?.course?.name}
                  onChange={(event) => setName(event?.target.value)}
                />
              </div>
              <div className="">
                <label>Description</label>
                <Textarea
                  className="h-40"
                  defaultValue={course?.courseOutput?.course?.description}
                  onChange={(event) => setDescription(event?.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCourseBasicInfo;
