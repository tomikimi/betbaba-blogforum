import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CToaster } from "@coreui/react";
import { format } from "date-fns";
import { Spinner } from "@blueprintjs/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
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
import parse from "html-react-parser";
import Cookie from "js-cookie";
import styles from "./topicReplies.module.css";
import "ckeditor5/ckeditor5.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import axios from "axios";
// import NotificationBar from "../../util/NotificationBar";
import NotificationToast from "../../util/NotificationToast";
import AccountCreationSignIn from "../../util/AccountCreationSignIn";

const { VITE_API_URL, VITE_PHOTO_PATH } = import.meta.env;

function ForumTopicReplies() {
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [message, setMessage] = useState("");
  const [replies, setReplies] = useState([]);
  const [recentReply, setRecentReply] = useState("");
  const [openThreadCtrl, setOpenThreadCtrl] = useState(false);
  const [openThreadID, setOpenThreadID] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [reload, setReload] = useState(false);
  const [openCommentID, setOpenCommentID] = useState("");
  const [toast, addToast] = useState(0);
  const [comment, setComment] = useState("");
  const { id: forumID } = useParams();
  const token = Cookie.get("user_token");
  console.log(token);
  const profile = Cookie.get("user_profile");
  const { displayName, _id: userID } = profile
    ? JSON.parse(profile)
    : { displayName: "None", _id: 0 };

  useEffect(
    function () {
      async function fetchTopicReviews() {
        try {
          console.log("UseEffect Runs");
          if (token) {
            const res = await axios.get(`${VITE_API_URL}forum/${forumID}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const { data } = res.data;
            console.log(data);
            const val = Number(
              data.forum[0].review.length === 0
                ? 0
                : data.forum[0].review.length - 1
            );

            setRecentReply(data.forum[0].review[val] ?? `no data`);
            setReplies(() => data.forum[0]);
          }
        } catch (err) {
          console.log(err);
        }
        return function () {
          setReload(() => !reload);
        };
      }
      fetchTopicReviews();
    },
    [forumID, token, reload]
  );

  // function handleReview(e) {
  //   setReview(e.target.value);
  // }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    const data = {
      review,
      forum: forumID,
      user: userID,
    };
    try {
      setIsLoading(true);
      // setError("");
      const res = await axios.post(`${VITE_API_URL}review`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res);
      addToast(() => (
        <NotificationToast
          color={"success"}
          message={"Review Posted Successfully👌..."}
        ></NotificationToast>
      ));

      // setMessage(res.data);
      setReload(() => !reload);
      setReview("");
    } catch (err) {
      addToast(
        () => (
          <NotificationToast
            color={"danger"}
            message={`${err.response.data.message}...😞`}
          ></NotificationToast>
        )
        // exampleToast("danger", `${err.response.data.message}...😞`)
      );
      setReview("");
      // setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userComment = {
        forum: forumID,
        review: openThreadID,
        comment,
        user: userID,
      };
      const res = await axios.post(`${VITE_API_URL}comment`, userComment, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = res;
      if (data.status === "Success") {
        addToast(
          () => (
            <NotificationToast
              color={"success"}
              message={"Comment Posted Successfully👌..."}
            ></NotificationToast>
          )
          // exampleToast("success", "Comment Posted Successfully👌...")
        );
        setReload(() => !reload);
        setComment("");
      }
    } catch (err) {
      addToast(
        () => (
          <NotificationToast
            color={"danger"}
            message={`${err.response.data.message}...😞`}
          ></NotificationToast>
        )
        // exampleToast("danger", `${err.response.data.message}...😞`)
      );
      setComment("");
    } finally {
      setIsLoading(false);
    }
  }

  function formatDate(value, type) {
    let res;
    if (type === "PostTime") {
      res = format(value, "EEEE MMM dd yyyy, hh:mm aaa");
    } else if (type === "ReplyTime") {
      res = format(value, "MMM dd, hh:mm aaa");
    } else if (type === "ReplyTimeMobile") {
      res = format(value, "EEE MMM dd");
    } else if (type === "CreatedDay") {
      res = format(value, "MMM dd");
    } else if (type === "newReply") {
      res = format(value, "hh:mm aaa");
    }

    return res;
  }

  function getFirstLetter(value) {
    // Using string literal
    // const data = value;
    // using split
    const data2 = value.split("", 1);
    return data2;
  }

  function handleOpenThread(id, status) {
    setOpenThreadCtrl(() => !status);
    setOpenThreadID(id);
  }

  function handleOpenComment(id, status) {
    setOpenComment(() => !status);
    setOpenCommentID(id);
  }

  if (!token) {
    return <AccountCreationSignIn></AccountCreationSignIn>;
  }

  return (
    <>
      <section className={styles["section-forum-topic"]}>
        <div className={styles["forum-topic-container"]}>
          <div className={styles["forum-topic-replies-container"]}>
            <div className={styles["forum-topic-main-post"]}>
              {replies.length === 0 ? (
                <Spinner size={18}></Spinner>
              ) : (
                <>
                  <h2 className={styles["main-post-header"]}>
                    {replies.title}
                  </h2>
                  <div className={styles["main-post-timeline"]}>
                    <span
                      className={`${styles["main-post-user"]} ${styles["post-sz-2"]}`}
                    >
                      By {replies.createdBy[0].name}
                    </span>
                    <span className={styles["main-post-time"]}>
                      posted on {formatDate(replies.createdAt, "PostTime")}
                    </span>
                    {replies.photo ? (
                      <div>
                        <img
                          className={styles["main-post-photo"]}
                          src={`${VITE_PHOTO_PATH}${replies.photo}`}
                          alt={"forum-photo"}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles["main-post-container"]}>
                      <CToaster
                        className="p-3"
                        placement="top-end"
                        push={toast}
                      />
                      <span
                        className={`${styles["main-post-content"]} ${styles["post-sz-2"]}`}
                        dangerouslySetInnerHTML={{
                          __html: replies.content,
                        }}
                      ></span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={styles["main-post-user-replies"]}>
              {replies.length === 0 ? (
                <Spinner size={18}></Spinner>
              ) : (
                replies.review.map((review) => (
                  <>
                    <div className={styles["user-reply-container-mobile"]}>
                      <div className={styles["user-reply-info-mobile"]}>
                        <div className={styles["reply-info"]}>
                          <div className={styles["reply-user-content"]}>
                            <span className={styles["reply-user-letter"]}>
                              {getFirstLetter(review.postBy[0].displayName)}
                            </span>
                          </div>
                        </div>
                        <div className={styles["reply-details"]}>
                          <span
                            className={`${styles["main-post-user"]} ${styles["txt-align"]} ${styles["post-sz-1"]}`}
                          >
                            {review.postBy[0].displayName}
                          </span>
                          <span className={styles["reply-time"]}>
                            Posted on {formatDate(review.createdAt, "PostTime")}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p
                          className={styles["reply-data"]}
                          dangerouslySetInnerHTML={{
                            __html: parse(review.review),
                          }}
                        ></p>
                        <div className={styles["reply-comments"]}>
                          <span
                            className={styles["reply-time"]}
                            onClick={() =>
                              handleOpenComment(review._id, openComment)
                            }
                          >
                            {review.comment.length} Replies
                          </span>
                          <button
                            className={`${styles["reply-button"]} mg-t-3`}
                            onClick={() =>
                              handleOpenThread(review._id, openThreadCtrl)
                            }
                          >
                            Reply
                          </button>
                        </div>
                        {openComment && openCommentID === review._id && (
                          <div className={styles["reply-comment-container"]}>
                            {review.comment.map((comment) => (
                              <div
                                className={`${styles["main-post-user-replies"]} ${styles["main-post-user-replies-mobile"]}`}
                                key={comment._id}
                              >
                                <div className={styles["comment-reply"]}>
                                  <div className={styles["reply-comment-info"]}>
                                    <div
                                      className={styles["reply-user-content"]}
                                    >
                                      <span
                                        className={
                                          styles["comment-user-letter"]
                                        }
                                      >
                                        {getFirstLetter(
                                          `${comment.postBy[0].displayName}`
                                        )}
                                      </span>
                                    </div>
                                    <div
                                      className={
                                        styles["main-post-user-details"]
                                      }
                                    >
                                      <span
                                        className={`${styles["main-post-user"]} ${styles["txt-align"]} ${styles["post-sz-2"]}`}
                                      >
                                        {comment.postBy[0].displayName}
                                      </span>
                                      <span className={styles["reply-time"]}>
                                        Posted on{" "}
                                        {formatDate(
                                          review.comment[0].createdAt,
                                          "ReplyTimeMobile"
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                  <div className={styles["reply-details"]}>
                                    <p
                                      className={styles["reply-data"]}
                                      dangerouslySetInnerHTML={{
                                        __html: parse(comment.comment),
                                      }}
                                    ></p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {openThreadCtrl && openThreadID === review._id && (
                          <>
                            <div className={styles["reply-comment-container"]}>
                              <CKEditor
                                key={review._id}
                                editor={ClassicEditor}
                                data={comment}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setComment(data);
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
                              <button
                                type="submit"
                                className={`${styles["reply-button"]} mg-t-3`}
                                onClick={handleCommentSubmit}
                              >
                                {isLoading ? (
                                  <Spinner size={18}></Spinner>
                                ) : (
                                  `Comment`
                                )}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={styles["user-reply"]} key={review._id}>
                      <div className={styles["reply-info"]}>
                        <span
                          className={`${styles["main-post-user"]} ${styles["txt-align"]} ${styles["post-sz-1"]}`}
                        >
                          {review.postBy[0].displayName}
                        </span>
                        <div className={styles["reply-user-content"]}>
                          <span className={styles["reply-user-letter"]}>
                            {getFirstLetter(review.postBy[0].displayName)}
                          </span>
                        </div>
                      </div>
                      <div className={styles["reply-details"]}>
                        <span className={styles["reply-time"]}>
                          Posted on {formatDate(review.createdAt, "PostTime")}
                        </span>
                        <p
                          className={styles["reply-data"]}
                          dangerouslySetInnerHTML={{
                            __html: parse(review.review),
                          }}
                        ></p>
                        <div className={styles["reply-comments"]}>
                          <span
                            className={styles["reply-time"]}
                            onClick={() =>
                              handleOpenComment(review._id, openComment)
                            }
                          >
                            {review.comment.length} Replies
                          </span>
                          <button
                            className={`${styles["reply-button"]} mg-t-3`}
                            onClick={() =>
                              handleOpenThread(review._id, openThreadCtrl)
                            }
                          >
                            Reply
                          </button>
                        </div>
                        {openComment && openCommentID === review._id && (
                          <div className={styles["reply-comment-container"]}>
                            {review.comment.map((comment) => (
                              <div
                                className={styles["main-post-user-replies"]}
                                key={comment._id}
                              >
                                <div className={styles["comment-reply"]}>
                                  <div className={styles["reply-info"]}>
                                    <span
                                      className={`${styles["main-post-user"]} ${styles["txt-align"]} ${styles["post-sz-2"]}`}
                                    >
                                      {comment.postBy[0].displayName}
                                    </span>
                                    <div
                                      className={styles["reply-user-content"]}
                                    >
                                      <span
                                        className={
                                          styles["comment-user-letter"]
                                        }
                                      >
                                        {getFirstLetter(
                                          `${comment.postBy[0].displayName}`
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                  <div className={styles["reply-details"]}>
                                    <span className={styles["reply-time"]}>
                                      Posted on{" "}
                                      {formatDate(
                                        review.comment[0].createdAt,
                                        "PostTime"
                                      )}
                                    </span>
                                    <p
                                      className={styles["reply-data"]}
                                      dangerouslySetInnerHTML={{
                                        __html: parse(comment.comment),
                                      }}
                                    ></p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {openThreadCtrl && openThreadID === review._id && (
                          <>
                            <div className={styles["reply-comment-container"]}>
                              <CKEditor
                                key={review._id}
                                editor={ClassicEditor}
                                data={comment}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setComment(data);
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
                              <button
                                type="submit"
                                className={`${styles["reply-button"]} mg-t-3`}
                                onClick={handleCommentSubmit}
                              >
                                {isLoading ? (
                                  <Spinner size={18}></Spinner>
                                ) : (
                                  `Comment`
                                )}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ))
              )}

              <form
                onSubmit={handleReviewSubmit}
                className={styles["form-reply"]}
              >
                <div className={`${styles["user-reply"]}`}>
                  <div className={styles["reply-info-responsive"]}>
                    <div className={styles["reply-user-content"]}>
                      <span className={styles["reply-user-letter"]}>
                        {getFirstLetter(displayName)}
                      </span>
                    </div>
                  </div>
                  <div className={styles["reply-details"]}>
                    {/* <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={review}
                      onChange={handleReview}
                      className={styles["reply-container"]}
                      placeholder="Reply to this post..."
                    ></textarea> */}
                    <CKEditor
                      key={review._id}
                      editor={ClassicEditor}
                      data={review}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setReview(data);
                      }}
                      // style={{ width: "inherit !important;" }}
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
                    <button className={styles["reply-button"]}>
                      {isLoading ? <Spinner size={18}></Spinner> : `Reply`}
                    </button>
                  </div>
                </div>
                <div className={`${styles["user-reply-mobile"]}`}>
                  <div className={styles["reply-info-responsive"]}>
                    <div className={styles["reply-user-content"]}>
                      <span className={styles["reply-user-letter"]}>
                        {getFirstLetter(displayName)}
                      </span>
                    </div>
                  </div>
                  <div className={styles["reply-details"]}>
                    {/* <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={review}
                      onChange={handleReview}
                      className={styles["reply-container"]}
                      placeholder="Reply to this post..."
                    ></textarea> */}
                    <CKEditor
                      key={review._id}
                      editor={ClassicEditor}
                      data={review}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setReview(data);
                      }}
                      // style={{ width: "inherit !important;" }}
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
                    <button className={styles["reply-button"]}>
                      {isLoading ? <Spinner size={18}></Spinner> : `Reply`}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={styles["post-stats-container"]}>
            {replies.length === 0 ? (
              <Spinner size={18}></Spinner>
            ) : (
              <>
                <div className={styles["post-stat"]}>
                  <span className={styles["post-stat-head"]}>Replies</span>
                  <span className={styles["post-stat-data"]}>
                    {replies.totalReviews}
                  </span>
                </div>
                <div className={styles["post-stat"]}>
                  <span className={styles["post-stat-head"]}>Created</span>
                  <span className={styles["post-stat-data"]}>
                    {formatDate(replies.createdAt, "CreatedDay")}
                  </span>
                </div>
                <div className={styles["post-stat"]}>
                  <span className={styles["post-stat-head"]}>Last Reply</span>
                  <span className={styles["post-stat-data"]}>
                    {recentReply === "no data"
                      ? 0
                      : formatDate(recentReply.createdAt, "newReply")}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ForumTopicReplies;
