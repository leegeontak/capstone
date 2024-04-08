import React, { useState } from "react";

const BlogPostForm = () => {
    const [title, setTitle] = useState("");
    const [contentHTML, setContentHTML] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContentHTML(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log("Content HTML:", contentHTML);
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={handleTitleChange}
            />
            <textarea
                placeholder="내용"
                value={contentHTML}
                onChange={handleContentChange}
            ></textarea>
            <button type="submit">게시하기</button>
        </form>
    );
};

export default BlogPostForm;
