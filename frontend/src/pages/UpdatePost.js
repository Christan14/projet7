import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const userAuth = JSON.parse(sessionStorage.getItem("userAuth"));
  const { idPost } = useParams();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  const [posterId, setPosterId] = useState({});

  const [oldPost, setOldPost] = useState("");

  const [imgfile, uploadimg] = useState("");
  const [newPost, setNewPost] = useState("");

  function imgFilehandler(e) {
    return uploadimg(e.target.files[0]);
  }

  const formData = new FormData();
  formData.append("post_image", imgfile);
  formData.append("message", newPost);

  useEffect(() => {
    if (userAuth) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}api/auth/profil/${userAuth._id}`,
        {
          method: "GET",
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.isAdmin);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userAuth]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/posts/${idPost}`, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosterId(data.posterId);
        setOldPost(data.message);
      })
      .catch((err) => {
        console.log({ error: err });
      });
  }, [idPost]);

  const updatePost = (e) => {
    e.preventDefault();
    if (isAdmin || posterId === userAuth._id) {
    fetch(`${process.env.REACT_APP_BASE_URL}api/posts/update/${idPost}`, {
      method: "PUT",
      withCredentials: true,
      credentials: "include",
      body: formData,
    })
      .then((data) => {
        console.log(data);
        alert("Poste mise ?? jour avec succ?? !!!");
        navigate("/");
      })
      .catch((err) => {
        console.log({ error: err });
      });
    } else{
      alert ("vous n'??tes pas autoris?? ?? updat?? ce post");
    }
  };

  return (
    <div className="container profile-page">
      <div className="row center-profil">
        <div className="col-xl-6 col-lg-7 col-md-12">
          <div>
            <form onSubmit={updatePost} encType="multipart/form-data">
              <h1>Update Post</h1>
              <div className="form-group row">
                <label htmlFor="message" className="col-4 col-form-label">
                  Message
                </label>
                <div className="col-8">
                  <textarea
                    id="message"
                    name="message"
                    cols="40"
                    rows="5"
                    placeholder={oldPost}
                    className="form-control"
                    defaultValue={newPost}
                    onChange={(event) => setNewPost(event.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="picture" className="col-4 col-form-label">
                  Picture
                </label>
                <div className="col-8">
                  <input
                    id="picture"
                    name="post_image"
                    type="file"
                    className="form-control"
                    onChange={imgFilehandler}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="offset-4 col-8">
                  <button
                    name="submit"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;