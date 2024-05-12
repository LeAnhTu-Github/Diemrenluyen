"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useEventModal from "@/app/hooks/useEventModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";
const EventModal = () => {
  const router = useRouter();
  const eventModal = useEventModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      msv: "",
      name: "",
      classUneti: "",
      question: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/registerevent", data)
      .then(() => {
        toast.success("Đăng kí sự kiện thành công!");
        router.refresh();
        reset();
        eventModal.onClose();
      })
      .catch(() => {
        toast.error("Đăng kí thất bại.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng đến với sự kiện"
        subtitle="Đăng kí thông tin của bạn tại đây!"
      />
      <Input
        id="msv"
        label="Mã sinh viên"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Tên sinh viên"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="classUneti"
        label="Lớp"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="question"
        label="Câu hỏi cho diễn giả"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = <></>;
  return (
    <Modal
      disabled={isLoading}
      isOpen={eventModal.isOpen}
      title="Đăng kí sự kiện"
      actionLabel="Đăng kí"
      onClose={eventModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default EventModal;
