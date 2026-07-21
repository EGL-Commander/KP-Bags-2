export default function ProductImage({
    src,
    alt,
    className=""
}) {

    return (

        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`
                w-full
                h-full
                object-contain
                transition-transform
                duration-300
                group-hover:scale-105
                ${className}
            `}
        />

    );

}