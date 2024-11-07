import { useState, useEffect } from "react";
import { Spinner } from "@blueprintjs/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { OverlayToaster } from "@blueprintjs/core";
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
import Cookies from "js-cookie";
import NotificationBar from "../../util/NotificationBar";
import axios from "axios";
import "ckeditor5/ckeditor5.css";
import styles from "./emailSettings.module.css";

const toasterInstance = OverlayToaster.create({ position: "bottom-right" });

function PostArticle() {
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("--Select--");
  const token = Cookies.get("user_token");
  const data = Cookies.get("user_profile");
  const profile = JSON.parse(data);

  // const apiLink = "http://127.0.0.1:3001/api/v1/";

  const { VITE_API_URL } = import.meta.env;

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

  function handleCategory(e) {
    setType(e.target.value);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
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
        data.append("photo", photo);
        data.append("title", title);
        data.append("content", content);
        data.append("category", type);
        data.append("createdBy", profile._id);
        data.append(
          "type",
          `${type === "66b0ec18ac7490f4f7dce39b" ? "Flier" : "Article"}`
        );

        const resp = await axios.post(`${VITE_API_URL}forum`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(resp.data);
        setTitle("");
        setContent("");
        setType("");
        setPhoto("");
        setFileName("");
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
      <div className={styles["emailSettings-actions"]}>
        <div className={styles["emailSettings-header-container"]}>
          <h2 className={styles["emailSettings-header"]}>Create An Article</h2>
        </div>
        <div className={styles["emailSettings-sub-container"]}>
          {error && (
            <NotificationBar
              intent={`bp5-intent-danger`}
              status={message.status}
            >
              <h5 className="bp5-heading">
                {message.status ? message.status : ""}
              </h5>
              {message.message}
            </NotificationBar>
          )}
          {!isLoading && !error && (
            <NotificationBar
              intent={`bp5-intent-success`}
              status={message.status}
            >
              <h5 className="bp5-heading">
                {message.status ? message.status : ""}
              </h5>
              {`Article Created Successfully... 🥳🥳🥳`}
            </NotificationBar>
          )}
          <ul className={styles["emailSettings-list-content"]}>
            <li className={styles["emailSettings-list"]}>
              Create Contents that can be viewed and read by viewers.
            </li>
          </ul>
          <form
            className={styles["emailSettings-form"]}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className={styles.formController}>
              <label htmlFor="title" className={styles.formLabel}>
                Title
                <span className={styles.reqField}>required</span>
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
                <option value={type}>--Select--</option>
                {category.map((value) => (
                  <option value={value._id} key={value._id}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
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
              {/* <label htmlFor="image" className={styles.formLabel}>
                Image
              </label>
              <input
                type="image"
                name="image"
                id="image"
                className={styles.formInput}
              /> */}
            </div>
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
                  initialData: "",
                }}
              />
            </div>
            <div className={styles.buttonAction}>
              <button className={styles.registerBtn}>
                {isLoading ? <Spinner size={18}></Spinner> : `Save`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostArticle;
