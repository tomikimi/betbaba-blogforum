import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Spinner, OverlayToaster } from "@blueprintjs/core";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Alignment,
  Indent,
  List,
} from "ckeditor5";
import NotificationBar from "../../util/NotificationBar";
import "ckeditor5/ckeditor5.css";
import styles from "./emailSettings.module.css";

// import profile from "./profile.module.css";
// import SideBar from "./SideBar";
const toasterInstance = OverlayToaster.create({ position: "bottom-right" });

function EmailSettings() {
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = Cookies.get("user_token");
  const data = Cookies.get("user_profile");
  const profile = JSON.parse(data);

  console.log(profile);

  const { VITE_API_URL } = import.meta.env;

  // const apiLink = "http://127.0.0.1:3001/api/v1/";

  useEffect(
    function () {
      async function fetchCategory() {
        try {
          if (token) {
            const res = await axios.get(`${VITE_API_URL}category`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setCategory(() => res.data.categories);
          }
        } catch (err) {
          console.log(err);
        }
      }
      fetchCategory();
    },
    [token, VITE_API_URL]
  );

  function showToast() {
    toasterInstance.show({
      message: "You are not logged in...",
      intent: "warning",
      timeout: "3000",
      isCloseButtonShown: false,
      icon: "offline",
    });
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleCategory(e) {
    setType(e.target.value);
  }

  function handlePhoto(e) {
    setPhoto(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");
      if (token) {
        const data = new FormData();
        data.append("title", title);
        data.append("content", content);
        data.append("category", type);
        data.append("createdBy", profile._id);
        data.append("photo", photo);
        const resp = await axios.post(`${VITE_API_URL}forum`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(resp.data);
        setTitle("");
        setContent("");
        setPhoto("");
        setType("");
      }

      if (!token) {
        showToast();
      }
    } catch (err) {
      setError(true);
      setMessage(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {/* <section className={styles.emailSettings}>
        <div className={profile["profile-header-container"]}>
          <h1 className={profile["profile-header"]}>Profile</h1>
          <p className={profile["profile-paragraph"]}>
            Manage your account profile and settings
          </p>
        </div>
        <div className={profile["profile-setting-container"]}>
          <SideBar></SideBar> */}
      <div className={styles["emailSettings-actions"]}>
        <div className={styles["emailSettings-header-container"]}>
          <h2 className={styles["emailSettings-header"]}>Create New Topic</h2>
        </div>
        <div className={styles["emailSettings-sub-container"]}>
          {error && (
            <NotificationBar intent={`bp5-intent-danger`} status={message.name}>
              {" "}
              <h5 className="bp5-heading">
                {message.name ? message.name : ""}
              </h5>
              {message.message}
            </NotificationBar>
          )}
          {!isLoading && !error && (
            <NotificationBar
              intent={`bp5-intent-success`}
              status={message.status}
            >
              {" "}
              <h5 className="bp5-heading">
                {message.status ? message.status : ""}
              </h5>
              Post Successfully Created... 👍
            </NotificationBar>
          )}
          <ul className={styles["emailSettings-list-content"]}>
            <li className={styles["emailSettings-list"]}>
              Create Contents that can be viewed and read by viewers.
            </li>
          </ul>

          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className={styles["emailSettings-form"]}
          >
            <div className={styles.formController}>
              <label htmlFor="title" className={styles.formLabel}>
                Title
                <span className={styles.reqField}>Required</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleTitle}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formController}>
              <label htmlFor="category" className={styles.formLabel}>
                Category
                <span className={styles.reqField}>required</span>
              </label>
              <select
                name="category"
                className={styles.formInput}
                onChange={handleCategory}
              >
                <option value="--Select--">--Select--</option>
                {category.map((value) => (
                  <option value={value._id} key={value._id}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
            {profile.role !== "user" && (
              <div className={styles.formController}>
                <label htmlFor="image" className={styles.formLabel}>
                  Image
                </label>
                <label className="bp5-file-input bp5-fill">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handlePhoto}
                  />
                  <span className="bp5-file-upload-input">
                    {fileName ? fileName : `Choose file...`}
                  </span>
                </label>
              </div>
            )}
            <div className={styles.formController}>
              <label htmlFor="content" className={styles.formLabel}>
                <span className={styles.reqField}>required</span>
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
                className="ck-editor__editable_inline"
                config={{
                  toolbar: {
                    items: [
                      "undo",
                      "redo",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "|",
                      "subscript",
                      "superscript",
                      "|",
                      "alignment",
                      "|",
                      "indent",
                      "|",
                      "bulletedList",
                      "numberedList",
                    ],
                  },
                  plugins: [
                    Bold,
                    Essentials,
                    Italic,
                    Mention,
                    Paragraph,
                    Undo,
                    Underline,
                    Strikethrough,
                    Subscript,
                    Superscript,
                    Alignment,
                    Indent,
                    List,
                  ],
                  licenseKey: "<YOUR_LICENSE_KEY>",
                  mention: {
                    // Mention configuration
                  },
                  initialData: "<p>Hello from CKEditor 5 in React!</p>",
                }}
              />
            </div>
            <div className={styles.buttonAction}>
              <button className={styles.registerBtn}>
                {isLoading ? <Spinner size={18}></Spinner> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div>
      </section> */}
    </>
  );
}

export default EmailSettings;
