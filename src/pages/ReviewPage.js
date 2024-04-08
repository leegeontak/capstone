import React, { useState } from "react";

const ReviewPage = () => {
    const [images, setImages] = useState([]);

    // 파일 선택 시 호출되는 함수
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        // 파일을 읽어들이고 읽기가 완료되면 이미지를 설정
        reader.onloadend = () => {
            setImages((prevImages) => [
                ...prevImages,
                { url: reader.result, reviewCheck: false },
            ]);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // 이미지 리뷰 체크 변경 시 호출되는 함수
    const handleReviewCheckChange = (index) => {
        setImages((prevImages) =>
            prevImages.map((image, i) =>
                i === index
                    ? { ...image, reviewCheck: !image.reviewCheck }
                    : image
            )
        );
    };

    return (
        <div>
            <h2>이미지 업로더</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {images.map((image, index) => (
                <div key={index}>
                    <h3>선택된 이미지:</h3>
                    <img
                        src={image.url}
                        alt={`업로드된 이미지 ${index + 1}`}
                        style={{ maxWidth: "100%", maxHeight: "400px" }}
                    />
                    <input
                        type="checkbox"
                        checked={image.reviewCheck}
                        onChange={() => handleReviewCheckChange(index)}
                    />
                    {image.reviewCheck && (
                        <div>
                            <div>청결도</div>
                            <div>서비스</div>
                            <div>접근성</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewPage;
