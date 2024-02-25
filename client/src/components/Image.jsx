import React from "react";

const Image = ({ src, ...rest }) => {
	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url
	src =
		src && src.includes("https://") ? src : baseUrl.concat("uploads/") + src;
	return <img {...rest} src={src} alt={""} />;
};

export default Image;
