import React, { useState } from "react";
import { Card } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "../lib/axios.js";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", { title: newTaskTitle });
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm vào.`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm task.", error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới.");
      }

      setNewTaskTitle("");
    } else {
      toast.error("Bạn cần nhập nội dung của nhiệm vụ.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Bạn cần kiếm nhiệm vụ nào?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className={`
    px-6 font-medium 
    ${
      newTaskTitle.trim()
        ? "text-black bg-gradient-to-r from-purple-400 to-purple-600 hover:bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500"
        : "bg-transparent text-gray-400 border border-gray-300 cursor-not-allowed"
    }
  `}
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
