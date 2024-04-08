import React, { useState, useRef, useEffect } from "react";
import "../pagesStyle/ReviewPageStyle.css";

function BlogPostForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentArr, setContentArr] = useState([]);
    const [images, setImages] = useState([]);
    const textAreaRefs = useRef([]);
    const firstAreaRefs = useRef(null);
    useEffect(() => {
        if (firstAreaRefs.current) {
            adjustHeight(firstAreaRefs.current);
        }
    }, [content]);
    useEffect(() => {
        // textarea의 높이를 자동으로 조절하는 함수 호출

        textAreaRefs.current.forEach((ref) => {
            adjustHeight(ref);
        });
    }, [contentArr]);
    const adjustHeight = (ref) => {
        ref.style.height = "auto";
        ref.style.height = ref.scrollHeight + "px";
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const newImages = Array.from(e.target.files);
        setImages([...images, ...newImages]);
    };

    const handleImageDescriptionChange = (index, e) => {
        const newContentArr = [...contentArr];
        newContentArr[index] = e.target.value;
        setContentArr(newContentArr);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 글과 사진을 서버에 전송하는 로직을 구현
    };

    return (
        <div className="reviewPageContainer">
            <div className="reviewFormContainer">
                <form onSubmit={handleSubmit} className="reviewForm">
                    <input
                        className="title"
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <textarea
                        ref={firstAreaRefs}
                        placeholder="내용"
                        value={content}
                        onChange={handleContentChange}
                        className="content"
                        style={{ marginTop: 50 }}
                    ></textarea>
                    {images.map((image, index) => (
                        <div key={index}>
                            <div>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index}`}
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <textarea
                                ref={(el) =>
                                    (textAreaRefs.current[index + 1] = el)
                                }
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    handleImageDescriptionChange(index, e)
                                }
                                value={contentArr[index]}
                            ></textarea>
                        </div>
                    ))}
                    <label htmlFor="selectImage">
                        <div className="addImage"></div>
                    </label>
                    <input
                        id="selectImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                    <button type="submit" className="writeReview">
                        리뷰쓰기
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BlogPostForm;
