import DownloadButton from "./DownloadButton";

export default function PhotosPage() {
    const images = [
        'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
        'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        'https://static.vecteezy.com/system/resources/thumbnails/023/929/823/small_2x/world-finally-in-peace-illustration-generative-ai-photo.jpg',
        'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
        'https://t4.ftcdn.net/jpg/07/70/14/41/360_F_770144172_kTZ42xWd9pf4gXRGWQeHlFkfp2r1HnDv.jpg',
        'https://static.vecteezy.com/system/resources/previews/026/722/501/non_2x/illustration-image-nature-and-sustainability-eco-friendly-living-and-conservation-concept-art-of-earth-and-animal-life-in-different-environments-generative-ai-illustration-free-photo.jpg',
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