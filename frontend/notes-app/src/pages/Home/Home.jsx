import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import AddNotesImg from "../../../src/assets/add-note-svgrepo-com.svg";
import SearchNotesImg from "../../../src/assets/no-data-icon.svg";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    msg: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured.Please try again");
    }
  };

  async function deleteNote(data) {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occured.Please try again");
      }
    }
  }

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  function handleEdit(noteDetails) {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  }

  async function updateIsPinned(noteData) {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        showToastMessage("Note pinned successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function showToastMessage(message, type) {
    setShowToastMsg({
      isShown: true,
      message: message,
      type: type,
    });
  }

  function handleCloseToast() {
    setShowToastMsg({
      isShown: false,
      msg: "",
      type: "",
    });
  }

  //Search for a Note
  async function onSearchNote(query) {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleClearSearch() {
    setIsSearch(false);
    getAllNotes();
  }

  return (
    <>
      <div class="relative min-h-screen bg-zinc-900">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none"></div>
        
        <div className="relative">
          <Navbar
            userInfo={userInfo}
            onSearchNote={onSearchNote}
            handleClearSearch={handleClearSearch}
            getAllNotes={getAllNotes}
          />

          <div className="container px-8 pt-8">
            {allNotes.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allNotes.map((item) => (
                  <NoteCard
                    key={item._id}
                    title={item.title}
                    date={item.createdOn}
                    content={item.content}
                    tags={item.tags}
                    isPinned={item.isPinned}
                    onEdit={() => {
                      handleEdit(item);
                    }}
                    onDelete={() => {
                      deleteNote(item);
                    }}
                    onPinNote={() => {
                      updateIsPinned(item);
                    }}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={isSearch ? SearchNotesImg : AddNotesImg}
                message={
                  isSearch
                    ? `Oops! No notes found matching your search`
                    : `Start creating your first note! Click the 'Add' button to note down your thoughts, ideas and reminders. Let's get started! `
                }
              />
            )}
          </div>
          <button
            className="w-8 h-8 rounded-md md:w-16 md:h-16 md:pl-[15px] items-center justify-center md:rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 z-20"
            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}
          >
            <MdAdd className="text-[32px] text-white" />
          </button>

          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              },
            }}
            contentLabel=""
            className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
          >
            <AddEditNotes
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={() => {
                setOpenAddEditModal({
                  isShown: false,
                  type: "add",
                  data: null,
                });
              }}
              getAllNotes={getAllNotes}
              showToastMessage={showToastMessage}
            />
          </Modal>
          <Toast
            isShown={showToastMsg.isShown}
            message={showToastMsg.message}
            type={showToastMsg.type}
            onClose={handleCloseToast}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
