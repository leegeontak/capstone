import React, { useState, useRef, useEffect } from "react";
import "../pagesStyle/ReviewPageStyle.css";
import axios from "axios";

function BlogPostForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentArr, setContentArr] = useState([]);
    const [images, setImages] = useState([]);
    const [formDataImages, setFormDataImages] = useState([]);
    const [newObj, setNewObj] = useState([]);
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
        // textAreaRefs.current[textAreaRefs.current.length - 2].focus();
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
        // textAreaRefs.current[textAreaRefs.current.length - 1].focus();
    };

    const handleImageChange = (e) => {
        // console.log(textAreaRefs);

        const newImages = Array.from(e.target.files);
        console.log(newImages);
        console.log(e.target.files);
        setFormDataImages((prevFormimage) => [
            ...prevFormimage,
            e.target.files,
        ]);
        console.log(formDataImages);
        const imagesWithStar = newImages.map((file) => ({
            image: URL.createObjectURL(file),
            checked: false,
            serviceStar: [true, true, true, true, true],
            cleanStar: [true, true, true, true, true],
            locationStar: [true, true, true, true, true],
        }));
        setImages((prevImages) => [...prevImages, ...imagesWithStar]);
        // console.log(images);
        // if (textAreaRefs.current.length > 0) {
        //     console.log("있음");
        //     textAreaRefs.current[textAreaRefs.current.length - 1].focus();
        // }
    };
    const handleModifyImage = (e, index) => {
        const modifyImages = Array.from(e.target.files);
        console.log(index);

        // 파일이 선택되었을 때만 처리
        if (modifyImages.length > 0) {
            const convertImages = modifyImages.map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prevImages) => {
                const newImages = [...prevImages];
                console.log(newImages);

                newImages[index].image = convertImages[0]; // 이미지 URL을 새로운 이미지의 URL로 변경
                return newImages;
            });
            setFormDataImages((prevFormimage) => {
                const newFormImage = [...prevFormimage];
                newFormImage[index] = e.target.files; // 이미지 URL을 새로운 이미지의 URL로 변경
                console.log(newFormImage);
                return newFormImage;
            });
        }
        console.log(formDataImages);
        textAreaRefs.current[index + 1].focus();
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
    function getCurrentDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        return year + month + day + hours + minutes + seconds;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newdbSave = images.map((item, idx) => {
            console.log(item);
            return {
                ...item,
                content: contentArr[idx],
            };
        });
        const fd = new FormData();
        console.log(formDataImages);
        for (let i = 0; i < formDataImages.length; i++) {
            if (formDataImages[i][0]) {
                fd.append("images", formDataImages[i][0]);
            } else {
                // 빈 파일 객체를 추가하여 순서를 유지합니다.
                const emptyFile = new File([], "empty", { type: "text/plain" });
                fd.append("images", emptyFile);
            }
        }
        // fd.append("image", formDataImages[0][0]);
        const randomImageArr = newdbSave.map((item, idx) => {
            return item.image;
        });
        const randomImage = Math.floor(Math.random() * randomImageArr.length);
        const thumnail = randomImageArr[randomImage];
        const currentDateTime = getCurrentDateTime();
        fd.append("currentDateTime", currentDateTime);
        console.log(...fd);
        const userID = window.sessionStorage.getItem("id");
        setNewObj(newdbSave);
        await axios.post("./api/saveReview", {
            thumnail,
            userID,
            currentDateTime,
            title,
            content,
            newdbSave,
        });
        await axios.post("http://localhost:5000/upload", fd, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };
    const imageDelete = (index) => {
        const newImages = [...images]; // 이미지 배열 복사
        newImages[index] = ""; // 해당 인덱스의 값을 빈 문자열로 변경
        setImages(newImages); // 변경된 이미지 배열을 적용
        // const newFormImages = [...formDataImages];
        // newFormImages[index] = new File([], "", { type: "text/plain" });
        const newFormImages = [...formDataImages];
        newFormImages[index] = "";
        setFormDataImages(newFormImages);
        textAreaRefs.current[index + 1].focus();
    };

    return (
        <div className="reviewPageContainer">
            <div className="reviewFormContainer">
                <form onSubmit={handleSubmit} className="reviewForm">
                    <input
                        className="reviewTitle"
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
                        className="reviewContent"
                        style={{ marginTop: 50 }}
                    ></textarea>

                    {images.map((image, index) => (
                        <div key={index}>
                            {image !== "" ? (
                                <div className="imageContainer">
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
                                        별점주기
                                        <img
                                            src={image.image}
                                            style={{
                                                width: "100%",
                                                display: "inline-block",
                                            }}
                                        />
                                        <label
                                            htmlFor={`modifyImage-${index}`}
                                            onClick={() => console.log(index)}
                                            className={index}
                                        >
                                            <img src="/images/modifypicture.png"></img>
                                        </label>
                                        <input
                                            id={`modifyImage-${index}`}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onClick={() => console.log(index)}
                                            onChange={(e) => {
                                                console.log(index);
                                                handleModifyImage(e, index);
                                            }}
                                        />
                                        <button
                                            className="imageDelete"
                                            onClick={() => {
                                                imageDelete(index);
                                            }}
                                        ></button>
                                    </div>

                                    <div>
                                        {images[index].checked ? (
                                            <>
                                                <span>
                                                    서비스는
                                                    {" " +
                                                        images[
                                                            index
                                                        ].serviceStar.filter(
                                                            (star) =>
                                                                star === true
                                                        ).length}
                                                    점 입니다
                                                </span>
                                                <div className="starContainer">
                                                    {images[
                                                        index
                                                    ].serviceStar.map(
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
                                                </div>
                                            </>
                                        ) : null}
                                        {images[index].checked ? (
                                            <>
                                                <span>
                                                    청결도는
                                                    {" " +
                                                        images[
                                                            index
                                                        ].cleanStar.filter(
                                                            (star) =>
                                                                star === true
                                                        ).length}
                                                    점 입니다
                                                </span>
                                                <div className="starContainer">
                                                    {images[
                                                        index
                                                    ].cleanStar.map(
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
                                                </div>
                                            </>
                                        ) : null}
                                        {images[index].checked ? (
                                            <>
                                                <span>
                                                    접근성은
                                                    {" " +
                                                        images[
                                                            index
                                                        ].locationStar.filter(
                                                            (star) =>
                                                                star === true
                                                        ).length}
                                                    점 입니다
                                                </span>
                                                <div className="starContainer">
                                                    {images[
                                                        index
                                                    ].locationStar.map(
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
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            ) : (
                                <span></span>
                            )}
                            <textarea
                                className="reviewContent"
                                autoFocus
                                ref={(el) =>
                                    (textAreaRefs.current[index + 1] = el)
                                }
                                rows={1}
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
