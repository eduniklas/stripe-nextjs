import DownloadButton from "./DownloadButton";

export default function PhotosPage() {
    const images = [
        'randomImg.jpg',
        'randomImg.jpg',
        'randomImg.jpg',
        'randomImg.jpg',
        'randomImg.jpg',
        'randomImg.jpg'
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="w-full h-48 mb-2 overflow-hidden">
                        <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover"
                            />
                    </div>
                    <DownloadButton image={image} />
                </div>
            ))}
        </div>
    );
}