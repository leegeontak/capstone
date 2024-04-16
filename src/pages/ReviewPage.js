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
        console.log(newImages);
        const imagesWithStar = newImages.map((file) => ({
            image: URL.createObjectURL(file),
            checked: false,
            serviceStar: [true, true, true, true, true],
            cleanStar: [true, true, true, true, true],
            locationStar: [true, true, true, true, true],
        }));
        setImages((prevImages) => [...prevImages, ...imagesWithStar]);
    };
    const reviewServiceStar = (imageIndex, starIndex) => {
        setImages((prevState) => {
            const updatedImages = [...prevState];
            updatedImages[imageIndex].serviceStar = updatedImages[
                imageIndex
            ].serviceStar.map(
                (star, idx) =>
                    idx <= starIndex
                        ? true // 클릭된 별점과 그 이전 별점들은 활성화
                        : false // 클릭되지 않은 별점은 비활성화
            );
            return updatedImages;
        });
    };
    const reviewCleanStar = (imageIndex, starIndex) => {
        setImages((prevState) => {
            const updatedImages = [...prevState];
            updatedImages[imageIndex].cleanStar = updatedImages[
                imageIndex
            ].cleanStar.map(
                (star, idx) =>
                    idx <= starIndex
                        ? true // 클릭된 별점과 그 이전 별점들은 활성화
                        : false // 클릭되지 않은 별점은 비활성화
            );
            return updatedImages;
        });
    };
    const reviewLocationStar = (imageIndex, starIndex) => {
        setImages((prevState) => {
            const updatedImages = [...prevState];
            updatedImages[imageIndex].locationStar = updatedImages[
                imageIndex
            ].locationStar.map(
                (star, idx) =>
                    idx <= starIndex
                        ? true // 클릭된 별점과 그 이전 별점들은 활성화
                        : false // 클릭되지 않은 별점은 비활성화
            );
            return updatedImages;
        });
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
    const imageDelete = (index) => {
        const newImages = [...images]; // 이미지 배열 복사
        newImages[index] = ""; // 해당 인덱스의 값을 빈 문자열로 변경
        setImages(newImages); // 변경된 이미지 배열을 적용
    };

    return (
        <div className="reviewPageContainer">
            <div className="reviewFormContainer">
                <form onSubmit={handleSubmit} className="reviewForm">
                    <img src=""></img>
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
                            {image !== "" ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ width: "50%" }}>
                                        <input
                                            type="checkbox"
                                            checked={images[index].checked}
                                            onChange={() => {
                                                const updatedImages = [
                                                    ...images,
                                                ];
                                                updatedImages[index].checked =
                                                    !updatedImages[index]
                                                        .checked;
                                                setImages(updatedImages);
                                            }}
                                        ></input>
                                        <img
                                            src={image.image}
                                            style={{
                                                width: "100%",
                                                display: "inline-block",
                                            }}
                                        />
                                        <button
                                            onClick={() => imageDelete(index)}
                                        >
                                            삭제
                                        </button>
                                    </div>

                                    <div>
                                        {images[index].checked ? (
                                            <div className="starContainer">
                                                {images[index].serviceStar.map(
                                                    (star, idx) => (
                                                        <div
                                                            onClick={() =>
                                                                reviewServiceStar(
                                                                    index,
                                                                    idx
                                                                )
                                                            }
                                                            key={idx}
                                                            className="star"
                                                        >
                                                            {star ? (
                                                                <img src="images/trueStar.png"></img>
                                                            ) : (
                                                                <img src="images/falseStar.png"></img>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                                <span>
                                                    {
                                                        images[
                                                            index
                                                        ].serviceStar.filter(
                                                            (star) =>
                                                                star === true
                                                        ).length
                                                    }
                                                    점입니다
                                                </span>
                                            </div>
                                        ) : null}
                                        {images[index].checked ? (
                                            <div className="starContainer">
                                                {images[index].cleanStar.map(
                                                    (star, idx) => (
                                                        <div
                                                            onClick={() =>
                                                                reviewCleanStar(
                                                                    index,
                                                                    idx
                                                                )
                                                            }
                                                            key={idx}
                                                            className="star"
                                                        >
                                                            {star ? (
                                                                <img src="images/trueStar.png"></img>
                                                            ) : (
                                                                <img src="images/falseStar.png"></img>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                                <span>
                                                    {
                                                        images[
                                                            index
                                                        ].cleanStar.filter(
                                                            (star) =>
                                                                star === true
                                                        ).length
                                                    }
                                                    점입니다
                                                </span>
                                            </div>
                                        ) : null}
                                        {images[index].checked ? (
                                            <div className="starContainer">
                                                {images[index].locationStar.map(
                                                    (star, idx) => (
                                                        <div
                                                            onClick={() =>
                                                                reviewLocationStar(
                                                                    index,
                                                                    idx
                                                                )
                                                            }
                                                            key={idx}
                                                            className="star"
                                                        >
                                                            {star ? (
                                                                <img src="images/trueStar.png"></img>
                                                            ) : (
                                                                <img src="images/falseStar.png"></img>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                                <span>
                                                    {
                                                        images[
                                                            index
                                                        ].locationStar.filter(
                                                            (star) =>
                                                                star === true
                                                        ).length
                                                    }
                                                    점입니다
                                                </span>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ) : (
                                <span></span>
                            )}
                            <textarea
                                autoFocus
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
                        <img
                            src="/images/picture.png"
                            className="addImage"
                        ></img>
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
