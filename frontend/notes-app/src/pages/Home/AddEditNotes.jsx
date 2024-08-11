import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  getAllNotes,
  type,
  noteData,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");

  async function addNewNote() {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  }

  async function editNote() {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  }

  function handleAddNote() {
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  }
  return (
    <>
        <div className="relative bg-zinc-800 text-white p-4">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center absolute -right-2 -top-2 hover:bg-slate-100"
            onClick={onClose}
          >
            <MdClose className="text-xl text-slate-400" />
          </button>

          <div className="flex flex-col gap-2 bg-zinc-800 my-2">
            <label className="input-label">Title</label>
            <input
              type="text"
              className="text-xl border px-2 py-1 bg-zinc-800 outline-none rounded"
              placeholder="Go To Gym At 5"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 my-4 bg-zinc-800">
            <label className="input-label">Content</label>
            <textarea
              type="text"
              className="text-sm border bg-zinc-800 outline-none p-2  rounded resize-none"
              placeholder="Content"
              rows={10}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <label className="input-label">Tags</label>
            <TagInput tags={tags} setTags={setTags} />
          </div>
          {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
          <button
            className="btn-primary font-medium mt-5 p-3 rounded"
            onClick={handleAddNote}
          >
            {type === "edit" ? "UPDATE" : "ADD"}
          </button>
        </div>
    </>
  );
};

export default AddEditNotes;
