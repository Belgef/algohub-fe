import React, { useState } from "react";

const TitleImageInput = () => {
  const [frontImageUrl, setFrontImageUrl] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.[0]) {
      URL.revokeObjectURL(frontImageUrl);
      setFrontImageUrl(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };
  return (
    <div className="add-image-block">
      {frontImageUrl ? (
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleImageChange}
          id="frontImage"
        />
      ) : (
        <div className="title-image-box">
          <img className="title-image" src={frontImageUrl} />
        </div>
      )}
    </div>
  );
};

export default TitleImageInput
