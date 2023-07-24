import { PhotoProvider as Photos, PhotoView } from "react-photo-view";

const PhotoProvider = ({ children, src }) => {
    return (
        <Photos>
            <div className="foo">
                <PhotoView src={src}>{children}</PhotoView>
            </div>
        </Photos>
    );
};

export default PhotoProvider;
